/**
 * NexGen PropTech - mail endpoint (Google Apps Script web app)
 *
 * For every contact enquiry / newsletter signup the website posts here, and this script
 * sends ONE branded alert mail to the team inbox (TO). Nothing is sent to the visitor.
 * Press Reply in Gmail to answer the visitor (their address is set as Reply-To). The mail itself has no buttons.
 *
 * Setup: see GOOGLE_MAIL_SETUP.md. After pasting this file run `testMail` once to authorise.
 */

// ====================== SETTINGS (edit here) ======================
var TO         = 'rohiniancha@gmail.com';              // inbox that receives every enquiry
var BRAND      = 'NexGen PropTech';                    // sender display name
var SITE_URL   = 'https://nexgen-proptech.vercel.app'; // your live website, no slash at the end (also hosts the logo used in the mail)
var LOGO_URL   = SITE_URL + '/img/logo.png';           // must be publicly reachable for the logo to show in mails

// Brand colours (match the website)
var C = { ink: '#090c13', navy: '#0f1420', red: '#b7242a', redBright: '#ec4a52', blue: '#3b6eb5',
          paper: '#f6f3ee', card: '#ffffff', text: '#10141c', muted: '#566074', line: '#e4e0d8' };
var FONT = "'Montserrat','Segoe UI',Helvetica,Arial,sans-serif";

var LABELS = { name: 'Full Name', email: 'Email', message: 'Message' };
var SKIP   = ['kind', 'subject', 'website', 'access_key'];
var MAX    = { name: 120, email: 254, message: 5000, other: 1000 };
var EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']{2,}$/;

// ====================== WEB APP ENTRY POINTS ======================
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Spam trap: real visitors never see this field, bots fill it.
    if (data.website) return reply({ ok: true });

    var isNews = data.kind === 'news';
    var clean = sanitize(data);

    if (!clean.email || !EMAIL_RE.test(clean.email)) return reply({ ok: false, error: 'invalid_email' });
    if (!isNews && (!clean.name || clean.name.length < 2 || !clean.message || clean.message.length < 5)) {
      return reply({ ok: false, error: 'missing_fields' });
    }

    lock.waitLock(15000);
    var when = stamp();

    // Alert to the team.
    var alertMail = isNews ? newsletterAlert(clean, when) : enquiryAlert(clean, when);
    MailApp.sendEmail({
      to: TO, subject: alertMail.subject, body: alertMail.text, htmlBody: alertMail.html,
      name: BRAND + ' Website', replyTo: clean.email
    });

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: 'server_error' });
  } finally {
    try { lock.releaseLock(); } catch (x) {}
  }
}

function doGet() { return reply({ ok: true, info: 'NexGen mail endpoint is running' }); }

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// ====================== HELPERS ======================
function sanitize(data) {
  var out = {};
  Object.keys(data).forEach(function (k) {
    if (SKIP.indexOf(k) >= 0) return;
    var v = data[k];
    if (v === null || typeof v === 'object') return;
    v = String(v).replace(/\u0000/g, '').trim();
    var limit = MAX[k] || MAX.other;
    if (v.length > limit) v = v.substring(0, limit);
    if (k === 'name' || k === 'email') v = v.replace(/[\r\n<>]+/g, ' ').trim();   // no header injection / markup
    if (v) out[k] = v;
  });
  return out;
}

function esc(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escBr(s) { return esc(s).replace(/\r?\n/g, '<br>'); }
function firstName(n) { return (n || '').split(/\s+/)[0] || 'there'; }
function stamp() { return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'dd MMM yyyy, hh:mm a (z)'); }

// ====================== EMAIL LAYOUT ======================
// Table-based, inline-styled markup: renders the same in Gmail, Outlook, Apple Mail and mobile apps.
function layout(o) {

  return '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">' +
    '<title>' + esc(o.title) + '</title>' +
    '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">' +
    '<style>@media only screen and (max-width:620px){.wrap{width:100%!important}.pad{padding:28px 22px!important}.h1{font-size:25px!important}}</style>' +
    '</head>' +
    '<body style="margin:0;padding:0;background:' + C.paper + ';-webkit-text-size-adjust:100%">' +
    // hidden preheader (inbox preview text)
    '<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:' + C.paper + ';font-size:1px;line-height:1px">' + esc(o.preheader) + '&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="' + C.paper + '"><tr><td align="center" style="padding:28px 12px">' +
    '<table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px">' +

    // header
    '<tr><td bgcolor="' + C.ink + '" style="background:' + C.ink + ';border-radius:20px 20px 0 0;padding:26px 36px" class="pad">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td align="left" valign="middle"><a href="' + SITE_URL + '" target="_blank" style="text-decoration:none">' +
    '<img src="' + LOGO_URL + '" width="132" alt="NEXGEN PROPTECH" style="display:block;border:0;width:132px;height:auto;font:800 18px/1 ' + FONT + ';color:#ffffff"></a></td>' +
    '<td align="right" valign="middle" style="font:600 11px/1 ' + FONT + ';letter-spacing:2.4px;text-transform:uppercase;color:#98a2b6">' + esc(o.eyebrow) + '</td>' +
    '</tr></table></td></tr>' +
    // accent strip
    '<tr><td style="font-size:0;line-height:0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>' +
    '<td width="70%" height="4" bgcolor="' + C.redBright + '" style="height:4px;font-size:0;line-height:0">&nbsp;</td>' +
    '<td width="30%" height="4" bgcolor="' + C.blue + '" style="height:4px;font-size:0;line-height:0">&nbsp;</td></tr></table></td></tr>' +

    // body
    '<tr><td class="pad" bgcolor="' + C.card + '" style="background:' + C.card + ';padding:40px 40px 36px;font-family:' + FONT + ';color:' + C.text + '">' +
    '<h1 class="h1" style="margin:0 0 14px;font:700 30px/1.2 ' + FONT + ';letter-spacing:-0.5px;color:' + C.text + '">' + o.title + '</h1>' +
    '<p style="margin:0 0 6px;font:400 16px/1.7 ' + FONT + ';color:' + C.muted + '">' + o.intro + '</p>' +
    (o.body || '') +
    '</td></tr>' +

    // footer
    '<tr><td bgcolor="' + C.navy + '" style="background:' + C.navy + ';border-radius:0 0 20px 20px;padding:26px 36px;font-family:' + FONT + '" class="pad">' +
    '<p style="margin:0 0 6px;font:700 13px/1.4 ' + FONT + ';color:#ffffff">NexGen PropTech</p>' +
    '<p style="margin:0 0 12px;font:400 12px/1.7 ' + FONT + ';color:#98a2b6">Institutional-grade commercial real-estate opportunities, powered by data.</p>' +
    '<p style="margin:0;font:400 11px/1.7 ' + FONT + ';color:#6f7a90">' + o.footnote + '<br>' +
    '<a href="' + SITE_URL + '" target="_blank" style="color:#98a2b6;text-decoration:underline">' + SITE_URL.replace(/^https?:\/\//, '') + '</a></p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';
}

function label(t) {
  return '<div style="font:700 11px/1 ' + FONT + ';letter-spacing:1.8px;text-transform:uppercase;color:' + C.red + ';margin:0 0 7px">' + esc(t) + '</div>';
}
function fieldRow(k, v, last) {
  var isEmail = /@/.test(v) && EMAIL_RE.test(v);
  var val = isEmail ? '<a href="mailto:' + esc(v) + '" style="color:' + C.blue + ';text-decoration:none">' + esc(v) + '</a>' : escBr(v);
  return '<tr><td style="padding:16px 0;' + (last ? '' : 'border-bottom:1px solid ' + C.line + ';') + '">' + label(LABELS[k] || k) +
    '<div style="font:500 16px/1.6 ' + FONT + ';color:' + C.text + '">' + val + '</div></td></tr>';
}
function quote(text) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0"><tr>' +
    '<td width="4" bgcolor="' + C.red + '" style="background:' + C.red + ';border-radius:4px"></td>' +
    '<td bgcolor="' + C.paper + '" style="background:' + C.paper + ';padding:18px 22px;border-radius:0 12px 12px 0;font:400 15px/1.75 ' + FONT + ';color:' + C.text + '">' + escBr(text) + '</td></tr></table>';
}
function metaBar(when) {
  return '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0"><tr><td style="border-top:1px solid ' + C.line + ';padding-top:14px;font:500 12px/1.6 ' + FONT + ';color:' + C.muted + '">Received ' + esc(when) + ' &nbsp;&middot;&nbsp; via nexgenproptech website</td></tr></table>';
}

// ====================== TEMPLATES: TEAM ALERTS ======================
function enquiryAlert(d, when) {
  var keys = Object.keys(d).filter(function (k) { return k !== 'message'; });
  var rows = keys.map(function (k, i) { return fieldRow(k, d[k], i === keys.length - 1); }).join('');
  var body =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0;border-top:1px solid ' + C.line + '">' + rows + '</table>' +
    (d.message ? '<div style="margin:24px 0 0">' + label('Message') + quote(d.message) + '</div>' : '') + metaBar(when);

  var html = layout({
    eyebrow: 'New enquiry', preheader: (d.name || 'A visitor') + ' just sent a message through the website.',
    title: 'New message from ' + esc(d.name || 'a visitor'),
    intro: 'Someone just filled in the contact form on your website. Hit Reply in Gmail to answer them directly.',
    body: body,
    footnote: 'Internal notification &middot; sent automatically when the website contact form is submitted.'
  });
  var text = 'NEW WEBSITE ENQUIRY\n\n' + Object.keys(d).map(function (k) { return (LABELS[k] || k) + ':\n' + d[k] + '\n'; }).join('\n') +
    '\nReceived ' + when + '\nReply to this email to answer ' + firstName(d.name) + ' directly.';
  return { subject: 'New website enquiry' + (d.name ? ' from ' + d.name : ''), html: html, text: text };
}

function newsletterAlert(d, when) {
  var body =
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 0;border-top:1px solid ' + C.line + '">' + fieldRow('email', d.email, true) + '</table>' + metaBar(when);
  var html = layout({
    eyebrow: 'Newsletter', preheader: d.email + ' subscribed to the newsletter.',
    title: 'New newsletter subscriber',
    intro: 'A new investor joined the mailing list from the website.',
    body: body,
    footnote: 'Internal notification &middot; sent automatically when the newsletter form is submitted.'
  });
  return { subject: 'New newsletter subscriber - NexGen', html: html,
    text: 'NEW NEWSLETTER SUBSCRIBER\n\nEmail:\n' + d.email + '\n\nReceived ' + when };
}

// ====================== TESTS (run from the editor) ======================
// Run once: triggers the Google permission screen and sends you a test mail.
function testMail() {
  MailApp.sendEmail(TO, 'NexGen test mail', 'If you can read this, the setup works.');
}

// Sends you the designed alert mails so you can check them in your inbox.
function previewAllEmails() {
  var when = stamp();
  var c = { name: 'Aarav Mehta', email: TO, message: 'Hello NexGen team,\nI would like a demo of the platform and details on your pre-leased office assets.' };
  var n = { email: TO };
  [enquiryAlert(c, when), newsletterAlert(n, when)].forEach(function (m, i) {
    MailApp.sendEmail({ to: TO, subject: '[Preview ' + (i + 1) + '/2] ' + m.subject, body: m.text, htmlBody: m.html, name: BRAND });
  });
}

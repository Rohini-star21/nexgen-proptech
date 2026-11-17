// NexGen PropTech - sends every contact/newsletter form field to your Gmail.
const TO = 'rohiniancha@gmail.com';

const LABELS = { name: 'Full Name', email: 'Email', message: 'Message' };
const SKIP = ['kind', 'subject', 'website', 'access_key'];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Spam trap: real visitors never see this field, bots fill it.
    if (data.website) return reply({ ok: true });

    const isNews = data.kind === 'news';
    const keys = Object.keys(data).filter(function (k) { return SKIP.indexOf(k) < 0; });

    const body = keys.map(function (k) {
      return (LABELS[k] || k) + ':\n' + data[k] + '\n';
    }).join('\n') + '\n----\nSent from the NexGen PropTech website on ' + new Date().toString();

    const mail = {
      to: TO,
      subject: isNews ? 'New newsletter subscriber - NexGen' : 'New website enquiry' + (data.name ? ' from ' + data.name : ''),
      body: body,
      name: 'NexGen Website'
    };
    if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) mail.replyTo = data.email;

    MailApp.sendEmail(mail);
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: String(err) });
  }
}

function doGet() { return reply({ ok: true, info: 'NexGen mail endpoint is running' }); }

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Run this once from the editor: it triggers the Google permission screen and sends you a test mail.
function testMail() {
  MailApp.sendEmail(TO, 'NexGen test mail', 'If you can read this, the setup works.');
}

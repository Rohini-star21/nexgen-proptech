# NexGen mail setup (Google Apps Script) - branded alert mails

What this sends for every form submit: **one designed alert mail to rohiniancha@gmail.com** (contact enquiry or newsletter signup).
Nothing is sent to the visitor. Press **Reply** in Gmail to answer them (their address is the Reply-To).
On the website a toast says "Thank you for your interest! Our team will connect with you shortly."

## Part 1 - Create the script
1. Open https://script.google.com signed in as rohiniancha@gmail.com -> **New project**, name it `NexGen Mail`.
2. Delete everything in the editor, paste the full contents of `docs/Code.gs`, press **Ctrl+S**.
3. At the top of the file check the SETTINGS block. Most important:
   - `SITE_URL` - your real live domain (set to `https://nexgen-proptech.vercel.app`; change it if you add a custom domain). The logo in the mails is loaded from
     `SITE_URL/img/logo.png`, so the site must be deployed first or the logo shows as text.

## Part 2 - Authorise (one time)
1. Function dropdown -> **testMail** -> **Run** -> **Review permissions** -> choose rohiniancha@gmail.com.
2. "Google hasn't verified this app": **Advanced** -> **Go to NexGen Mail (unsafe)** -> **Allow** (it is your own script).
3. Check your inbox (and Spam) for "NexGen test mail".
4. Optional: run **previewAllEmails** - sends you the 2 designed alert mails so you can see them in Gmail.

## Part 3 - Publish
1. **Deploy** -> **New deployment** -> gear icon -> **Web app**.
2. Execute as: **Me**. Who has access: **Anyone**. **Deploy**, copy the URL ending in `/exec`.
3. Open that URL in a browser: you should see `{"ok":true,"info":"NexGen mail endpoint is running"}`.

## Part 4 - Connect the website
1. `src/config.js` -> `script: 'https://script.google.com/macros/s/XXXX/exec',`
2. `npm install` then `npm run build`. Upload the `dist` folder to your host.
3. Submit the contact form and the newsletter box once to test both.

## Updating the script later
Deploy -> **Manage deployments** -> pencil -> Version: **New version** -> Deploy. The URL stays the same.

## Built-in protection
- Hidden spam trap field; server-side validation and length limits; all visitor text is HTML-escaped in mails.
- Gmail limit is about 100 mails/day on a free account (each submit = 1 mail).

## Notes
- Email apps cache images; if you change the logo, rename the file.
- Mails use a light body with a dark header; Gmail dark mode may adjust colours slightly, that is normal.

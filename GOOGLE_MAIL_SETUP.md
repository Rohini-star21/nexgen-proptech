# Get every contact-form message in rohiniancha@gmail.com (Google Apps Script)

## Part 1 - Create the script in Google
1. Open https://script.google.com signed in as rohiniancha@gmail.com.
2. Click **New project**. Rename it (top left) to `NexGen Mail`.
3. Delete everything in the editor, paste the full contents of `docs/Code.gs`, press **Ctrl+S**.

## Part 2 - Allow it to send mail (the "Google auth" step)
1. In the function dropdown at the top choose **testMail**, click **Run**.
2. Click **Review permissions** > choose rohiniancha@gmail.com.
3. If you see "Google hasn't verified this app": **Advanced** > **Go to NexGen Mail (unsafe)** > **Allow**.
   (It is your own script, so this is normal.)
4. Check your inbox (and Spam) for "NexGen test mail".

## Part 3 - Publish it as a web link
1. **Deploy** > **New deployment** > gear icon > **Web app**.
2. Description: `v1`. Execute as: **Me**. Who has access: **Anyone**.
3. **Deploy**, then **Copy** the Web app URL (ends with `/exec`).
4. Open that URL in a browser. You should see `{"ok":true,"info":"NexGen mail endpoint is running"}`.

## Part 4 - Connect the website
1. Open `src/config.js` and paste the URL: `script: 'https://script.google.com/macros/s/XXXX/exec',`
2. `npm run build` (or `npm run dev` to test locally), fill the Contact form, send.
3. The mail arrives with Name, Email and Message. Reply goes straight to the visitor.
4. Upload the new `dist` folder to your host, or push to GitHub.

## If you change the script later
Deploy > **Manage deployments** > pencil icon > Version: **New version** > Deploy. The URL stays the same.

## Notes
- Limit: about 100 emails/day on a normal Gmail account.
- The newsletter box on the home page also sends to the same inbox.
- Any extra field you add later is emailed automatically.

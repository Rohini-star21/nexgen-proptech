NEXGEN PROPTECH - REACT SITE (Home, About, Projects, Contact)
  npm install
  npm run dev      -> http://localhost:5173
  npm run build    -> dist/  (upload the dist folder to any static host; no PHP needed)

Pages use hash links: /#/  /#/about  /#/projects  /#/contact  (work on any static host).

CONTACT + NEWSLETTER FORMS (static site, no server):
  Open src/config.js
  - Free key from https://web3forms.com (enter contact@nexgenproptech.com) -> paste into accessKey. Messages arrive by email in real time.
  - Or set endpoint to a Formspree URL and leave accessKey empty.
  - If accessKey is empty, the form opens the visitor's email app with the message filled in (still works).

// Contact + newsletter settings (static site: no PHP/server needed)
// Recommended: Google Apps Script. Paste your web app URL (ends with /exec) into `script`.
//   See GOOGLE_MAIL_SETUP.md for the step-by-step guide. Mail goes to the address set inside the script.
// Alternatives (used only if `script` is empty): Web3Forms key in `accessKey`, or a Formspree `endpoint`.
// If everything is empty, the form opens the visitor's email app with the message filled in.
export default {
  to: 'contact@nexgenproptech.com',
  script: 'https://script.google.com/macros/s/AKfycbxeOZVd_UtHZdcKA6MkFhEuSbMymxytwwx4bcYuKenm-ETo0L9-RXIHkARN1hJiDMqL-Q/exec',
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
};

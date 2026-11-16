// Contact + newsletter settings (static site: no PHP/server needed)
// 1) Easiest: get a free key at https://web3forms.com (enter contact@nexgenproptech.com) and paste it below.
// 2) Or use Formspree: set endpoint to your https://formspree.io/f/xxxx URL and leave accessKey empty.
// If both are empty, the form opens the visitor's email app with the message filled in (still works, no server).
export default {
  to: 'contact@nexgenproptech.com',
  endpoint: 'https://api.web3forms.com/submit',
  accessKey: '',
};

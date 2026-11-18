const views = ['home', 'about', 'projects', 'skills', 'certifications', 'contact'];
const navLinks = [...document.querySelectorAll('#main-nav a')];
const aliases = { profile: 'home', education: 'about', experience: 'about' };
let currentView = document.documentElement.dataset.view;

function route(focusHeading = false) {
  const requested = location.hash.slice(1).split('/')[0];
  const view = aliases[requested] || (views.includes(requested) ? requested : 'home');
  document.documentElement.dataset.view = view;
  for (const link of navLinks) {
    if (link.hash === `#${view}`) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
  document.title = `${view[0].toUpperCase() + view.slice(1)} | Dwayne Carmelo M. Mongaya`;
  if (view !== currentView) {
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  currentView = view;
  if (focusHeading) document.querySelector(`#${view} h1`)?.focus({ preventScroll: true });
}
window.addEventListener('hashchange', () => route(true));
route();
// Preserve the skip link's focus behavior without treating #main as a new view.
document.querySelector('.skip-link').addEventListener('click', event => {
  event.preventDefault();
  document.querySelector('#main').focus({ preventScroll: true });
});

for (const button of document.querySelectorAll('[data-open-project]')) {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(`project-${button.dataset.openProject}`);
    dialog.showModal();
    dialog.scrollTop = 0;
  });
}
const certificateDialog = document.querySelector('#certificate-dialog');
for (const button of document.querySelectorAll('[data-certificate]')) {
  button.addEventListener('click', () => {
    document.querySelector('#certificate-dialog-title').textContent = button.dataset.title;
    document.querySelector('#certificate-dialog-kind').textContent = button.dataset.kind;
    const image = document.querySelector('#certificate-full-image');
    image.src = button.dataset.image;
    image.alt = `${button.dataset.title} — ${button.dataset.kind} for Dwayne Mongaya`;
    document.querySelector('#certificate-pdf-link').href = button.dataset.pdf;
    certificateDialog.showModal();
    certificateDialog.scrollTop = 0;
  });
}
for (const button of document.querySelectorAll('[data-close-dialog]')) {
  button.addEventListener('click', () => button.closest('dialog').close());
}
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
}
for (const details of document.querySelectorAll('.award-reveal')) {
  details.addEventListener('toggle', () => {
    const action = details.querySelector('.award-action');
    action.firstChild.textContent = details.open ? 'Hide award ' : 'Click To View ';
  });
}

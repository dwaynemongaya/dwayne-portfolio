// Runs before first paint. Marks JS support and motion preference so CSS can
// show the intro cover only when scripts will remove it.
(function () {
  var d = document.documentElement;
  d.classList.add('js');
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('rm');
    var nav = performance.getEntriesByType('navigation')[0];
    if (nav && nav.type === 'back_forward') d.classList.add('no-intro');
  } catch (e) {}
})();

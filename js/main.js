(function () {
  'use strict';
  var d = document;

  /* mobile drawer */
  var tog = d.getElementById('mob-toggle');
  var drawer = d.getElementById('mob-drawer');
  var overlay = d.getElementById('mob-overlay');
  var closeBtn = d.getElementById('drawer-close');
  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    if (overlay) overlay.classList.toggle('visible', open);
    if (tog) {
      tog.setAttribute('aria-expanded', open ? 'true' : 'false');
      tog.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    }
    d.body.classList.toggle('no-scroll', open);
    if (open && closeBtn) closeBtn.focus();
    if (!open && tog && d.activeElement && drawer.contains(d.activeElement)) tog.focus();
  }
  if (tog) tog.addEventListener('click', function () { setDrawer(!drawer.classList.contains('open')); });
  if (closeBtn) closeBtn.addEventListener('click', function () { setDrawer(false); });
  if (overlay) overlay.addEventListener('click', function () { setDrawer(false); });
  d.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) setDrawer(false);
  });
  if (drawer) {
    drawer.addEventListener('click', function (e) {
      if (e.target.closest('a')) setDrawer(false);
    });
  }

  /* FAQ accordion */
  var items = d.querySelectorAll('.faq-q button');
  function setHeight(panel, open) {
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  }
  Array.prototype.forEach.call(items, function (btn) {
    var panel = d.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      setHeight(panel, open);
    });
  });
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(items, function (btn) {
      if (btn.getAttribute('aria-expanded') === 'true') {
        var panel = d.getElementById(btn.getAttribute('aria-controls'));
        if (panel) setHeight(panel, true);
      }
    });
  });

  /* keep the floating call button clear of the footer on desktop */
  var sticky = d.querySelector('.sticky-cta');
  var foot = d.querySelector('footer.site');
  if (sticky && foot && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      en.forEach(function (x) { sticky.classList.toggle('lift', x.isIntersecting && window.innerWidth > 768); });
    }, { threshold: 0 }).observe(foot);
  }
})();

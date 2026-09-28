// Small enhancements; every page is readable without JavaScript.
(function () {
  'use strict';

  var root = document.documentElement;

  // ----- Light / dark toggle (the initial theme is set by the inline script in <head>) -----
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function savedTheme() {
    try { return localStorage.getItem('theme'); } catch (e) { return null; }
  }

  document.querySelectorAll('.theme-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* private mode: just don't remember */ }
    });
  });

  // Follow the system setting until the visitor picks a theme themselves.
  systemDark.addEventListener('change', function (event) {
    if (!savedTheme()) root.setAttribute('data-theme', event.matches ? 'dark' : 'light');
  });

  // ----- Mobile menu -----
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  if (navbar && navToggle) {
    var setOpen = function (open) {
      navbar.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      navToggle.querySelector('use').setAttribute('href', '/assets/icons.svg#i-' + (open ? 'close' : 'menu'));
    };
    navToggle.addEventListener('click', function () {
      setOpen(!navbar.classList.contains('nav-open'));
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });
  }

  // ----- Abstract / BibTeX panels: one open at a time per paper -----
  document.querySelectorAll('button[data-panel]').forEach(function (button) {
    var panel = document.getElementById(button.dataset.panel);
    if (!panel) return;
    button.setAttribute('aria-controls', panel.id);
    button.addEventListener('click', function () {
      var open = panel.hidden;
      button.closest('.pub-links').querySelectorAll('button[data-panel]').forEach(function (other) {
        var otherPanel = document.getElementById(other.dataset.panel);
        if (otherPanel) otherPanel.hidden = true;
        other.setAttribute('aria-expanded', 'false');
      });
      panel.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
    });
  });

  // ----- Copy BibTeX -----
  document.querySelectorAll('.bibtex .copy').forEach(function (button) {
    var pre = button.parentElement.querySelector('pre');

    function flash(label) {
      button.textContent = label;
      clearTimeout(button.resetTimer);
      button.resetTimer = setTimeout(function () { button.textContent = 'Copy'; }, 1600);
    }

    // Fallback when the Clipboard API is unavailable or refused.
    function legacyCopy() {
      var range = document.createRange();
      range.selectNodeContents(pre);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { /* unsupported */ }
      flash(ok ? 'Copied' : 'Selected');
    }

    button.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pre.textContent).then(function () { flash('Copied'); }, legacyCopy);
      } else {
        legacyCopy();
      }
    });
  });

  // ----- Click a paper thumbnail to see the full figure -----
  var previews = document.querySelectorAll('a.pub-fig');
  if (previews.length) {
    var overlay = document.createElement('div');
    overlay.className = 'zoom-overlay';
    overlay.hidden = true;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Figure');
    var big = document.createElement('img');
    big.alt = '';
    overlay.appendChild(big);
    document.body.appendChild(overlay);

    var lastTrigger = null;
    var close = function () {
      if (overlay.hidden) return;
      overlay.hidden = true;
      big.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    };

    previews.forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
        lastTrigger = link;
        big.src = link.getAttribute('href');
        big.alt = link.querySelector('img') ? link.querySelector('img').alt : '';
        overlay.hidden = false;
        document.body.style.overflow = 'hidden';
      });
    });

    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') close();
    });
  }
})();

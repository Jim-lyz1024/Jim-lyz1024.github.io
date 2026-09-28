// Small enhancements only; everything on the page is readable without JavaScript.
(function () {
  'use strict';

  // The address is assembled here so it never appears whole in the HTML for scrapers.
  document.querySelectorAll('.js-email').forEach(function (link) {
    link.href = 'mailto:' + link.dataset.user + '@' + link.dataset.domain;
  });

  document.querySelectorAll('.js-email-text').forEach(function (span) {
    var address = span.dataset.user + '@' + span.dataset.domain;
    var link = document.createElement('a');
    link.href = 'mailto:' + address;
    link.textContent = address;
    span.replaceWith(link);
  });

  // BibTeX panels
  document.querySelectorAll('.bib-toggle').forEach(function (button) {
    var panel = document.getElementById(button.getAttribute('aria-controls'));
    if (!panel) return;
    button.addEventListener('click', function () {
      var open = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
    });
  });

  document.querySelectorAll('.bib-copy').forEach(function (button) {
    var pre = button.parentElement.querySelector('pre');

    function flash(label) {
      button.textContent = label;
      clearTimeout(button.resetTimer);
      button.resetTimer = setTimeout(function () { button.textContent = 'copy'; }, 1800);
    }

    // Fallback when the Clipboard API is unavailable or refused: select the text, try the legacy
    // copy command, and otherwise leave it selected for a manual copy.
    function selectText() {
      var range = document.createRange();
      range.selectNodeContents(pre);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (e) { /* not supported */ }
      flash(copied ? 'copied' : 'selected');
    }

    button.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pre.textContent).then(function () { flash('copied'); }, selectText);
      } else {
        selectText();
      }
    });
  });
})();

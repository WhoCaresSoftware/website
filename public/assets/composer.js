(() => {
  'use strict';
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const cta = document.querySelector('.cta');
  const recipient = 'whocaressoftware@gmail.com';
  const copy = {
    en: { to: 'To', close: 'Close draft', subject: 'Subject', message: 'Message', files: 'Add images or documents', drop: 'Choose files or drop them here.', local: 'This draft stays on this page until you open another app. Nothing is uploaded.', attach: 'Email links can’t carry files. Attach them again in your email app.', shareHint: 'Your system picks the apps. It may not offer email or fill in the recipient.', open: 'Open in email app', share: 'Share draft with files', remove: 'Remove', copy: 'Copy message', copied: 'Copied. Paste it into your email app.', copyError: 'Copy didn’t work. Select the message below and copy it yourself.', shareError: 'Sharing didn’t open. Open your email app and attach the files there.', long: 'Too long for an email link. Copy the message, open your email app and paste it in.', defaultSubject: 'Something needs to work better', defaultBody: 'Hi Mike and XRS,\n\nWhat I’m working on: \nWhat’s in the way: \n\nThanks,\n' },
    el: { to: 'Προς', close: 'Κλείσιμο μηνύματος', subject: 'Θέμα', message: 'Μήνυμα', files: 'Προσθήκη εικόνων ή εγγράφων', drop: 'Επιλέξτε αρχεία ή σύρετέ τα εδώ.', local: 'Το μήνυμα μένει σε αυτή τη σελίδα μέχρι να ανοίξετε άλλη εφαρμογή. Δεν ανεβαίνει τίποτα.', attach: 'Τα links email δεν μεταφέρουν αρχεία. Επισυνάψτε τα ξανά στην εφαρμογή email σας.', shareHint: 'Το σύστημά σας διαλέγει τις εφαρμογές. Ίσως δεν προσφέρει email ή δεν συμπληρώσει τον παραλήπτη.', open: 'Άνοιγμα στο email σας', share: 'Κοινοποίηση μαζί με τα αρχεία', remove: 'Αφαίρεση', copy: 'Αντιγραφή μηνύματος', copied: 'Αντιγράφηκε. Επικολλήστε το στο email σας.', copyError: 'Η αντιγραφή δεν δούλεψε. Επιλέξτε το μήνυμα παρακάτω και αντιγράψτε το.', shareError: 'Η κοινοποίηση δεν άνοιξε. Ανοίξτε το email σας και επισυνάψτε εκεί τα αρχεία.', long: 'Πολύ μεγάλο για link email. Αντιγράψτε το μήνυμα, ανοίξτε το email σας και επικολλήστε το.', defaultSubject: 'Κάτι χρειάζεται να δουλεύει καλύτερα', defaultBody: 'Γεια σας Mike και XRS,\n\nΜε τι ασχολούμαι: \nΤι με εμποδίζει: \n\nΕυχαριστώ,\n' }
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'composer';
  dialog.setAttribute('aria-labelledby', 'composer-title');
  dialog.innerHTML = `<svg class="envelope-seam" viewBox="0 0 760 26" preserveAspectRatio="none" aria-hidden="true"><path d="M0 0 380 25 760 0" fill="none" stroke="currentColor"/></svg><div class="composer-paper"><div class="composer-heading"><div><h2 id="composer-title" tabindex="-1" autofocus></h2><p class="recipient"><span data-copy="to"></span> · ${recipient}</p></div><button class="dismiss" type="button"><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><div class="draft-field"><label for="draft-subject" data-copy="subject"></label><input id="draft-subject" type="text" autocomplete="off"></div><div class="draft-field"><label for="draft-message" data-copy="message"></label><textarea id="draft-message" rows="5"></textarea></div><div class="file-drop"><label for="draft-files" data-copy="files"></label><p data-copy="drop"></p><input id="draft-files" type="file" multiple accept="image/*,.pdf,.doc,.docx,.txt,.md,.rtf,.odt,.xls,.xlsx,.csv,.ppt,.pptx"><ul class="file-list"></ul></div><p class="composer-note" data-copy="local"></p><p class="composer-note attachment-note" data-copy="attach" hidden></p><p class="composer-note share-note" data-copy="shareHint" hidden></p><p class="composer-note long-note" data-copy="long" hidden></p><div class="composer-actions"><a class="email-draft" data-copy="open"></a><button class="share-draft" type="button" data-copy="share" hidden></button><button class="copy-draft" type="button" data-copy="copy"></button></div><p class="composer-status" role="status" aria-live="polite"></p><textarea class="copy-fallback" readonly hidden></textarea></div>`;
  document.body.append(dialog);
  // Keep mail-window controls outside the independently scrolling draft.
  const titlebar = document.createElement('header');
  titlebar.className = 'composer-titlebar';
  titlebar.innerHTML = '<svg class="mail-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>';
  titlebar.append(dialog.querySelector('#composer-title'), dialog.querySelector('.dismiss'));
  dialog.querySelector('.envelope-seam').replaceWith(titlebar);
  dialog.querySelector('.attachment-note').remove();
  const $ = selector => dialog.querySelector(selector);
  const subject = $('#draft-subject'), message = $('#draft-message'), picker = $('#draft-files');
  const choose = document.createElement('button');
  choose.type = 'button';
  choose.dataset.copy = 'files';
  choose.addEventListener('click', () => picker.click());
  picker.before(choose);
  picker.hidden = true;
  let files = [], dirtySubject = false, dirtyMessage = false, statusKey = '', sharing = false;
  const lang = () => document.documentElement.lang === 'el' ? 'el' : 'en';
  const text = () => copy[lang()];
  const payload = () => ({ files, title: subject.value, text: `${recipient}\n${subject.value}\n\n${message.value}` });
  const canShare = () => {
    try { return !!(files.length && navigator.share && navigator.canShare && navigator.canShare(payload())); } catch { return false; }
  };
  function update() {
    const t = text();
    const url = `mailto:${recipient}?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(message.value.replace(/\r?\n/g, '\r\n'))}`;
    // Conservative compatibility threshold, not a universal mail-client limit.
    const long = url.length > 1800;
    $('.email-draft').href = long ? `mailto:${recipient}` : url;
    $('.long-note').hidden = !long;
    $('.email-draft').textContent = files.length
      ? (lang() === 'el' ? 'Άνοιγμα κειμένου στο email' : 'Open text in email app') : t.open;
    $('.share-draft').hidden = !canShare();
    $('.share-draft').disabled = sharing;
    $('.share-note').hidden = !canShare();
    $('.composer-status').textContent = statusKey ? t[statusKey] : '';
    $('.copy-fallback').value = `${subject.value}\n\n${message.value}`;
    $('.file-list').replaceChildren(...files.map((file, index) => {
      const li = document.createElement('li'), name = document.createElement('span'), remove = document.createElement('button');
      name.textContent = `${file.name} · ${new Intl.NumberFormat(lang(), {style:'unit',unit:'kilobyte',maximumFractionDigits:1}).format(file.size / 1024)}`;
      remove.type = 'button'; remove.textContent = t.remove; remove.setAttribute('aria-label', `${t.remove}: ${file.name}`);
      remove.addEventListener('click', () => { files.splice(index, 1); update(); const buttons = dialog.querySelectorAll('.file-list button'); (buttons[Math.min(index, buttons.length - 1)] || choose).focus(); });
      li.append(name, remove); return li;
    }));
  }
  function localize() {
    const t = text();
    dialog.lang = lang();
    $('#composer-title').textContent = lang() === 'el' ? 'Νέο μήνυμα' : 'New message';
    dialog.querySelectorAll('[data-copy]').forEach(node => { node.textContent = t[node.dataset.copy]; });
    $('.dismiss').setAttribute('aria-label', t.close);
    $('.copy-fallback').setAttribute('aria-label', t.message);
    if (!dirtySubject) subject.value = t.defaultSubject;
    if (!dirtyMessage) message.value = t.defaultBody;
    update();
  }
  subject.addEventListener('input', () => { dirtySubject = true; update(); });
  message.addEventListener('input', () => { dirtyMessage = true; update(); });
  function addFiles(incoming) { files.push(...incoming); update(); }
  picker.addEventListener('change', () => { addFiles([...picker.files]); picker.value = ''; });
  const drop = $('.file-drop');
  drop.addEventListener('dragover', event => { event.preventDefault(); drop.classList.add('dragging'); });
  drop.addEventListener('dragleave', () => drop.classList.remove('dragging'));
  drop.addEventListener('drop', event => { event.preventDefault(); drop.classList.remove('dragging'); addFiles([...event.dataTransfer.files]); });
  let closing = null;
  function closeDraft() {
    if (closing) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { dialog.close(); return; }
    const animation = dialog.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(var(--travel-enter))',opacity:0}], {duration:180,easing:'cubic-bezier(.4,0,1,1)'});
    closing = animation;
    animation.finished.then(() => { if (closing === animation) { closing = null; dialog.close(); } }).catch(() => {});
  }
  $('.dismiss').addEventListener('click', closeDraft);
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeDraft(); });
  dialog.addEventListener('click', event => { const r = dialog.getBoundingClientRect(); if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) closeDraft(); });
  dialog.addEventListener('close', () => { if (closing) closing.cancel(); closing = null; if (!dialog.open) cta.focus({preventScroll:true}); });
  cta.addEventListener('click', event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); if (closing) closing.cancel(); closing = null; localize(); if (!dialog.open) dialog.showModal(); $('#composer-title').focus({preventScroll:true});
  });
  $('.copy-draft').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(`${subject.value}\n\n${message.value}`); statusKey = 'copied'; $('.copy-fallback').hidden = true; }
    catch { statusKey = 'copyError'; $('.copy-fallback').hidden = false; $('.copy-fallback').focus(); $('.copy-fallback').select(); }
    update();
  });
  $('.email-draft').addEventListener('click', () => {
    if (files.length) { statusKey = 'attach'; update(); }
  });
  $('.share-draft').addEventListener('click', async () => {
    if (sharing || !canShare()) return;
    sharing = true; statusKey = ''; update();
    try { await navigator.share(payload()); }
    catch (error) { if (error.name !== 'AbortError') statusKey = 'shareError'; }
    finally { sharing = false; update(); }
  });
  window.addEventListener('wcs:languagechange', localize);
  // preferences.js runs its initial translation at DOMContentLoaded.
  document.addEventListener('DOMContentLoaded', localize);
  localize();
})();

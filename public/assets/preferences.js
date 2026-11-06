/* Runs before styles: resolve the theme without hiding the document. */
(() => {
  'use strict';
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const read = (key, allowed, fallback) => {
    try {
      const value = localStorage.getItem(`wcs-${key}`);
      return allowed.includes(value) ? value : fallback;
    } catch { return fallback; }
  };
  const save = (key, value) => {
    try { localStorage.setItem(`wcs-${key}`, value); } catch { /* Session choice still works. */ }
  };
  let theme = read('theme', ['system', 'light', 'dark'], 'system');
  let language = read('language', ['auto', 'el', 'en'], 'auto');
  let updateControls = () => {};
  const applyTheme = () => {
    const resolved = theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
    root.dataset.wcsTheme = resolved;
    const updateChrome = () => {
      const color = getComputedStyle(root).getPropertyValue('--wcs-page-background').trim();
      if (color) document.querySelectorAll('meta[name="theme-color"]').forEach(meta => meta.setAttribute('content', color));
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', updateChrome, { once: true });
    else updateChrome();
    updateControls();
  };
  applyTheme();
  media.addEventListener('change', applyTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Trusted, authored translations. English is the static, no-script document.
    // Selectors map whole phrases so inline emphasis and accessible names translate together.
    const greek = {
      '.skip-link': 'Μετάβαση στο περιεχόμενο',
      '#intro-title': '<span class="accent">Λογισμικό</span> που κάνει τη δουλειά πιο <span class="accent">εύκολη.</span>',
      '.lead': 'Φτιάχνουμε λογισμικό στα μέτρα σας, πρακτικές λύσεις τεχνητής νοημοσύνης και αξιόπιστες πλατφόρμες για την επιχείρησή σας.',
      '.cta-label': 'Ας συζητήσουμε τι χρειάζεστε',
      '#services-title': 'Πώς μπορούμε να βοηθήσουμε',
      '.service-list article:nth-child(1) h3': 'Λογισμικό στα μέτρα σας',
      '.service-list article:nth-child(1) p': 'Φτιάχνουμε εφαρμογές για την ομάδα και τους πελάτες σας, προσαρμοσμένες στον τρόπο που δουλεύετε. Βελτιώνουμε επίσης τα προγράμματα που ήδη χρησιμοποιείτε.',
      '.service-list article:nth-child(2) h3': 'Αυτοματισμοί & τεχνητή νοημοσύνη',
      '.service-list article:nth-child(2) p': 'Συνδέουμε τα εργαλεία σας ώστε να περιορίσετε τις επαναλαμβανόμενες δουλειές. Αξιοποιούμε την τεχνητή νοημοσύνη εκεί όπου προσφέρει ουσιαστική βοήθεια.',
      '.service-list article:nth-child(3) h3': 'Αξιόπιστες υποδομές',
      '.service-list article:nth-child(3) p': 'Οργανώνουμε και βελτιώνουμε τις υποδομές όπου λειτουργούν οι εφαρμογές σας, ώστε να είναι πιο εύκολη η λειτουργία, η ενημέρωση και η συντήρησή τους.',
      '#work-title': 'Η δουλειά μας',
      '#work-llm h3 a': 'Private LLM Gateway',
      '#work-llm .project-kind': 'Πρόσβαση σε εργαλεία τεχνητής νοημοσύνης σε ιδιωτικό περιβάλλον',
      '#work-llm .project-copy p:nth-child(1)': 'Ένα κοινό σημείο πρόσβασης σε ιδιωτικά γλωσσικά μοντέλα — συστήματα τεχνητής νοημοσύνης που επεξεργάζονται κείμενο. Τα δεδομένα που εισάγετε δεν χρησιμοποιούνται για την εκπαίδευσή τους.',
      '#work-llm .project-copy p:nth-child(2)': 'Η ομάδα σας μπορεί να δουλεύει με τις πληροφορίες της επιχείρησης σε ένα ιδιωτικό περιβάλλον, ώστε οι απαντήσεις να ανταποκρίνονται στις δικές της ανάγκες.',
      '#work-llm .note': 'Λύσεις που έχουμε αναπτύξει για πελάτες και χρησιμοποιούμε και εμείς στην καθημερινή μας δουλειά.',
      '#work-images h3 a': 'Εικόνες με την ταυτότητα της επιχείρησής σας',
      '#work-images .project-kind': 'Εικόνες με βάση το δικό σας οπτικό υλικό',
      '#work-images .project-copy p:nth-child(1)': 'Εργαλεία δημιουργίας εικόνων για ομάδες που δουλεύουν με την οπτική ταυτότητα μιας επιχείρησης. Χρησιμοποιείτε το δικό σας υλικό για να δημιουργήσετε εικόνες σε διαφορετικά περιβάλλοντα, ανάλογα με το ζητούμενο.',
      '#work-images .project-copy p:nth-child(2)': 'Δίνουμε έμφαση στη συνέπεια με την οπτική σας ταυτότητα και στην καλλιτεχνική κατεύθυνση, αποφεύγοντας την τυποποιημένη αισθητική που συχνά έχουν οι εικόνες τεχνητής νοημοσύνης.',
      '#work-images .note': 'Λύσεις που έχουμε αναπτύξει για πελάτες και χρησιμοποιούμε και εμείς στην καθημερινή μας δουλειά.',
      '#work-agents h3 a': 'Coding Agents',
      '#work-agents .project-kind': 'Ανάπτυξη λογισμικού με υποστήριξη AI',
      '#work-agents .project-copy p:nth-child(1)': 'Ενσωματώνουμε εργαλεία και βοηθούς τεχνητής νοημοσύνης στη δουλειά των προγραμματιστών: από τον σχεδιασμό και τη συγγραφή κώδικα μέχρι τις δοκιμές και τη συντήρηση.',
      '#work-agents .note': 'Λύσεις που έχουμε αναπτύξει για πελάτες και χρησιμοποιούμε και εμείς στην καθημερινή μας δουλειά.',
      '#work-employees h3 a': 'AI Employees',
      '#work-employees .project-kind': 'Υποστήριξη σε νομικές και λογιστικές εργασίες με AI',
      '#work-employees .project-copy p:nth-child(1)': 'Αναπτύσσουμε εργαλεία που υποστηρίζουν νομικές και λογιστικές εργασίες, με βάση τις συγκεκριμένες ανάγκες και τον τρόπο εργασίας των ανθρώπων που τα χρησιμοποιούν.',
      '#work-employees .note': 'Λύσεις που έχουμε αναπτύξει για πελάτες και χρησιμοποιούμε και εμείς στην καθημερινή μας δουλειά.',
      '.project:nth-of-type(1) .project-kind': 'Εφαρμογή οργάνωσης και διαχείρισης εργοταξίων',
      '.project:nth-of-type(1) .project-copy p:nth-child(1)': 'Ένα σύστημα σχεδιασμένο ειδικά για τη διαχείριση εργοταξίων στην Ελλάδα, που χρησιμοποιείται ήδη από την ομάδα της Aigistos.',
      '.project:nth-of-type(1) .project-copy p:nth-child(2)': 'Βοηθά την ομάδα να έχει πιο καθαρή εικόνα των εργοταξίων, να αξιοποιεί τα δεδομένα της και να οργανώνει καλύτερα την καθημερινή δουλειά.',
      '.project:nth-of-type(1) .note': 'Η περιγραφή βασίζεται στην εμπειρία της ομάδας μας, χωρίς ποσοτικές μετρήσεις των αποτελεσμάτων.',
      '.project:nth-of-type(2) .project-kind': 'Ανάπτυξη παιχνιδιού · WhoCaresGames',
      '.project:nth-of-type(2) .project-copy p:nth-child(1)': 'Αναπτύξαμε ένα παιχνίδι περιπέτειας και στρατηγικής με κάρτες, από τους κανόνες και τους μηχανισμούς του μέχρι τα συστήματα για πολλούς παίκτες και τις υποδομές λειτουργίας του.',
      '.project:nth-of-type(2) .project-copy p:nth-child(2)': 'Υλοποιήθηκε στο πλαίσιο της δουλειάς μας ως WhoCaresGames.',
      '.text-link': 'Δείτε την πορεία ανάπτυξης <span class="link-context">στο YouTube</span>',
      '#approach-title': 'Πρώτα ακούμε.<br><span class="accent">Μετά βρίσκουμε τη σωστή λύση.</span>',
      '.steps li:nth-child(1) h3': 'Καταλαβαίνουμε τι χρειάζεστε',
      '.steps li:nth-child(1) .timeline-copy > p:last-child': 'Εξετάζουμε τι χρειάζεται να αλλάξει και συμφωνούμε τι περιλαμβάνει το έργο πριν δώσουμε τιμή.',
      '.steps li:nth-child(2) h3': 'Φτιάχνουμε τη λύση μαζί σας',
      '.steps li:nth-child(2) .timeline-copy > p:last-child': 'Συνδυάζουμε τις δεξιότητες που χρειάζεται το έργο, με τιμή για το αποτέλεσμα και όχι για τον αριθμό των προγραμματιστών.',
      '.steps li:nth-child(3) h3': 'Σκεφτόμαστε και τη συνέχεια',
      '.steps li:nth-child(3) .timeline-copy > p:last-child': 'Συμφωνούμε τι θα σας ανήκει, πώς θα γίνει η παράδοση και τι υποστήριξη θα ακολουθήσει.',
      '#people-title': 'Οι άνθρωποι<br><span class="accent">πίσω από τη δουλειά μας.</span>',
      '.collective-label': 'Ποιος άλλος νοιάζεται;',
      '.collective-hint': 'Διαλέξτε ένα πρόσωπο.',
      '#eva-expertise': 'Full-Stack Developer',
      '#marileni-expertise': 'Επιστήμονας δεδομένων',
      '#kikidimop-expertise': 'Ανάπτυξη εφαρμογών για κινητά',
      '#stratos-expertise': 'Καλλιτεχνική διεύθυνση · Κινηματογράφηση · VR/AR',
      '#giannis-expertise': 'Μουσική διεύθυνση · Δημιουργικό',
      '#teo-expertise': 'Μηχανικός λογισμικού',
      '#chara-expertise': 'Μηχανικός λογισμικού',
      '#kostas-expertise': 'Μηχανικός λογισμικού',
      '.people-copy > p:first-child': 'Είμαστε ο Mike και ο XRS, οι συνιδρυτές της Who Cares Software. Αναπτύσσουμε λογισμικό και τις υποδομές που το στηρίζουν, μαζί με ένα δίκτυο έμπιστων συνεργατών. Συμμετέχουμε οι ίδιοι σε κάθε έργο, από την πρώτη συζήτηση μέχρι την ανάπτυξη της λύσης σας.',
      '.signoff > span': 'Ποιος νοιάζεται; <span class="accent">Εμείς.</span>',
      'figure:nth-child(1) figcaption span': 'Συνιδρυτής',
      'figure:nth-child(2) figcaption span': 'Συνιδρυτής',
      '#contact-title': 'Τι θα έκανε τη δουλειά σας<br><span class="accent">πιο εύκολη;</span>',
      '.contact p': 'Δεν χρειάζεται να γνωρίζετε τις τεχνικές λεπτομέρειες ή να έχετε έτοιμο σχέδιο. Πείτε στον Mike και στον XRS τι θέλετε να κάνετε και τι σας δυσκολεύει σήμερα.',
      '.back-top span': 'Επιστροφή στην αρχή',
      '.footer-tagline': 'Ποιος νοιάζεται; <span class="accent">Εμείς.</span>',
      '.footer-nav a[href="#problems"]': 'Υπηρεσίες',
      '.footer-nav a[href="#work"]': 'Έργα',
      '.footer-nav a[href="#approach"]': 'Προσέγγιση',
      '.footer-nav a[href="#people"]': 'Ομάδα',
      '.footer-nav a[href="#contact"]': 'Επικοινωνία',
      '.site-nav a[href="#problems"]': '<span class="nav-label">Υπηρεσίες</span>',
      '.site-nav a[href="#work"]': '<span class="nav-label">Έργα</span>',
      '.site-nav a[href="#approach"]': '<span class="nav-label">Προσέγγιση</span>',
      '.site-nav a[href="#people"]': '<span class="nav-label">Ομάδα</span>',
      '.site-nav a[href="#contact"]': '<span class="nav-label">Επικοινωνία</span>'
    };
    const entries = Object.entries(greek).map(([selector, el]) => {
      const node = document.querySelector(selector);
      return node ? { node, en: node.innerHTML, el } : null;
    }).filter(Boolean);
    const pageEntries = [...document.querySelectorAll('[data-el]')].map(node => ({
      node, attribute: node.tagName === 'META' ? 'content' : null,
      en: node.tagName === 'META' ? node.content : node.innerHTML, el: node.dataset.el
    }));
    const pageAttributes = ['aria', 'alt'].flatMap(key => [...document.querySelectorAll(`[data-el-${key}]`)].map(node => ({
      node, attribute: key === 'aria' ? 'aria-label' : key,
      en: node.getAttribute(key === 'aria' ? 'aria-label' : key), el: node.getAttribute(`data-el-${key}`)
    })));
    const attributes = [
      ['.logo', 'aria-label', 'Who Cares Software — Κίνηση λογοτύπου'],
      ['.portrait-pair', 'aria-label', 'Γνωρίστε τους συνιδρυτές'],
      ['.collective-members', 'aria-label', 'Οι συνεργάτες μας'],
      ['.site-nav', 'aria-label', 'Ενότητες'],
      ['.footer-nav', 'aria-label', 'Υποσέλιδο'],
      ['meta[name="description"]', 'content', 'Ένα ανεξάρτητο στούντιο λογισμικού με επικεφαλής τον Mike και τον XRS. Λογισμικό στα μέτρα σας, πρακτικές λύσεις τεχνητής νοημοσύνης και αξιόπιστες πλατφόρμες για την επιχείρησή σας.'],
      ['meta[property="og:title"]', 'content', 'Who Cares Software — Λογισμικό που κάνει τη δουλειά πιο εύκολη'],
      ['meta[property="og:description"]', 'content', 'Λογισμικό στα μέτρα σας, πρακτικές λύσεις τεχνητής νοημοσύνης και αξιόπιστες πλατφόρμες. Γνωρίστε τον Mike και τον XRS, τους ανθρώπους πίσω από τη Who Cares Software.']
    ].map(([selector, attribute, el]) => {
      const node = document.querySelector(selector);
      if (!node || (root.hasAttribute('data-project-page') && selector.startsWith('meta'))) return null;
      return { node, attribute, en: node.getAttribute(attribute), el };
    }).filter(Boolean);
    const englishTitle = document.title;
    const applyLanguage = () => {
      const resolved = language === 'auto' ? (/^el(?:-|$)/i.test(navigator.language || '') ? 'el' : 'en') : language;
      root.lang = resolved;
      entries.forEach(entry => { entry.node.innerHTML = entry[resolved]; });
      attributes.forEach(entry => entry.node.setAttribute(entry.attribute, entry[resolved]));
      pageEntries.forEach(entry => {
        if (entry.attribute) entry.node.setAttribute(entry.attribute, entry[resolved]);
        else entry.node.innerHTML = entry[resolved];
      });
      pageAttributes.forEach(entry => entry.node.setAttribute(entry.attribute, entry[resolved]));
      document.title = resolved === 'el' ? (root.dataset.titleEl || 'Who Cares Software — Λογισμικό που κάνει τη δουλειά πιο εύκολη') : englishTitle;
      const subject = resolved === 'el' ? 'Ας συζητήσουμε ένα έργο' : 'Let’s discuss a project';
      const body = resolved === 'el'
        ? 'Γεια σας Mike και XRS,\r\n\r\nΕτοιμάζω: \r\nΘα ήθελα βοήθεια με: \r\n\r\nΕυχαριστώ,\r\n'
        : 'Hi Mike and XRS,\r\n\r\nI’m working on: \r\nWhat I’d like help with: \r\n\r\nThanks,\r\n';
      const cta = document.querySelector('.cta');
      if (cta) cta.href = `mailto:whocaressoftware@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      updateControls();
      window.dispatchEvent(new Event('wcs:languagechange'));
    };
    const themeControl = document.getElementById('theme');
    const languageControl = document.getElementById('language');
    updateControls = () => {
      const el = root.lang === 'el';
      const dark = root.dataset.wcsTheme === 'dark';
      const themeLabel = el
        ? (dark ? 'Αλλαγή σε φωτεινή εμφάνιση' : 'Αλλαγή σε σκοτεινή εμφάνιση')
        : (dark ? 'Switch to light theme' : 'Switch to dark theme');
      for (const [control, label] of [[themeControl, themeLabel]]) {
        control.setAttribute('aria-label', label);
        control.title = label;
      }
      languageControl.setAttribute('aria-label', el ? 'Γλώσσα' : 'Language');
      languageControl.querySelectorAll('input').forEach(input => { input.checked = input.value === root.lang; });
    };
    themeControl.addEventListener('click', () => {
      theme = root.dataset.wcsTheme === 'dark' ? 'light' : 'dark';
      save('theme', theme);
      applyTheme();
    });
    languageControl.addEventListener('change', event => {
      language = event.target.value;
      save('language', language);
      applyLanguage();
    });
    window.addEventListener('languagechange', applyLanguage);
    applyTheme();
    applyLanguage();
    document.querySelector('.preferences').hidden = false;
    document.querySelectorAll('a[href^="https://"]').forEach(link => { link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  });
})();

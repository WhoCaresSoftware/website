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
      '#intro-title': 'Λογισμικό στα μέτρα σας, αυτοματισμοί και AI <span class="accent">για δουλειά που έχει κολλήσει.</span>',
      '.lead': 'Συνήθως το πρόβλημα δεν είναι το λογισμικό, αλλά ο τρόπος που γίνεται η δουλειά. Ξεκινάμε από εκεί και φτιάχνουμε ό,τι λείπει.',
      '.cta-label': 'Πείτε μας τι κολλάει',
      '.intro-work-label': 'Δείτε τη δουλειά μας',
      '.intro-services li:nth-child(1)': 'Λογισμικό στα μέτρα σας',
      '.intro-services li:nth-child(2)': 'Αυτοματισμοί &amp; AI',
      '.intro-services li:nth-child(3)': 'Cloud &amp; αξιοπιστία',
      '#services-title': 'Τρία πράγματα,<br><span class="accent">σωστά φτιαγμένα.</span>',
      '.service-list article:nth-child(1) h3': 'Λογισμικό στα μέτρα σας',
      '.service-list article:nth-child(1) p': 'Εσωτερικά εργαλεία και εφαρμογές για πελάτες, φτιαγμένα γύρω από τον τρόπο που δουλεύει η επιχείρησή σας. Ή κάνουμε πιο υποφερτό το λογισμικό που ήδη έχετε.',
      '.service-list article:nth-child(2) h3': 'Αυτοματισμοί &amp; AI',
      '.service-list article:nth-child(2) p': 'Συνδέουμε τα εργαλεία σας. Κόβουμε τις επαναλαμβανόμενες δουλειές. Βάζουμε AI εκεί που κερδίζει τη θέση του και πουθενά αλλού.',
      '.service-list article:nth-child(3) h3': 'Cloud &amp; αξιοπιστία',
      '.service-list article:nth-child(3) p': 'Η υποδομή πίσω από το λογισμικό σας, στημένη ώστε να λειτουργεί, να ενημερώνεται και να συντηρείται πιο εύκολα. Το ζητούμενο είναι να είναι βαρετή.',
      '#work-title': 'Δουλειά που μπορούμε<br><span class="accent">πράγματι να δείξουμε.</span>',
      '#work-llm h3 a': 'Private LLM Gateway',
      '#work-llm .project-kind': 'Κοινή υποδομή AI',
      '#work-llm .project-copy p:nth-child(1)': 'Μία πύλη προς ιδιωτικά γλωσσικά μοντέλα για όλο τον οργανισμό. Τα δεδομένα σας δεν χρησιμοποιούνται για την εκπαίδευσή τους.',
      '#work-llm .project-copy p:nth-child(2)': 'Η ομάδα σας έχει AI για πραγματική δουλειά. Το πλαίσιό σας μένει σε ιδιωτικό περιβάλλον μοντέλων.',
      '#work-llm .note': 'Φτιαγμένο για πελάτες. Το χρησιμοποιούμε και εμείς.',
      '#work-images h3 a': 'Brand Image Pipelines',
      '#work-images .project-kind': 'Εικόνα και βίντεο για ομάδες branding',
      '#work-images .project-copy p:nth-child(1)': 'Δημιουργία εικόνων στα μέτρα ομάδων branding. Ανεβάζετε το δικό σας υλικό και το βάζετε σε νέες σκηνές, χωρίς νέα φωτογράφιση.',
      '#work-images .project-copy p:nth-child(2)': 'Με βάση την οπτική συνέπεια και την καλλιτεχνική κατεύθυνση, ώστε το αποτέλεσμα να μοιάζει με το brand σας και όχι με τυποποιημένο AI.',
      '#work-images .note': 'Φτιαγμένο για πελάτες. Το χρησιμοποιούμε και εμείς.',
      '#work-agents h3 a': 'Coding Agents',
      '#work-agents .project-kind': 'Υιοθέτηση AI σε ομάδες μηχανικών',
      '#work-agents .project-copy p:nth-child(1)': 'Εργαλεία AI και coding agents σε όλο τον κύκλο ανάπτυξης: σχεδιασμό, υλοποίηση, δοκιμές και συντήρηση. Ο κώδικας είναι μόνο ένα βήμα.',
      '#work-agents .note': 'Φτιαγμένο για πελάτες. Το χρησιμοποιούμε και εμείς.',
      '#work-employees h3 a': 'AI Employees',
      '#work-employees .project-kind': 'Ομάδες AI για μικρές επιχειρήσεις',
      '#work-employees .project-copy p:nth-child(1)': 'Νομικές και λογιστικές εργασίες με υποστήριξη AI, φτιαγμένες γύρω από τα καθήκοντα των ανθρώπων που διατηρούν την ευθύνη τους.',
      '#work-employees .note': 'Φτιαγμένο για πελάτες. Το χρησιμοποιούμε και εμείς.',
      '.project:nth-of-type(1) .project-kind': 'ERP για εργοτάξια',
      '.project:nth-of-type(1) .project-copy p:nth-child(1)': 'Ένα σύστημα με μία δουλειά: τη διαχείριση εργοταξίων στην Ελλάδα. Το χρησιμοποιεί ήδη η ομάδα της Aigistos.',
      '.project:nth-of-type(1) .project-copy p:nth-child(2)': 'Πιο καθαρή εικόνα των εργοταξίων, καλύτερα στοιχεία και λιγότερη τριβή στην καθημερινή δουλειά.',
      '.project:nth-of-type(1) .note': 'Τα αποτελέσματα περιγράφονται ποιοτικά από την ομάδα μας.',
      '.project:nth-of-type(2) .project-kind': 'Ανάπτυξη παιχνιδιού · WhoCaresGames',
      '.project:nth-of-type(2) .project-copy p:nth-child(1)': 'Ένα roguelite παιχνίδι με κάρτες, φτιαγμένο από την αρχή ως το τέλος: gameplay, υπηρεσίες backend, συστήματα πολλών παικτών και υποδομές.',
      '.project:nth-of-type(2) .project-copy p:nth-child(2)': 'Το δικό μας παιχνίδι, μέσα από τη WhoCaresGames.',
      '.text-link': 'Δείτε την πορεία ανάπτυξης <span class="link-context">στο YouTube</span>',
      '#approach-title': 'Πρώτα καταλαβαίνουμε.<br><span class="accent">Μετά γράφουμε κώδικα.</span>',
      '.steps li:nth-child(1) h3': 'Ρωτάμε τα δύσκολα',
      '.steps li:nth-child(1) .timeline-copy > p:last-child': 'Δοκιμάζουμε τις παραδοχές και συμφωνούμε το αντικείμενο πριν μιλήσει κανείς για τιμή.',
      '.steps li:nth-child(2) h3': 'Χτίζουμε γύρω από τη δουλειά',
      '.steps li:nth-child(2) .timeline-copy > p:last-child': 'Φέρνουμε τις δεξιότητες που χρειάζεται το έργο. Πληρώνετε για το αντικείμενο, όχι για τον αριθμό των ατόμων.',
      '.steps li:nth-child(3) h3': 'Κανονίζουμε τι γίνεται μετά',
      '.steps li:nth-child(3) .timeline-copy > p:last-child': 'Συμφωνούμε τι ανήκει σε ποιον, πώς γίνεται η παράδοση και ποια υποστήριξη ακολουθεί. Πριν χρειαστεί να το ρωτήσετε.',
      '#people-title': 'Δύο ιδρυτές.<br><span class="accent">Κανένας account manager.</span>',
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
      '.people-copy > p:first-child': 'Ο Mike και ο XRS είναι συνιδρυτές και μηχανικοί πλατφορμών. Μιλάτε με τους ανθρώπους που το φτιάχνουν, και όταν το ζητά η δουλειά μπαίνει και ένα δίκτυο έμπιστων συνεργατών.',
      '.signoff > span': 'Ποιος νοιάζεται; <span class="accent">Εμείς.</span>',
      'figure:nth-child(1) figcaption span': 'Συνιδρυτής',
      'figure:nth-child(2) figcaption span': 'Συνιδρυτής',
      '#contact-title': 'Τι χρειάζεται να<br><span class="accent">δουλεύει καλύτερα;</span>',
      '.contact-body p': 'Δεν χρειάζεται έτοιμο σχέδιο. Πείτε στον Mike και στον XRS με τι ασχολείστε και τι σας εμποδίζει.',
      '.back-top span': 'Επιστροφή στην αρχή',
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
      ['meta[name="description"]', 'content', 'Ένα ανεξάρτητο στούντιο λογισμικού από τον Mike και τον XRS. Λογισμικό στα μέτρα σας, πρακτικό AI και αξιόπιστες πλατφόρμες, ξεκινώντας από τον τρόπο που δουλεύετε.'],
      ['meta[property="og:title"]', 'content', 'Who Cares Software — Λογισμικό που κάνει τη δουλειά πιο εύκολη'],
      ['meta[property="og:description"]', 'content', 'Λογισμικό στα μέτρα σας, αυτοματισμοί και AI για δουλειά που έχει κολλήσει. Ξεκινάμε από τον τρόπο που γίνεται η δουλειά και φτιάχνουμε ό,τι λείπει.']
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
      const subject = resolved === 'el' ? 'Κάτι χρειάζεται να δουλεύει καλύτερα' : 'Something needs to work better';
      const body = resolved === 'el'
        ? 'Γεια σας Mike και XRS,\r\n\r\nΜε τι ασχολούμαι: \r\nΤι με εμποδίζει: \r\n\r\nΕυχαριστώ,\r\n'
        : 'Hi Mike and XRS,\r\n\r\nWhat I’m working on: \r\nWhat’s in the way: \r\n\r\nThanks,\r\n';
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

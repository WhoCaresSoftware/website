/* Public profiles complement the founder facts confirmed by the studio. */
(() => {
  'use strict';
  if (!window.HTMLDialogElement || !HTMLDialogElement.prototype.showModal) return;
  const profiles = {
    mike: {
      name: 'Michail “Mike” Bastakis',
      en: {
        role: 'Co-founder · Software architecture & platform engineering',
        summary: 'Mike connects software architecture, full-stack development and production infrastructure. His experience spans automotive software delivery and MLOps, with a focus on building robust systems and making them easier to deploy and operate.',
        expertise: ['Software architecture and cloud infrastructure', 'DevOps, CI/CD automation and infrastructure management', 'AI engineering and developer tooling'],
        experience: ['MLOps Engineer · Deutsche Telekom · February 2025–present.', 'DevOps Engineer · Software Competitiveness International (SoftCom) · April 2024–July 2025. Development and enhancement of large-scale CI/CD pipelines for automotive software delivery.', 'Software Engineer · SoftCom · October 2021–April 2024. Software engineering for a Tier 1 automotive software supplier.'],
        education: ['BSc in Computer Science · University of Crete · 2019–2023. Grade: 8/10.'],
        projects: ['Soleblast · Led full-stack development of a group project for custom shoe and item design (2023).', 'Greek-language question answering · Comparative evaluation using machine translation and BERT (2022–2023).', 'Tiresias · Research prototype for bilingual question answering over DBpedia abstracts, using machine translation and BERT (2022).'],
        interests: ['Game development, embedded programming and a self-managed Kubernetes home server keep his work connected to hands-on experimentation.']
      },
      el: {
        role: 'Συνιδρυτής · Σχεδιασμός λογισμικού και υποδομών',
        summary: 'Ο Mike σχεδιάζει και αναπτύσσει εφαρμογές, καθώς και τις υποδομές που χρειάζονται για να λειτουργούν. Έχει εργαστεί σε λογισμικό για την αυτοκινητοβιομηχανία και σε συστήματα μηχανικής μάθησης. Εστιάζει σε αξιόπιστες λύσεις που είναι πιο εύκολο να ενημερώνονται και να συντηρούνται.',
        expertise: ['Αρχιτεκτονική λογισμικού και υποδομές cloud', 'DevOps, αυτοματισμοί CI/CD και διαχείριση υποδομών', 'Μηχανική AI και εργαλεία για προγραμματιστές'],
        experience: ['MLOps Engineer · Deutsche Telekom · Φεβρουάριος 2025–σήμερα.', 'DevOps Engineer · Software Competitiveness International (SoftCom) · Απρίλιος 2024–Ιούλιος 2025. Ανάπτυξη και βελτίωση pipelines CI/CD μεγάλης κλίμακας για την παράδοση λογισμικού στην αυτοκινητοβιομηχανία.', 'Software Engineer · SoftCom · Οκτώβριος 2021–Απρίλιος 2024. Ανάπτυξη λογισμικού για προμηθευτή λογισμικού Tier 1 της αυτοκινητοβιομηχανίας.'],
        education: ['Πτυχίο Επιστήμης Υπολογιστών · Πανεπιστήμιο Κρήτης · 2019–2023. Βαθμός: 8/10.'],
        projects: ['Soleblast · Επικεφαλής της full-stack ανάπτυξης ομαδικού έργου για τον σχεδιασμό εξατομικευμένων παπουτσιών και αντικειμένων (2023).', 'Απάντηση ερωτήσεων σε ελληνικά κείμενα · Συγκριτική αξιολόγηση με μηχανική μετάφραση και BERT (2022–2023).', 'Tiresias · Ερευνητικό πρωτότυπο δίγλωσσης απάντησης ερωτήσεων σε περιλήψεις της DBpedia, με μηχανική μετάφραση και BERT (2022).'],
        interests: ['Στον ελεύθερο χρόνο του ασχολείται με την ανάπτυξη παιχνιδιών, τον προγραμματισμό ενσωματωμένων συστημάτων και τον δικό του οικιακό διακομιστή με Kubernetes. Του αρέσει να δοκιμάζει νέες ιδέες στην πράξη.']
      },
      links: [['LinkedIn', 'https://www.linkedin.com/in/mbastakis/'], ['GitHub', 'https://github.com/mbastakis/'], ['Technical blog', 'https://mbastakis.github.io/blog/']]
    },
    xrs: {
      name: 'XRS',
      en: {
        role: 'Co-founder · Software engineering & DevOps',
        summary: 'XRS brings over a decade of experience across enterprise software and game development. As founder of WhoCares Games, he has brought developers, artists and designers together to deliver complex projects, combining technical leadership with hands-on software and infrastructure work.',
        expertise: ['API design, microservices and real-time server systems', 'DevOps, CI/CD pipelines, cloud infrastructure and automation', 'Game systems development and cross-functional team leadership'],
        experience: ['Founder / Software Engineer / DevOps · WhoCares Games · 2015–present. Built and led a game-development collective spanning engineering, art and design.', 'DevOps Engineer · GWI · May–August 2025. Led DevOps support for Data and ML teams across development and deployment.', 'DevOps / Software Engineer · Heavy Metal · 2023–2025. Directed Hex Mythica development, from game systems to server architecture and procedural content generation.', 'Backend Game Server Developer / Software Engineer · Vulcan Forged · 2022–2023. Built game logic and MMO server infrastructure, with automated delivery pipelines and observability.'],
        projects: ['Hex Mythica · Directed game design and development, including blockchain feature integration.', 'Metascapes · Directed the overall vision and technical development, including MMO server architecture and game flow.', 'Moros Protocol · Developed level-design tools and peer-to-peer networking for cooperative gameplay.', 'WaveTiles · Led a six-person team, managing the codebase, architecture, sound design and game flow.'],
        education: ['University of Piraeus · 2013–2019.'],
        interests: ['Once a game developer, always a game developer: creativity, playfulness and a problem-solving mindset shape how he approaches software.']
      },
      el: {
        role: 'Συνιδρυτής · Ανάπτυξη λογισμικού και DevOps',
        summary: 'Ο XRS έχει περισσότερα από δέκα χρόνια εμπειρίας σε εφαρμογές για επιχειρήσεις και στην ανάπτυξη παιχνιδιών. Ως ιδρυτής της WhoCares Games, έχει συντονίσει προγραμματιστές, καλλιτέχνες και σχεδιαστές σε σύνθετα έργα. Παράλληλα με την καθοδήγηση της ομάδας, δουλεύει ο ίδιος στον κώδικα και στις υποδομές.',
        expertise: ['Σχεδιασμός API, microservices και συστήματα server πραγματικού χρόνου', 'DevOps, pipelines CI/CD, υποδομές cloud και αυτοματισμοί', 'Ανάπτυξη συστημάτων παιχνιδιών και καθοδήγηση διεπιστημονικών ομάδων'],
        experience: ['Ιδρυτής / Software Engineer / DevOps · WhoCares Games · 2015–σήμερα. Δημιούργησε και καθοδήγησε μια συλλογικότητα ανάπτυξης παιχνιδιών με ειδικούς στον προγραμματισμό, τα εικαστικά και τον σχεδιασμό.', 'DevOps Engineer · GWI · Μάιος–Αύγουστος 2025. Επικεφαλής της υποστήριξης DevOps για ομάδες Data και ML, από την ανάπτυξη έως την εγκατάσταση σε παραγωγή.', 'DevOps / Software Engineer · Heavy Metal · 2023–2025. Διηύθυνε την ανάπτυξη του Hex Mythica, από τα συστήματα παιχνιδιού έως την αρχιτεκτονική server και τη διαδικαστική παραγωγή περιεχομένου.', 'Backend Game Server Developer / Software Engineer · Vulcan Forged · 2022–2023. Ανέπτυξε λογική παιχνιδιών και υποδομές server για MMO, με αυτοματοποιημένα pipelines παράδοσης και παρατηρησιμότητα.'],
        projects: ['Hex Mythica · Διηύθυνε τον σχεδιασμό και την ανάπτυξη του παιχνιδιού, συμπεριλαμβανομένης της ενσωμάτωσης λειτουργιών blockchain.', 'Metascapes · Καθόρισε τη συνολική κατεύθυνση και διηύθυνε την τεχνική ανάπτυξη, με αρχιτεκτονική server MMO και ροή παιχνιδιού.', 'Moros Protocol · Ανέπτυξε εργαλεία σχεδιασμού επιπέδων και δικτύωση peer-to-peer για συνεργατικό παιχνίδι.', 'WaveTiles · Καθοδήγησε εξαμελή ομάδα, με ευθύνη για τον κώδικα, την αρχιτεκτονική, τον ηχητικό σχεδιασμό και τη ροή παιχνιδιού.'],
        education: ['Πανεπιστήμιο Πειραιώς · 2013–2019.'],
        interests: ['Η αγάπη του για τα παιχνίδια τον ακολουθεί σε κάθε έργο: του αρέσει να πειραματίζεται, να βρίσκει δημιουργικές λύσεις και να προσεγγίζει τα προβλήματα με περιέργεια.']
      },
      links: [['LinkedIn', 'https://www.linkedin.com/in/chriskarpousis/']]
    }
  };
  const dialog = document.createElement('dialog');
  dialog.className = 'founder-dialog';
  dialog.setAttribute('aria-labelledby', 'founder-name');
  dialog.innerHTML = '<header class="founder-toolbar"><h2 id="founder-name"></h2><button class="founder-close" type="button" autofocus></button></header><div class="founder-content"></div>';
  document.body.append(dialog);
  let active;
  let trigger;
  const greek = () => document.documentElement.lang === 'el';
  const render = () => {
    const profile = profiles[active];
    const copy = profile[greek() ? 'el' : 'en'];
    const content = dialog.querySelector('.founder-content');
    content.replaceChildren();
    const text = (tag, value, className) => {
      const node = document.createElement(tag);
      node.textContent = value;
      if (className) node.className = className;
      return node;
    };
    dialog.querySelector('#founder-name').textContent = profile.name;
    content.append(text('p', copy.role, 'founder-role'), text('p', copy.summary, 'founder-summary'));
    const section = (title, body) => {
      const node = document.createElement('section');
      node.className = 'founder-section';
      node.append(text('h3', title), body);
      content.append(node);
    };
    for (const [key, title] of [
      ['expertise', greek() ? 'Εξειδίκευση' : 'Expertise'],
      ['experience', greek() ? 'Εμπειρία' : 'Experience'],
      ['projects', greek() ? 'Επιλεγμένα έργα' : 'Selected projects'],
      ['education', greek() ? 'Εκπαίδευση' : 'Education'],
      ['interests', greek() ? 'Πέρα από τη δουλειά' : 'Beyond client work']
    ]) {
      if (!copy[key]) continue;
      const list = document.createElement('ul');
      copy[key].forEach(item => list.append(text('li', item)));
      section(title, list);
    }
    const links = document.createElement('div');
    links.className = 'founder-links';
    profile.links.forEach(([label, href]) => {
      const link = text('a', greek() && label === 'Technical blog' ? 'Τεχνικό ιστολόγιο' : label);
      link.href = href;
      links.append(link);
    });
    section(greek() ? 'Περισσότερα' : 'Elsewhere', links);
    dialog.querySelector('.founder-close').setAttribute('aria-label', greek() ? 'Κλείσιμο' : 'Close');
    dialog.querySelector('.founder-close').innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    dialog.querySelectorAll('a[href^="https://"]').forEach(link => { link.target = '_blank'; link.rel = 'noopener noreferrer'; });
  };
  const open = (event, key) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    active = key;
    trigger = event.target.closest('a');
    render();
    dialog.showModal();
    dialog.scrollTop = 0;
    document.documentElement.classList.add('founder-reading');
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) dialog.animate([{opacity: .5, transform: 'translateY(16px)'}, {opacity: 1, transform: 'none'}], {duration: 280, easing: 'cubic-bezier(.16,1,.3,1)'});
  };
  document.querySelectorAll('.founder-portrait[data-founder]').forEach(portrait => {
    const key = portrait.dataset.founder;
    const link = document.createElement('span');
    link.className = 'founder-profile-link';
    link.setAttribute('aria-hidden', 'true');
    link.innerHTML = '<span></span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>';
    portrait.closest('figure').append(link);
    portrait.setAttribute('aria-haspopup', 'dialog');
  });
  // Translations replace paragraph contents; rebuild inline links after each change.
  const linkNames = () => {
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!node.parentElement.closest('a, button, script, textarea, .portrait-pair') && /\b(Mike|XRS)\b/.test(node.textContent)) nodes.push(node);
    }
    nodes.forEach(node => {
      const fragment = document.createDocumentFragment();
      node.textContent.split(/\b(Mike|XRS)\b/).forEach(part => {
        const key = part.toLowerCase();
        if (!profiles[key]) { fragment.append(part); return; }
        const link = document.createElement('a');
        link.className = 'founder-name-link';
        link.dataset.founder = key;
        link.href = profiles[key].links[0][1];
        link.textContent = part;
        link.setAttribute('aria-haspopup', 'dialog');
        fragment.append(link);
      });
      node.replaceWith(fragment);
    });
  };
  document.addEventListener('click', event => {
    const link = event.target.closest('a[data-founder]');
    if (link) open(event, link.dataset.founder);
  });
  const localize = () => {
    linkNames();
    document.querySelectorAll('.founder-portrait[data-founder]').forEach(portrait => {
      const label = greek() ? 'Δείτε το προφίλ' : 'View profile';
      const name = profiles[portrait.dataset.founder].name;
      portrait.setAttribute('aria-label', `${label}: ${name}`);
      const link = portrait.closest('figure').querySelector('.founder-profile-link');
      link.querySelector('span').textContent = label;
      link.setAttribute('aria-label', `${label}: ${name}`);
    });
    if (dialog.open) render();
  };
  dialog.querySelector('.founder-close').addEventListener('click', () => dialog.close());
  let backdrop = false;
  dialog.addEventListener('pointerdown', event => { backdrop = event.target === dialog; });
  dialog.addEventListener('click', event => { if (backdrop && event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('founder-reading');
    trigger?.focus({preventScroll: true});
  });
  window.addEventListener('wcs:languagechange', localize);
  localize();
})();

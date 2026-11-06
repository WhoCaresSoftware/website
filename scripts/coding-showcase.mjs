// Newly authored public teaching material, not copied from a client repository.
const t = (en, el) => ({ en, el });
const step = (title, body) => ({ title, body });

export const codingShowcase = {
  title: t('The lifecycle we designed.', 'Ο κύκλος ανάπτυξης που σχεδιάσαμε.'),
  intro: t('The proposed process connects the work before, during and after coding. Each stage hands something to the next. Engineers and product leads shape the decisions and review responsibilities around their team.', 'Η διαδικασία που προτείναμε συνδέει τη δουλειά πριν, κατά τη διάρκεια και μετά τον κώδικα. Κάθε στάδιο παραδίδει κάτι στο επόμενο. Οι μηχανικοί και οι υπεύθυνοι προϊόντος προσαρμόζουν τις αποφάσεις και τις αρμοδιότητες ελέγχου στην ομάδα τους.'),
  stages: [
    step(t('Request', 'Αίτημα'), t('Describe the need and the intended outcome.', 'Περιγραφή της ανάγκης και του επιθυμητού αποτελέσματος.')),
    step(t('Specification', 'Προδιαγραφή'), t('Draft the scope, constraints and acceptance criteria.', 'Προσχέδιο με αντικείμενο, περιορισμούς και κριτήρια αποδοχής.')),
    step(t('Architecture', 'Αρχιτεκτονική'), t('Map the affected components and record the design decisions.', 'Αποτύπωση των επηρεαζόμενων μερών και των σχεδιαστικών αποφάσεων.')),
    step(t('Implementation', 'Υλοποίηση'), t('Work through the change with agents and shared project context.', 'Υλοποίηση της αλλαγής με agents και κοινό πλαίσιο έργου.')),
    step(t('Validation', 'Επαλήθευση'), t('Check the change against tests and acceptance criteria.', 'Έλεγχος της αλλαγής με δοκιμές και κριτήρια αποδοχής.')),
    step(t('Human review', 'Ανθρώπινος έλεγχος'), t('Review the approach, the code and the evidence before approval.', 'Εξέταση της προσέγγισης, του κώδικα και των αποτελεσμάτων πριν από την έγκριση.')),
    step(t('Delivery', 'Παράδοση'), t('Release the approved change and verify its behavior.', 'Διάθεση της εγκεκριμένης αλλαγής και έλεγχος της συμπεριφοράς της.'))
  ],
  example: {
    title: t('A worked example: customer discount approvals.', 'Ένα παράδειγμα στην πράξη: έγκριση εκπτώσεων πελατών.'),
    intro: t('Imagine a sales team chasing discount approvals through emails and calls. The business asks for one thing: each request gets a responsible manager and a visible decision. Here is how that becomes a clear brief and a design the team can build.', 'Ας πάρουμε μια ομάδα πωλήσεων που κυνηγά εγκρίσεις εκπτώσεων με email και τηλεφωνήματα. Η επιχείρηση ζητά ένα πράγμα: κάθε αίτημα να έχει υπεύθυνο και ορατή απόφαση. Έτσι αυτό γίνεται σαφής προδιαγραφή και σχέδιο που μπορεί να υλοποιήσει η ομάδα.'),
    specTitle: t('Request and approve a discount', 'Αίτημα και έγκριση έκπτωσης'),
    goalLabel: t('Business goal', 'Επιχειρηματικός στόχος'),
    goal: t('Help salespeople get a clear decision before sending a customer offer, without chasing updates across messages.', 'Οι πωλητές να λαμβάνουν σαφή απόφαση πριν στείλουν προσφορά στον πελάτη, χωρίς να αναζητούν ενημερώσεις σε διάσπαρτα μηνύματα.'),
    criteriaLabel: t('What must work', 'Τι πρέπει να λειτουργεί'),
    criteria: [
      t('The salesperson submits the customer, proposed discount and reason; the request appears in the responsible manager’s queue.', 'Ο πωλητής καταχωρίζει τον πελάτη, την προτεινόμενη έκπτωση και την αιτιολόγηση. Το αίτημα εμφανίζεται στη λίστα του αρμόδιου υπευθύνου.'),
      t('Only the responsible manager can approve or decline, with a recorded explanation.', 'Μόνο ο αρμόδιος υπεύθυνος μπορεί να εγκρίνει ή να απορρίψει, με καταγεγραμμένη αιτιολόγηση.'),
      t('The salesperson is notified of the decision and can see whether the request is pending, approved or declined.', 'Ο πωλητής ενημερώνεται για την απόφαση και βλέπει αν το αίτημα εκκρεμεί, έχει εγκριθεί ή έχει απορριφθεί.')
    ],
    scopeLabel: t('Outside this change', 'Εκτός αντικειμένου'),
    scope: t('Automatic discount decisions and sending offers to customers.', 'Αυτόματες αποφάσεις για εκπτώσεις και αποστολή προσφορών στους πελάτες.'),
    testsLabel: t('How we would check it', 'Πώς θα το ελέγχαμε'),
    tests: t('Walk through an approval and a rejection, check that another employee cannot decide, and confirm the salesperson receives the correct update.', 'Δοκιμή έγκρισης και απόρριψης, έλεγχος ότι άλλος εργαζόμενος δεν μπορεί να αποφασίσει και επιβεβαίωση ότι ο πωλητής λαμβάνει τη σωστή ενημέρωση.'),
    architectureTitle: t('How the system would support it', 'Πώς θα το υποστήριζε το σύστημα'),
    components: [
      step(t('Sales request form', 'Φόρμα αιτήματος πωλητή'), t('Capture the customer, discount and reason in one place.', 'Συγκέντρωση πελάτη, έκπτωσης και αιτιολόγησης σε ένα σημείο.')),
      step(t('Approval rules', 'Κανόνες έγκρισης'), t('Route the request to the responsible manager and restrict who can decide.', 'Δρομολόγηση στον αρμόδιο υπεύθυνο και περιορισμός του δικαιώματος απόφασης.')),
      step(t('Decision record', 'Αρχείο αποφάσεων'), t('Keep the status, explanation and who decided together.', 'Καταγραφή της κατάστασης, της αιτιολόγησης και του υπευθύνου της απόφασης.')),
      step(t('Team notifications', 'Ειδοποιήσεις ομάδας'), t('Alert the manager to a new request and the salesperson to the decision.', 'Ενημέρωση του υπευθύνου για νέο αίτημα και του πωλητή για την απόφαση.'))
    ],
    handoff: t('The business team reviews the rules before coding starts. Engineers and coding agents then work from the same brief, and reviewers check the finished feature against the agreed customer journey.', 'Η επιχειρηματική ομάδα ελέγχει τους κανόνες πριν ξεκινήσει η υλοποίηση. Μηχανικοί και coding agents δουλεύουν μετά με την ίδια προδιαγραφή και όσοι ελέγχουν τη λειτουργία τη συγκρίνουν με τη συμφωνημένη διαδρομή χρήσης.')
  },
  supportTitle: t('The work around the workflow.', 'Η δουλειά γύρω από τη ροή.'),
  supportIntro: t('A diagram doesn’t change how a team works. Shared tooling, automation and hands-on support do.', 'Ένα διάγραμμα δεν αλλάζει τον τρόπο που δουλεύει μια ομάδα. Τα κοινά εργαλεία, οι αυτοματισμοί και η πρακτική υποστήριξη το αλλάζουν.')
};

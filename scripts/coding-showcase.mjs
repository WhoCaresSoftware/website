// Newly authored public teaching material, not copied from a client repository.
const t = (en, el) => ({ en, el });
const step = (title, body) => ({ title, body });

export const codingShowcase = {
  title: t('The lifecycle we designed.', 'Ο κύκλος ανάπτυξης που σχεδιάσαμε.'),
  intro: t('The proposed process connects the work before, during and after coding. Each stage has an output for the next; engineers and product leads shape the decisions and review responsibilities around their team.', 'Η διαδικασία που προτείναμε συνδέει τη δουλειά πριν, κατά τη διάρκεια και μετά τη συγγραφή κώδικα. Κάθε στάδιο δίνει αποτέλεσμα στο επόμενο. Οι μηχανικοί και οι υπεύθυνοι προϊόντος προσαρμόζουν τις αποφάσεις και τις αρμοδιότητες ελέγχου στην ομάδα τους.'),
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
    title: t('A worked example: a CSV export.', 'Ένα παράδειγμα στην πράξη: εξαγωγή CSV.'),
    intro: t('Start with a small request: let a user export a filtered report. A specification makes the expected behavior explicit; an architecture sketch shows where the work belongs.', 'Αφετηρία είναι ένα μικρό αίτημα: ο χρήστης να εξάγει μια αναφορά με τα φίλτρα που έχει επιλέξει. Η προδιαγραφή αποσαφηνίζει την αναμενόμενη συμπεριφορά και το αρχιτεκτονικό διάγραμμα δείχνει πού εντάσσεται η αλλαγή.'),
    specTitle: t('Export a filtered report', 'Εξαγωγή φιλτραρισμένης αναφοράς'),
    goalLabel: t('Goal', 'Στόχος'),
    goal: t('Download the records the user is allowed to view, using the report’s current filters.', 'Λήψη των εγγραφών που επιτρέπεται να δει ο χρήστης, με τα τρέχοντα φίλτρα της αναφοράς.'),
    criteriaLabel: t('Acceptance criteria', 'Κριτήρια αποδοχής'),
    criteria: [
      t('Respect the user’s access permissions.', 'Τήρηση των δικαιωμάτων πρόσβασης του χρήστη.'),
      t('Apply the same filters as the report.', 'Εφαρμογή των ίδιων φίλτρων με την αναφορά.'),
      t('Return column headers even when there are no matching records.', 'Επιστροφή επικεφαλίδων στηλών ακόμη και χωρίς αντίστοιχες εγγραφές.')
    ],
    scopeLabel: t('Outside this change', 'Εκτός αντικειμένου'),
    scope: t('Scheduled exports and a new reporting interface.', 'Προγραμματισμένες εξαγωγές και νέα διεπαφή αναφορών.'),
    testsLabel: t('Validation', 'Επαλήθευση'),
    tests: t('Test permitted access, denied access, active filters and empty results.', 'Δοκιμές για επιτρεπόμενη και μη επιτρεπόμενη πρόσβαση, ενεργά φίλτρα και κενά αποτελέσματα.'),
    architectureTitle: t('The request path', 'Η διαδρομή του αιτήματος'),
    components: [
      step(t('Report interface', 'Διεπαφή αναφοράς'), t('Send the selected filters.', 'Αποστολή των επιλεγμένων φίλτρων.')),
      step(t('Export endpoint', 'Endpoint εξαγωγής'), t('Check access and validate the request.', 'Έλεγχος πρόσβασης και εγκυρότητας του αιτήματος.')),
      step(t('Filtered query', 'Φιλτραρισμένο ερώτημα'), t('Read only the permitted, matching records.', 'Ανάγνωση μόνο των επιτρεπόμενων εγγραφών που αντιστοιχούν στα φίλτρα.')),
      step(t('CSV response', 'Απόκριση CSV'), t('Return the columns and matching rows.', 'Επιστροφή των στηλών και των αντίστοιχων γραμμών.'))
    ],
    handoff: t('The specification gives implementation and review the same reference point. Its acceptance criteria become concrete checks, not assumptions left for the reviewer to reconstruct.', 'Η προδιαγραφή δίνει κοινό σημείο αναφοράς στην υλοποίηση και στον έλεγχο. Τα κριτήρια αποδοχής γίνονται συγκεκριμένοι έλεγχοι, όχι υποθέσεις που πρέπει να ανασυνθέσει εκείνος που ελέγχει την αλλαγή.')
  },
  supportTitle: t('The work around the workflow.', 'Η υποστήριξη γύρω από τη ροή.'),
  supportIntro: t('A lifecycle diagram is only one part of the engagement. Shared tooling, automation and hands-on support help the team put the approach to work.', 'Το διάγραμμα του κύκλου ανάπτυξης είναι μόνο ένα μέρος της συνεργασίας. Τα κοινά εργαλεία, οι αυτοματισμοί και η πρακτική υποστήριξη βοηθούν την ομάδα να εφαρμόσει την προσέγγιση.')
};

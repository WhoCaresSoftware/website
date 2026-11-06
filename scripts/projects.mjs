// Public, approved project facts only. Never import private discovery notes here.
import { codingShowcase } from './coding-showcase.mjs';

const t = (en, el) => ({ en, el });
const block = (title, body) => ({ title, body });
const showcase = slug => ({
  hero: `/assets/images/project-showcase/${slug}-wide.webp`,
  heroSmall: `/assets/images/project-showcase/${slug}-wide-1200.webp`,
  heroCompact: `/assets/images/project-showcase/${slug}-mobile.webp`,
  heroCompactSmall: `/assets/images/project-showcase/${slug}-mobile-400.webp`,
  heroWidth: 2000, heroHeight: 667, heroCompactHeight: 800
});

export const projects = [
  {
    slug: 'aigistos', id: 'work-aigistos', name: 'Aigistos',
    kind: t('Custom worksite ERP', 'ERP στα μέτρα των εργοταξίων'),
    hook: t('The everyday detail.\nThe company-wide picture.', 'Η καθημερινή λεπτομέρεια.\nΗ συνολική εικόνα.'),
    summary: t('A tailored ERP connecting operators, worksite teams and the central office across 500+ machines and 15+ worksites.', 'Ένα ERP προσαρμοσμένο στην Aigistos, που συνδέει χειριστές, ομάδες εργοταξίων και κεντρικά γραφεία, για 500+ μηχανήματα σε 15+ εργοτάξια.'),
    ...showcase('aigistos'),
    intro: block(t('Less chasing updates.\nMore seeing clearly.', 'Λιγότερη αναζήτηση ενημερώσεων.\nΠιο καθαρή εικόνα.'), t('Across 500+ machines and 15+ worksites, Aigistos needed a shared view of its fleet. HQ and worksite teams relied on calls and spreadsheets to gather updates on equipment, fuel and costs. The information existed, but someone had to assemble it each time.', 'Με 500+ μηχανήματα σε 15+ εργοτάξια, η Aigistos χρειαζόταν κοινή εικόνα του στόλου της. Τα κεντρικά και οι ομάδες των εργοταξίων βασίζονταν σε τηλεφωνήματα και υπολογιστικά φύλλα για ενημερώσεις σχετικά με εξοπλισμό, καύσιμα και κόστη. Η πληροφορία υπήρχε, αλλά έπρεπε να συγκεντρώνεται κάθε φορά.')),
    delivery: t('We delivered the ERP end to end: discovery, UX, application development, deployment and data migration, followed by team onboarding and ongoing support.', 'Αναλάβαμε το ERP από την αρχή έως τη λειτουργία του: διερεύνηση αναγκών, σχεδιασμό εμπειρίας χρήστη, ανάπτυξη, εγκατάσταση και μεταφορά δεδομένων, μαζί με εκπαίδευση των ομάδων και συνεχή υποστήριξη.'),
    showcaseTitle: t('One entry. A shared picture.', 'Μία καταχώριση. Κοινή εικόνα.'),
    showcaseBody: t('Follow a fuel entry from the operator to the worksite and the central office. Check it against the tank’s capacity and see where an inconsistency is caught.', 'Ακολουθήστε μια καταχώριση καυσίμου από τον χειριστή έως το εργοτάξιο και τα κεντρικά. Ελέγξτε την ποσότητα σε σχέση με τη χωρητικότητα της δεξαμενής και δείτε πού εντοπίζεται μια ασυνέπεια.'),
    aigistos: true,
    workflow: [
      block(t('At the machine', 'Στο μηχάνημα'), t('The operator records fuel additions directly. Configurable checks flag entries that need attention, such as an amount exceeding the tank’s capacity.', 'Ο χειριστής καταχωρίζει το καύσιμο απευθείας. Παραμετροποιήσιμοι έλεγχοι επισημαίνουν εγγραφές που χρειάζονται προσοχή, όπως ποσότητες που ξεπερνούν τη χωρητικότητα της δεξαμενής.')),
      block(t('Across the worksite', 'Στο εργοτάξιο'), t('Staff assign machines to worksites. The worksite administrator oversees fuel distribution and use, with flagged entries available for review.', 'Το προσωπικό αντιστοιχίζει τα μηχανήματα στα εργοτάξια. Ο διαχειριστής του εργοταξίου επιβλέπει τη διανομή και κατανάλωση καυσίμου και ελέγχει τις καταχωρίσεις που έχουν επισημανθεί.')),
      block(t('At the central office', 'Στα κεντρικά γραφεία'), t('HQ oversees machine transfers, maintenance, rentals and operating costs across worksites. The platform tracks costs, not machine revenue.', 'Τα κεντρικά επιβλέπουν μεταφορές μηχανημάτων, συντήρηση, μισθώσεις και λειτουργικά κόστη ανά εργοτάξιο. Η πλατφόρμα παρακολουθεί κόστη, όχι έσοδα μηχανημάτων.'))
    ],
    outcome: block(t('The updates are already there.', 'Οι ενημερώσεις είναι ήδη εκεί.'), t('Routine calls between worksites and HQ to gather updates are no longer needed. Teams can check worksite assignments, transfers, maintenance and costs directly. Fuel entries are more visible, and configurable checks help catch recording errors.', 'Δεν χρειάζονται πλέον τα συνηθισμένα τηλεφωνήματα μεταξύ εργοταξίων και κεντρικών για τη συλλογή ενημερώσεων. Οι ομάδες ελέγχουν απευθείας την κατανομή στα εργοτάξια, τις μεταφορές, τη συντήρηση και τα κόστη. Οι καταχωρίσεις καυσίμου είναι πιο ορατές και οι παραμετροποιήσιμοι έλεγχοι βοηθούν στον εντοπισμό λαθών.')),
    links: [{ href: 'https://www.aigistos.gr', label: t('Visit Aigistos', 'Ιστότοπος Aigistos') }, { href: 'https://www.facebook.com/p/%CE%91%CE%99%CE%93%CE%99%CE%A3%CE%A4%CE%9F%CE%A3-%CE%91%CE%95-100042718853927/', label: t('Aigistos on Facebook', 'Aigistos στο Facebook') }]
  },
  {
    slug: 'hex-mythica', id: 'work-hex', name: 'Hex Mythica',
    kind: t('Game development · WhoCaresGames', 'Ανάπτυξη παιχνιδιού · WhoCaresGames'),
    hook: t('A world inside the cards.\nSystems behind the adventure.', 'Ένας κόσμος μέσα στις κάρτες.\nΣυστήματα πίσω από την περιπέτεια.'),
    summary: t('Our own roguelite deck-building game, developed end to end through WhoCaresGames—from procedural dungeons and combat to multiplayer servers and AWS infrastructure.', 'Το δικό μας roguelite παιχνίδι στρατηγικής με κάρτες, ανεπτυγμένο από τη WhoCaresGames: από διαδικαστικά παραγόμενα μπουντρούμια και μάχες έως servers πολλών παικτών και υποδομές AWS.'),
    ...showcase('hex-mythica'),
    heroWidth: 1500, heroHeight: 500, heroCompactHeight: 439,
    intro: block(t('Our own world.\nBuilt from the ground up.', 'Ένας δικός μας κόσμος.\nΧτισμένος από την αρχή.'), t('Hex Mythica is our own game and IP, developed through WhoCaresGames. Set in the Maelstrom Tower, it combines exploration of procedurally generated dungeons with turn-based, deck-building combat and base building.', 'Το Hex Mythica είναι δικό μας παιχνίδι και πνευματική ιδιοκτησία, ανεπτυγμένο από τη WhoCaresGames. Στον πύργο Maelstrom, συνδυάζει εξερεύνηση διαδικαστικά παραγόμενων μπουντρουμιών, μάχες σε γύρους με στρατηγική βασισμένη σε κάρτες και χτίσιμο βάσης.')),
    delivery: t('We implemented the game end to end: gameplay systems, multiplayer connectivity, game servers, AWS infrastructure and blockchain/NFT functionality.', 'Υλοποιήσαμε ολόκληρο το παιχνίδι: μηχανισμούς παιχνιδιού, συνδεσιμότητα πολλών παικτών, game servers, υποδομές AWS και λειτουργίες blockchain/NFT.'),
    showcaseTitle: t('Inside the world of Hex Mythica.', 'Στον κόσμο του Hex Mythica.'),
    showcaseBody: t('Explore the cards, characters and environments that give the adventure its identity, with visual development by Tanya Podolskaia and the collaborators credited in her ArtStation project.', 'Δείτε τις κάρτες, τους χαρακτήρες και τα περιβάλλοντα που δίνουν στην περιπέτεια την ταυτότητά της, με εικαστική ανάπτυξη από την Tanya Podolskaia και τους συνεργάτες που αναφέρονται στο έργο της στο ArtStation.'),
    hex: true,
    workflow: [
      block(t('Explore, fight, build', 'Εξερεύνηση, μάχη, χτίσιμο'), t('Procedural dungeon generation shapes the exploration. Turn-based combat brings the card collection into play, while base building adds another part of the player experience.', 'Η διαδικαστική παραγωγή μπουντρουμιών διαμορφώνει την εξερεύνηση. Οι μάχες σε γύρους αξιοποιούν τη συλλογή καρτών, ενώ το χτίσιμο βάσης συμπληρώνει την εμπειρία του παίκτη.')),
      block(t('Connect the players', 'Σύνδεση παικτών'), t('We built the game servers and networking that connect players for multiplayer, alongside the backend systems supporting the game.', 'Κατασκευάσαμε τους game servers και τα συστήματα δικτύωσης που συνδέουν τους παίκτες για παιχνίδι πολλών παικτών, μαζί με τα συστήματα backend που το υποστηρίζουν.')),
      block(t('Build the foundations', 'Οι τεχνικές βάσεις'), t('The same development effort covered AWS infrastructure and the game’s blockchain and NFT functionality.', 'Η ίδια ομάδα ανάπτυξης ανέλαβε τις υποδομές AWS και τις λειτουργίες blockchain και NFT του παιχνιδιού.'))
    ],
    outcome: block(t('A playable game.\nNot just a collection of systems.', 'Ένα παιχνίδι που παίζεται.\nΌχι απλώς επιμέρους συστήματα.'), t('We brought the gameplay and the technology behind it together into a playable game, under our own IP. The development journey shows the work taking shape—from the world on screen to the systems that make it work.', 'Συνδυάσαμε τους μηχανισμούς παιχνιδιού με την τεχνολογία που τους υποστηρίζει σε ένα παιχνίδι που παίζεται, με δική μας πνευματική ιδιοκτησία. Η πορεία ανάπτυξης δείχνει πώς πήρε μορφή, από τον κόσμο στην οθόνη έως τα συστήματα που τον στηρίζουν.')),
    links: [{ href: 'https://www.artstation.com/artwork/9EoxER', label: t('Visual development · ArtStation', 'Εικαστική ανάπτυξη · ArtStation') }, { href: 'https://games.gg/hex-mythica/', label: t('Explore Hex Mythica · GAMES.GG', 'Δείτε το Hex Mythica · GAMES.GG') }]
  },
  {
    slug: 'private-llm-gateway', id: 'work-llm', name: 'Private LLM Gateway',
    kind: t('Shared AI infrastructure', 'Κοινή υποδομή AI'),
    hook: t('Different applications.\nOne gateway to the models.', 'Διαφορετικές εφαρμογές.\nΜία πύλη προς τα μοντέλα.'),
    summary: t('A company-hosted API gateway connecting business applications to cloud and self-hosted AI models, with inputs excluded from provider-model training.', 'Μια πύλη API που φιλοξενείται από την εταιρεία και συνδέει εφαρμογές με μοντέλα AI στο cloud και σε δικές της υποδομές, χωρίς χρήση των δεδομένων εισόδου για εκπαίδευση των μοντέλων των παρόχων.'),
    ...showcase('private-llm-gateway'),
    intro: block(t('The infrastructure\nbeneath the applications.', 'Η υποδομή πίσω\nαπό τις εφαρμογές.'), t('A company wanted to use different AI models across its own applications: employee chatbots, coding agents and branded-content tools. The job was to provide shared access to those models, with agreements excluding company inputs from provider-model training.', 'Μια εταιρεία ήθελε να χρησιμοποιεί διαφορετικά μοντέλα AI στις εφαρμογές της: chatbots εργαζομένων, βοηθούς ανάπτυξης λογισμικού και εργαλεία επώνυμου περιεχομένου. Το ζητούμενο ήταν κοινή πρόσβαση στα μοντέλα, με συμφωνίες που αποκλείουν τη χρήση των εταιρικών δεδομένων εισόδου για εκπαίδευση των μοντέλων των παρόχων.')),
    delivery: t('We built a company-hosted gateway exposing an API to those applications. Our work covers cloud providers including OpenAI, Anthropic and AWS, as well as self-hosted models.', 'Κατασκευάσαμε μια πύλη που φιλοξενείται από την εταιρεία και παρέχει API στις εφαρμογές της. Η δουλειά μας καλύπτει παρόχους cloud, όπως OpenAI, Anthropic και AWS, καθώς και μοντέλα σε υποδομές της εταιρείας.'),
    showcaseTitle: t('From the application to the model.', 'Από την εφαρμογή στο μοντέλο.'),
    showcaseBody: t('The gateway sits behind the tools employees use. Applications connect through its API to access the models they need.', 'Η πύλη βρίσκεται πίσω από τα εργαλεία που χρησιμοποιούν οι εργαζόμενοι. Οι εφαρμογές συνδέονται μέσω του API της για να έχουν πρόσβαση στα μοντέλα που χρειάζονται.'),
    workflow: [
      block(t('Company applications', 'Εταιρικές εφαρμογές'), t('Chatbots, coding agents and image-generation workflows use the gateway as shared infrastructure.', 'Chatbots, βοηθοί ανάπτυξης λογισμικού και ροές δημιουργίας εικόνων χρησιμοποιούν την πύλη ως κοινή υποδομή.')),
      block(t('Company-hosted gateway', 'Πύλη στην υποδομή της εταιρείας'), t('The company hosts the API layer connecting its applications to model services. Application interfaces remain separate from this infrastructure.', 'Η εταιρεία φιλοξενεί το API που συνδέει τις εφαρμογές της με υπηρεσίες μοντέλων. Οι διεπαφές των εφαρμογών είναι ξεχωριστές από αυτή την υποδομή.')),
      block(t('Cloud and self-hosted models', 'Μοντέλα στο cloud και σε δικές της υποδομές'), t('We have delivered both cloud-model and self-hosted-model setups, with the model arrangement shaped around the company’s requirements.', 'Έχουμε υλοποιήσει λύσεις με μοντέλα στο cloud και με μοντέλα σε υποδομές της εταιρείας, ανάλογα με τις ανάγκες της.'))
    ],
    outcome: block(t('One foundation.\nSeveral working applications.', 'Μία βάση.\nΠολλές εφαρμογές.'), t('The gateway became infrastructure for company AI applications, including chatbots, coding agents and brand-image workflows. These tools share a route to model services through the company-hosted API.', 'Η πύλη αποτέλεσε την υποδομή για εταιρικές εφαρμογές AI, όπως chatbots, βοηθούς ανάπτυξης λογισμικού και ροές δημιουργίας εικόνων. Τα εργαλεία αυτά απέκτησαν κοινό σημείο πρόσβασης στις υπηρεσίες μοντέλων, μέσω του API που φιλοξενεί η εταιρεία.'))
  },
  {
    slug: 'brand-image-pipelines', id: 'work-images', name: 'Brand Image Pipelines',
    kind: t('Image & video generation for brand teams', 'Δημιουργία εικόνας και βίντεο για ομάδες branding'),
    hook: t('Different scenes.\nThe same visual identity.', 'Διαφορετικά περιβάλλοντα.\nΗ ίδια οπτική ταυτότητα.'),
    summary: t('A custom multi-user application for brand and marketing teams to create images and videos using company people, products, logos and visual identity.', 'Μια εφαρμογή για ομάδες branding και marketing που δημιουργούν εικόνες και βίντεο με πρόσωπα, προϊόντα, λογότυπα και την οπτική ταυτότητα της εταιρείας.'),
    ...showcase('brand-image-pipelines'),
    intro: block(t('A new scene.\nWithout another photoshoot.', 'Μια νέα σκηνή.\nΧωρίς νέα φωτογράφιση.'), t('A large organization needed to show its people and products in different settings while keeping its brand recognizable. One recurring use was placing the same person in new contexts without arranging another photoshoot each time, using the company’s colors and logo.', 'Ένας μεγάλος οργανισμός χρειαζόταν να παρουσιάζει τα πρόσωπα και τα προϊόντα του σε διαφορετικά περιβάλλοντα, με αναγνωρίσιμη εταιρική ταυτότητα. Μια επαναλαμβανόμενη χρήση ήταν η τοποθέτηση του ίδιου προσώπου σε νέες σκηνές, χωρίς νέα φωτογράφιση κάθε φορά, με τα χρώματα και το λογότυπο της εταιρείας.')),
    delivery: t('We built a multi-user application where brand and marketing teams log in, work with uploaded company assets, and generate images and videos. Created assets are saved and can be reused as context for later work.', 'Κατασκευάσαμε μια εφαρμογή πολλών χρηστών, όπου οι ομάδες branding και marketing συνδέονται, αξιοποιούν το εταιρικό υλικό που έχει μεταφορτωθεί και δημιουργούν εικόνες και βίντεο. Το παραγόμενο υλικό αποθηκεύεται και μπορεί να χρησιμοποιηθεί ως πλαίσιο σε επόμενες δημιουργίες.'),
    showcaseTitle: t('From company assets to campaign material.', 'Από το εταιρικό υλικό στην καμπάνια.'),
    showcaseBody: t('People, products, logos and brand references provide the starting point. The team sets the scene, then reviews and adjusts the generated material in the same custom interface.', 'Πρόσωπα, προϊόντα, λογότυπα και στοιχεία εταιρικής ταυτότητας αποτελούν την αφετηρία. Η ομάδα ορίζει τη σκηνή και στη συνέχεια ελέγχει και προσαρμόζει το παραγόμενο υλικό μέσα από την ίδια εφαρμογή.'),
    workflow: [
      block(t('Use the company’s assets', 'Το υλικό της εταιρείας'), t('Uploaded references establish who or what appears in the scene, alongside the company’s logos, colors and visual identity.', 'Το υλικό αναφοράς καθορίζει ποιος ή τι εμφανίζεται στη σκηνή, μαζί με τα λογότυπα, τα χρώματα και την οπτική ταυτότητα της εταιρείας.')),
      block(t('Create a different setting', 'Ένα διαφορετικό περιβάλλον'), t('Users direct new images and videos around those references, with continuity of people, products and branding as the creative requirement.', 'Οι χρήστες καθοδηγούν τη δημιουργία νέων εικόνων και βίντεο με βάση τις αναφορές, με ζητούμενο τη συνέπεια στην εμφάνιση προσώπων, προϊόντων και εταιρικής ταυτότητας.')),
      block(t('Review, adjust, reuse', 'Έλεγχος, προσαρμογή, επαναχρησιμοποίηση'), t('The company reviews and adjusts the outputs through the application. Saved creations become material for campaigns, ads and subsequent generation work.', 'Η εταιρεία ελέγχει και προσαρμόζει τα αποτελέσματα μέσα από την εφαρμογή. Οι αποθηκευμένες δημιουργίες αξιοποιούνται σε καμπάνιες, διαφημίσεις και επόμενες δημιουργίες.'))
    ],
    outcome: block(t('New content from\nthe assets already on hand.', 'Νέο περιεχόμενο από\nτο υλικό που ήδη υπάρχει.'), t('Brand and marketing teams can create campaign material themselves, using a shared application and the company’s own references. The person-in-a-new-setting workflow gives them an alternative to arranging a fresh photoshoot for each scene.', 'Οι ομάδες branding και marketing δημιουργούν οι ίδιες υλικό για καμπάνιες, μέσα από κοινή εφαρμογή και με τις αναφορές της εταιρείας. Η μεταφορά του ίδιου προσώπου σε νέα περιβάλλοντα τους δίνει μια εναλλακτική στη διοργάνωση ξεχωριστής φωτογράφισης για κάθε σκηνή.'))
  },
  {
    slug: 'coding-agents', id: 'work-agents', name: 'Coding Agents',
    kind: t('AI-native engineering enablement', 'Υιοθέτηση AI στην ανάπτυξη λογισμικού'),
    hook: t('Beyond writing code.\nAcross the development lifecycle.', 'Πέρα από τη συγγραφή κώδικα.\nΣε όλο τον κύκλο ανάπτυξης.'),
    summary: t('Helping an engineering team adopt coding agents through hands-on support, shared skills and harnesses, CI/CD automation and infrastructure setup.', 'Υποστήριξη μιας ομάδας μηχανικών στην υιοθέτηση coding agents, με πρακτική καθοδήγηση, κοινά εργαλεία, αυτοματισμούς CI/CD και διαμόρφωση υποδομών.'),
    ...showcase('coding-agents'),
    sdlc: codingShowcase,
    intro: block(t('Not just a tool.\nA way for the team to work.', 'Όχι μόνο ένα εργαλείο.\nΈνας τρόπος δουλειάς για την ομάδα.'), t('A company brought us in to help its engineers adopt AI across the software development lifecycle. The work went beyond giving people access to a coding assistant: we joined their projects, supported their engineers and helped them develop software with coding agents—AI tools that work through development tasks.', 'Μια εταιρεία μάς ανέθεσε να βοηθήσουμε τους μηχανικούς της να εντάξουν την AI στον κύκλο ανάπτυξης λογισμικού. Δεν περιοριστήκαμε στην παροχή ενός βοηθού κώδικα: συμμετείχαμε στα έργα τους, υποστηρίξαμε τους μηχανικούς και τους βοηθήσαμε να αναπτύσσουν λογισμικό με coding agents, εργαλεία AI που αναλαμβάνουν εργασίες ανάπτυξης.')),
    delivery: t('We provided shared agent skills, harnesses—the instructions and tools around the agents—CI/CD automation, infrastructure setup and hands-on support for the team.', 'Παραδώσαμε κοινές δεξιότητες και harnesses για τους agents, δηλαδή τις οδηγίες και τα εργαλεία λειτουργίας τους, μαζί με αυτοματισμούς CI/CD, διαμόρφωση υποδομών και πρακτική υποστήριξη της ομάδας.'),
    showcaseTitle: t('From the specification to the reviewed change.', 'Από την προδιαγραφή στην ελεγμένη αλλαγή.'),
    showcaseBody: t('The workflow brings specification drafts, architecture decisions, implementation and review into the same development process. Engineers and product leads remain responsible for decisions, with review responsibilities shaped around each team.', 'Η ροή συνδέει προσχέδια προδιαγραφών, αρχιτεκτονικές αποφάσεις, υλοποίηση και έλεγχο στην ίδια διαδικασία ανάπτυξης. Οι μηχανικοί και οι υπεύθυνοι προϊόντος διατηρούν την ευθύνη των αποφάσεων, με αρμοδιότητες ελέγχου προσαρμοσμένες σε κάθε ομάδα.'),
    workflow: [
      block(t('Shared agent setup', 'Κοινό περιβάλλον για τους agents'), t('Project instructions, reusable skills and coding harnesses give engineers a shared starting point. We help them use that setup while working alongside them on real projects.', 'Οι οδηγίες έργου, οι επαναχρησιμοποιήσιμες δεξιότητες και τα coding harnesses δίνουν στους μηχανικούς κοινή αφετηρία. Τους βοηθάμε να αξιοποιούν αυτό το περιβάλλον δουλεύοντας μαζί τους σε πραγματικά έργα.')),
      block(t('Build and review automation', 'Αυτοματισμοί παράδοσης και ελέγχου'), t('CI/CD automation supports repeatable delivery work. The designed review workflow includes AI-assisted review and notifications, while each team defines its own approval responsibilities.', 'Οι αυτοματισμοί CI/CD υποστηρίζουν επαναλαμβανόμενες εργασίες παράδοσης. Η ροή ελέγχου που σχεδιάσαμε περιλαμβάνει υποστήριξη AI και ειδοποιήσεις, ενώ κάθε ομάδα ορίζει τις δικές της αρμοδιότητες έγκρισης.')),
      block(t('Operational investigation', 'Διερεύνηση λειτουργικών προβλημάτων'), t('The proposed support workflow brings together logs, traces, playbooks and code for read-only investigation. Findings and suggested fixes go back to the people responsible for the system.', 'Η προτεινόμενη ροή υποστήριξης συνδυάζει logs, traces, οδηγούς αντιμετώπισης προβλημάτων και κώδικα για διερεύνηση μόνο με ανάγνωση. Τα ευρήματα και οι προτεινόμενες διορθώσεις επιστρέφουν στους ανθρώπους που έχουν την ευθύνη του συστήματος.'))
    ],
    outcome: block(t('The team gains\na shared starting point.', 'Μια κοινή αφετηρία\nγια την ομάδα.'), t('The engagement gave engineers shared tooling, delivery automation and support for adopting agentic development in their own projects. The focus is a team that can work with AI, not a workflow that removes the team from software delivery.', 'Η συνεργασία έδωσε στους μηχανικούς κοινά εργαλεία, αυτοματισμούς παράδοσης και υποστήριξη για την υιοθέτηση ανάπτυξης με agents στα έργα τους. Στόχος είναι μια ομάδα που δουλεύει με AI, όχι μια διαδικασία που αφαιρεί την ομάδα από την ανάπτυξη λογισμικού.'))
  },
  {
    slug: 'ai-employees', id: 'work-employees', name: 'AI Employees',
    kind: t('AI teams for small businesses', 'Ομάδες AI για μικρές επιχειρήσεις'),
    hook: t('From legal documents\nto the monthly books.', 'Από τα νομικά έγγραφα\nστα βιβλία του μήνα.'),
    summary: t('Role-based AI teams for small businesses: legal-document preparation with lawyer review, and expense-based monthly reporting for bookkeeping.', 'Ομάδες AI με διακριτούς ρόλους για μικρές επιχειρήσεις: προετοιμασία νομικών εγγράφων με έλεγχο δικηγόρου και μηνιαίες αναφορές εξόδων για λογιστική καταχώριση.'),
    ...showcase('ai-employees'),
    intro: block(t('Small companies.\nRecurring responsibilities.', 'Μικρές επιχειρήσεις.\nΕπαναλαμβανόμενες ανάγκες.'), t('We helped several small businesses set up AI teams around legal and accounting work. These roles handle concrete responsibilities: preparing business agreements and turning company expense records into monthly reports for bookkeeping.', 'Βοηθήσαμε μικρές επιχειρήσεις να οργανώσουν ομάδες AI γύρω από νομικές και λογιστικές εργασίες. Οι ρόλοι καλύπτουν συγκεκριμένες ανάγκες: προετοιμασία επαγγελματικών συμφωνιών και μετατροπή των καταγεγραμμένων εταιρικών εξόδων σε μηνιαίες αναφορές για τα λογιστικά βιβλία.')),
    delivery: t('The work combines role-based AI assistance with company information and an ERP holding expense records. Legal-document outputs go through lawyer review before signing.', 'Η λύση συνδυάζει υποστήριξη AI με διακριτούς ρόλους, εταιρικές πληροφορίες και ERP που τηρεί τα έξοδα. Τα παραγόμενα νομικά έγγραφα ελέγχονται από δικηγόρο πριν υπογραφούν.'),
    showcaseTitle: t('Documents to review. Reports to use.', 'Έγγραφα για έλεγχο. Αναφορές για χρήση.'),
    showcaseBody: t('The useful output is a document or report that moves the business work forward. Legal preparation and accounting support have distinct inputs and review needs.', 'Το χρήσιμο αποτέλεσμα είναι ένα έγγραφο ή μια αναφορά που προχωρά τη δουλειά της επιχείρησης. Η προετοιμασία νομικών εγγράφων και η λογιστική υποστήριξη έχουν διαφορετικά δεδομένα και ανάγκες ελέγχου.'),
    workflow: [
      block(t('Prepare legal documents', 'Προετοιμασία νομικών εγγράφων'), t('AI roles prepare non-disclosure agreements (NDAs), master service agreements (MSAs) and statements of work (SOWs) for lawyer review.', 'Οι ρόλοι AI προετοιμάζουν συμφωνίες εμπιστευτικότητας (NDA), συμβάσεις-πλαίσιο παροχής υπηρεσιών (MSA) και περιγραφές αντικειμένου εργασιών (SOW) για έλεγχο από δικηγόρο.')),
      block(t('Work from company expenses', 'Με βάση τα εταιρικά έξοδα'), t('An ERP holds the company’s expense records. Accounting assistance uses those records to generate monthly reports for the company’s bookkeeping.', 'Το ERP τηρεί τα έξοδα της εταιρείας. Η λογιστική υποστήριξη χρησιμοποιεί αυτές τις εγγραφές για να παράγει μηνιαίες αναφορές για τα λογιστικά της βιβλία.')),
      block(t('Put the output to work', 'Αξιοποίηση του αποτελέσματος'), t('Lawyers review the legal documents before signing. Monthly financial reports feed into bookkeeping, giving each function a concrete output rather than only a chat response.', 'Τα νομικά έγγραφα περνούν από έλεγχο δικηγόρου πριν υπογραφούν. Οι μηνιαίες οικονομικές αναφορές αξιοποιούνται στη λογιστική καταχώριση, δίνοντας σε κάθε λειτουργία συγκεκριμένο αποτέλεσμα και όχι μόνο μια απάντηση σε συνομιλία.'))
    ],
    outcome: block(t('From generated drafts\nto signed agreements.', 'Από τα προσχέδια\nστις υπογεγραμμένες συμφωνίες.'), t('Legal documents prepared through these AI roles passed lawyer review and were signed. The accounting work produced monthly reports from company expenses for bookkeeping. These are practical support functions for small businesses, with people retaining responsibility for the work.', 'Νομικά έγγραφα που προετοιμάστηκαν μέσω αυτών των ρόλων AI εγκρίθηκαν από δικηγόρους και υπογράφηκαν. Η λογιστική υποστήριξη παρήγαγε μηνιαίες αναφορές από τα εταιρικά έξοδα για τα βιβλία τους. Πρόκειται για πρακτική υποστήριξη μικρών επιχειρήσεων, με τους ανθρώπους να διατηρούν την ευθύνη της δουλειάς.'))
  }
];

export function projectContext(pagePath) {
  const project = projects.find(item => pagePath.replaceAll('\\', '/').endsWith(`/work/${item.slug}/index.html`));
  if (!project) return {};
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return { project, nextProject: next };
}

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
    kind: t('Worksite ERP', 'ERP για εργοτάξια'),
    hook: t('The everyday detail.\nThe company-wide picture.', 'Η καθημερινή λεπτομέρεια.\nΗ συνολική εικόνα.'),
    summary: t('A tailored ERP connecting operators, worksite teams and the central office. 500+ machines, 15+ worksites, one shared view.', 'Ένα ERP φτιαγμένο για την Aigistos, που συνδέει χειριστές, ομάδες εργοταξίων και κεντρικά γραφεία. 500+ μηχανήματα, 15+ εργοτάξια, μία κοινή εικόνα.'),
    ...showcase('aigistos'),
    intro: block(t('The information existed.\nSomeone had to go and get it.', 'Η πληροφορία υπήρχε.\nΚάποιος έπρεπε να την κυνηγήσει.'), t('Across 500+ machines and 15+ worksites, Aigistos had no shared view of its fleet. HQ and worksite teams kept up with equipment, fuel and costs through calls and spreadsheets. Every update had to be assembled, every time.', 'Με 500+ μηχανήματα σε 15+ εργοτάξια, η Aigistos δεν είχε κοινή εικόνα του στόλου της. Τα κεντρικά και οι ομάδες των εργοταξίων παρακολουθούσαν εξοπλισμό, καύσιμα και κόστη με τηλεφωνήματα και υπολογιστικά φύλλα. Κάθε ενημέρωση έπρεπε να συγκεντρωθεί, κάθε φορά.')),
    delivery: t('We did all of it: discovery, UX, application development, deployment and data migration, then team onboarding and ongoing support.', 'Τα αναλάβαμε όλα: διερεύνηση αναγκών, σχεδιασμό εμπειρίας χρήστη, ανάπτυξη, εγκατάσταση και μεταφορά δεδομένων, και μετά εκπαίδευση των ομάδων και συνεχή υποστήριξη.'),
    showcaseTitle: t('One entry. A shared picture.', 'Μία καταχώριση. Κοινή εικόνα.'),
    showcaseBody: t('Follow a fuel entry from the operator to the worksite to the central office. Then try putting 100 L in an 80 L tank.', 'Ακολουθήστε μια καταχώριση καυσίμου από τον χειριστή στο εργοτάξιο και από εκεί στα κεντρικά. Μετά δοκιμάστε να βάλετε 100 L σε δεξαμενή 80 L.'),
    aigistos: true,
    workflow: [
      block(t('At the machine', 'Στο μηχάνημα'), t('The operator records fuel directly. Configurable checks flag what doesn’t add up, like more fuel than the tank can hold.', 'Ο χειριστής καταχωρίζει το καύσιμο απευθείας. Παραμετροποιήσιμοι έλεγχοι επισημαίνουν ό,τι δεν στέκει, όπως περισσότερο καύσιμο από όσο χωράει η δεξαμενή.')),
      block(t('Across the worksite', 'Στο εργοτάξιο'), t('Staff assign machines to worksites. The worksite administrator oversees fuel distribution and use, and reviews what got flagged.', 'Το προσωπικό αντιστοιχίζει τα μηχανήματα στα εργοτάξια. Ο διαχειριστής του εργοταξίου επιβλέπει τη διανομή και την κατανάλωση καυσίμου και ελέγχει ό,τι έχει επισημανθεί.')),
      block(t('At the central office', 'Στα κεντρικά γραφεία'), t('HQ oversees transfers, maintenance, rentals and operating costs across worksites. The platform tracks costs, not machine revenue.', 'Τα κεντρικά επιβλέπουν μεταφορές, συντήρηση, μισθώσεις και λειτουργικά κόστη ανά εργοτάξιο. Η πλατφόρμα παρακολουθεί κόστη, όχι έσοδα μηχανημάτων.'))
    ],
    outcome: block(t('The updates are already there.', 'Οι ενημερώσεις είναι ήδη εκεί.'), t('Nobody has to phone around for routine updates any more. Teams check assignments, transfers, maintenance and costs directly. Fuel entries are easier to see, and configurable checks help catch recording errors.', 'Κανείς δεν χρειάζεται πια να παίρνει τηλέφωνα για τις συνηθισμένες ενημερώσεις. Οι ομάδες ελέγχουν απευθείας κατανομές, μεταφορές, συντήρηση και κόστη. Οι καταχωρίσεις καυσίμου φαίνονται πιο εύκολα και οι παραμετροποιήσιμοι έλεγχοι βοηθούν στον εντοπισμό λαθών.')),
    links: [{ href: 'https://www.aigistos.gr', label: t('Visit Aigistos', 'Ιστότοπος Aigistos') }, { href: 'https://www.facebook.com/p/%CE%91%CE%99%CE%93%CE%99%CE%A3%CE%A4%CE%9F%CE%A3-%CE%91%CE%95-100042718853927/', label: t('Aigistos on Facebook', 'Aigistos στο Facebook') }]
  },
  {
    slug: 'hex-mythica', id: 'work-hex', name: 'Hex Mythica',
    kind: t('Game development · WhoCaresGames', 'Ανάπτυξη παιχνιδιού · WhoCaresGames'),
    hook: t('A world inside the cards.\nSystems behind the adventure.', 'Ένας κόσμος μέσα στις κάρτες.\nΣυστήματα πίσω από την περιπέτεια.'),
    summary: t('Our own roguelite deck-builder, made end to end through WhoCaresGames: procedural dungeons, combat, multiplayer servers and AWS infrastructure.', 'Το δικό μας roguelite παιχνίδι με κάρτες, φτιαγμένο από την αρχή ως το τέλος μέσα από τη WhoCaresGames: διαδικαστικά μπουντρούμια, μάχες, servers πολλών παικτών και υποδομές AWS.'),
    ...showcase('hex-mythica'),
    heroWidth: 1500, heroHeight: 500, heroCompactHeight: 439,
    intro: block(t('Our own game.\nNo client to blame.', 'Το δικό μας παιχνίδι.\nΔεν φταίει κανένας πελάτης.'), t('Hex Mythica is our own game and IP, developed through WhoCaresGames. Set in the Maelstrom Tower, it mixes procedurally generated dungeons, turn-based deck-building combat and base building.', 'Το Hex Mythica είναι δικό μας παιχνίδι και δική μας πνευματική ιδιοκτησία, μέσα από τη WhoCaresGames. Στον πύργο Maelstrom, συνδυάζει διαδικαστικά παραγόμενα μπουντρούμια, μάχες σε γύρους με κάρτες και χτίσιμο βάσης.')),
    delivery: t('We built all of it: gameplay systems, multiplayer connectivity, game servers, AWS infrastructure and blockchain/NFT functionality.', 'Τα φτιάξαμε όλα: μηχανισμούς παιχνιδιού, συνδεσιμότητα πολλών παικτών, game servers, υποδομές AWS και λειτουργίες blockchain/NFT.'),
    showcaseTitle: t('Inside the world of Hex Mythica.', 'Στον κόσμο του Hex Mythica.'),
    showcaseBody: t('The cards, characters and environments that give the adventure its identity. Visual development by Tanya Podolskaia and the collaborators credited in her ArtStation project.', 'Οι κάρτες, οι χαρακτήρες και τα περιβάλλοντα που δίνουν στην περιπέτεια την ταυτότητά της. Εικαστική ανάπτυξη από την Tanya Podolskaia και τους συνεργάτες που αναφέρονται στο έργο της στο ArtStation.'),
    hex: true,
    workflow: [
      block(t('Explore, fight, build', 'Εξερεύνηση, μάχη, χτίσιμο'), t('Procedural dungeons shape the exploration. Turn-based combat puts the card collection to use. Base building rounds it out.', 'Τα διαδικαστικά μπουντρούμια διαμορφώνουν την εξερεύνηση. Οι μάχες σε γύρους βάζουν τη συλλογή καρτών σε χρήση. Το χτίσιμο βάσης ολοκληρώνει το σύνολο.')),
      block(t('Connect the players', 'Σύνδεση παικτών'), t('We built the game servers and networking that connect players, and the backend systems behind them.', 'Φτιάξαμε τους game servers και τη δικτύωση που συνδέουν τους παίκτες, μαζί με τα συστήματα backend πίσω τους.')),
      block(t('Build the foundations', 'Οι τεχνικές βάσεις'), t('The same work covered AWS infrastructure and the game’s blockchain and NFT functionality.', 'Η ίδια δουλειά κάλυψε τις υποδομές AWS και τις λειτουργίες blockchain και NFT του παιχνιδιού.'))
    ],
    outcome: block(t('A playable game.\nNot a pile of systems.', 'Ένα παιχνίδι που παίζεται.\nΌχι ένας σωρός από συστήματα.'), t('Gameplay and technology came together as a playable game, under our own IP. The development journey shows it taking shape, from the world on screen to the systems holding it up.', 'Το gameplay και η τεχνολογία έγιναν ένα παιχνίδι που παίζεται, με δική μας πνευματική ιδιοκτησία. Η πορεία ανάπτυξης δείχνει πώς πήρε μορφή, από τον κόσμο στην οθόνη έως τα συστήματα που τον κρατούν όρθιο.')),
    links: [{ href: 'https://www.artstation.com/artwork/9EoxER', label: t('Visual development · ArtStation', 'Εικαστική ανάπτυξη · ArtStation') }, { href: 'https://games.gg/hex-mythica/', label: t('Explore Hex Mythica · GAMES.GG', 'Δείτε το Hex Mythica · GAMES.GG') }]
  },
  {
    slug: 'private-llm-gateway', id: 'work-llm', name: 'Private LLM Gateway',
    kind: t('Shared AI infrastructure', 'Κοινή υποδομή AI'),
    hook: t('Different applications.\nOne gateway to the models.', 'Διαφορετικές εφαρμογές.\nΜία πύλη προς τα μοντέλα.'),
    summary: t('A company-hosted API gateway between business applications and cloud or self-hosted AI models. Inputs are excluded from provider-model training.', 'Μια πύλη API που φιλοξενεί η ίδια η εταιρεία, ανάμεσα στις εφαρμογές της και σε μοντέλα AI στο cloud ή σε δικές της υποδομές. Τα δεδομένα εισόδου δεν χρησιμοποιούνται για εκπαίδευση των μοντέλων των παρόχων.'),
    ...showcase('private-llm-gateway'),
    intro: block(t('Nobody sees the gateway.\nThe tools all go through it.', 'Η πύλη δεν φαίνεται.\nΤα εργαλεία περνούν από εκεί.'), t('A company wanted different AI models across its own applications: employee chatbots, coding agents and branded-content tools. The job was shared access to those models, under agreements excluding company inputs from provider-model training.', 'Μια εταιρεία ήθελε διαφορετικά μοντέλα AI στις εφαρμογές της: chatbots εργαζομένων, coding agents και εργαλεία επώνυμου περιεχομένου. Το ζητούμενο ήταν κοινή πρόσβαση στα μοντέλα, με συμφωνίες που αποκλείουν τη χρήση των εταιρικών δεδομένων εισόδου για εκπαίδευση των μοντέλων των παρόχων.')),
    delivery: t('We built a company-hosted gateway that gives those applications one API. Our work covers cloud providers including OpenAI, Anthropic and AWS, as well as self-hosted models.', 'Φτιάξαμε μια πύλη που φιλοξενεί η εταιρεία και δίνει σε αυτές τις εφαρμογές ένα API. Η δουλειά μας καλύπτει παρόχους cloud, όπως OpenAI, Anthropic και AWS, καθώς και μοντέλα σε δικές της υποδομές.'),
    showcaseTitle: t('From the application to the model.', 'Από την εφαρμογή στο μοντέλο.'),
    showcaseBody: t('The gateway sits behind the tools employees use. Applications connect through its API and reach the models they need.', 'Η πύλη βρίσκεται πίσω από τα εργαλεία των εργαζομένων. Οι εφαρμογές συνδέονται μέσω του API της και φτάνουν στα μοντέλα που χρειάζονται.'),
    workflow: [
      block(t('Company applications', 'Εταιρικές εφαρμογές'), t('Chatbots, coding agents and image-generation workflows share the gateway.', 'Chatbots, coding agents και ροές δημιουργίας εικόνων μοιράζονται την πύλη.')),
      block(t('Company-hosted gateway', 'Πύλη στην υποδομή της εταιρείας'), t('The company hosts the API layer between its applications and model services. Application interfaces stay separate from this infrastructure.', 'Η εταιρεία φιλοξενεί το API ανάμεσα στις εφαρμογές της και στις υπηρεσίες μοντέλων. Οι διεπαφές των εφαρμογών μένουν ξεχωριστές από αυτή την υποδομή.')),
      block(t('Cloud and self-hosted models', 'Μοντέλα στο cloud και σε δικές της υποδομές'), t('We have delivered both cloud and self-hosted setups. The company’s requirements decide which.', 'Έχουμε υλοποιήσει και τα δύο: μοντέλα στο cloud και σε υποδομές της εταιρείας. Αποφασίζουν οι ανάγκες της.'))
    ],
    outcome: block(t('One foundation.\nSeveral working applications.', 'Μία βάση.\nΠολλές εφαρμογές.'), t('The gateway became the infrastructure under company AI applications, including chatbots, coding agents and brand-image workflows. They all reach model services the same way: through the company-hosted API.', 'Η πύλη έγινε η υποδομή κάτω από τις εταιρικές εφαρμογές AI, όπως chatbots, coding agents και ροές δημιουργίας εικόνων. Όλες φτάνουν στις υπηρεσίες μοντέλων με τον ίδιο τρόπο: μέσω του API που φιλοξενεί η εταιρεία.'))
  },
  {
    slug: 'brand-image-pipelines', id: 'work-images', name: 'Brand Image Pipelines',
    kind: t('Image & video generation for brand teams', 'Εικόνα και βίντεο για ομάδες branding'),
    hook: t('Different scenes.\nThe same visual identity.', 'Διαφορετικά περιβάλλοντα.\nΗ ίδια οπτική ταυτότητα.'),
    summary: t('A custom multi-user application where brand and marketing teams create images and videos with their own people, products, logos and visual identity.', 'Μια εφαρμογή πολλών χρηστών, όπου ομάδες branding και marketing δημιουργούν εικόνες και βίντεο με τα δικά τους πρόσωπα, προϊόντα, λογότυπα και οπτική ταυτότητα.'),
    ...showcase('brand-image-pipelines'),
    intro: block(t('A new scene.\nWithout another photoshoot.', 'Μια νέα σκηνή.\nΧωρίς νέα φωτογράφιση.'), t('A large organization needed its people and products in different settings, with the brand still recognizable. One recurring use: the same person in a new context, in company colors and logo, without arranging another photoshoot each time.', 'Ένας μεγάλος οργανισμός ήθελε τα πρόσωπα και τα προϊόντα του σε διαφορετικά περιβάλλοντα, με την εταιρική του ταυτότητα αναγνωρίσιμη. Μια επαναλαμβανόμενη χρήση: το ίδιο πρόσωπο σε νέα σκηνή, με τα χρώματα και το λογότυπο της εταιρείας, χωρίς νέα φωτογράφιση κάθε φορά.')),
    delivery: t('We built a multi-user application. Brand and marketing teams log in, work with uploaded company assets and generate images and videos. What they create is saved and can feed later work.', 'Φτιάξαμε μια εφαρμογή πολλών χρηστών. Οι ομάδες branding και marketing συνδέονται, δουλεύουν με το εταιρικό υλικό που έχει ανέβει και δημιουργούν εικόνες και βίντεο. Ό,τι δημιουργούν αποθηκεύεται και μπορεί να τροφοδοτήσει επόμενες δουλειές.'),
    showcaseTitle: t('From company assets to campaign material.', 'Από το εταιρικό υλικό στην καμπάνια.'),
    showcaseBody: t('Start from people, products, logos and brand references. The team sets the scene, then reviews and adjusts the result in the same interface.', 'Η αφετηρία είναι πρόσωπα, προϊόντα, λογότυπα και στοιχεία εταιρικής ταυτότητας. Η ομάδα ορίζει τη σκηνή και μετά ελέγχει και προσαρμόζει το αποτέλεσμα στην ίδια εφαρμογή.'),
    workflow: [
      block(t('Use the company’s assets', 'Το υλικό της εταιρείας'), t('Uploaded references decide who or what appears in the scene, alongside the company’s logos, colors and visual identity.', 'Το υλικό αναφοράς καθορίζει ποιος ή τι εμφανίζεται στη σκηνή, μαζί με τα λογότυπα, τα χρώματα και την οπτική ταυτότητα της εταιρείας.')),
      block(t('Create a different setting', 'Ένα διαφορετικό περιβάλλον'), t('Users direct new images and videos around those references. People, products and branding have to stay consistent.', 'Οι χρήστες καθοδηγούν νέες εικόνες και βίντεο γύρω από αυτές τις αναφορές. Πρόσωπα, προϊόντα και εταιρική ταυτότητα πρέπει να μένουν συνεπή.')),
      block(t('Review, adjust, reuse', 'Έλεγχος, προσαρμογή, επαναχρησιμοποίηση'), t('The company reviews and adjusts the output in the application. Saved work becomes material for campaigns, ads and the next round of generation.', 'Η εταιρεία ελέγχει και προσαρμόζει το αποτέλεσμα μέσα στην εφαρμογή. Ό,τι αποθηκεύεται γίνεται υλικό για καμπάνιες, διαφημίσεις και τον επόμενο γύρο δημιουργίας.'))
    ],
    outcome: block(t('New content from\nthe assets already on hand.', 'Νέο περιεχόμενο από\nτο υλικό που ήδη υπάρχει.'), t('Brand and marketing teams can make campaign material themselves, with a shared application and the company’s own references. A person in a new setting no longer has to mean a new photoshoot for each scene.', 'Οι ομάδες branding και marketing φτιάχνουν μόνες τους υλικό για καμπάνιες, με κοινή εφαρμογή και τις αναφορές της εταιρείας. Ένα πρόσωπο σε νέο περιβάλλον δεν χρειάζεται πια να σημαίνει νέα φωτογράφιση για κάθε σκηνή.'))
  },
  {
    slug: 'coding-agents', id: 'work-agents', name: 'Coding Agents',
    kind: t('AI adoption for engineering teams', 'Υιοθέτηση AI σε ομάδες μηχανικών'),
    hook: t('Code is the easy part.\nThe lifecycle around it isn’t.', 'Ο κώδικας είναι το εύκολο κομμάτι.\nΟ κύκλος γύρω του όχι.'),
    summary: t('Helping an engineering team adopt coding agents: hands-on support, shared skills and harnesses, CI/CD automation and infrastructure setup.', 'Μια ομάδα μηχανικών υιοθετεί coding agents: πρακτική υποστήριξη, κοινά skills και harnesses, αυτοματισμοί CI/CD και διαμόρφωση υποδομών.'),
    ...showcase('coding-agents'),
    sdlc: codingShowcase,
    intro: block(t('Handing out licences\nwasn’t the job.', 'Η δουλειά δεν ήταν\nνα μοιράσουμε άδειες.'), t('A company brought us in to help its engineers adopt AI across the software development lifecycle. That meant more than access to a coding assistant. We joined their projects, supported their engineers and helped them build with coding agents: AI tools that work through development tasks.', 'Μια εταιρεία μάς κάλεσε να βοηθήσουμε τους μηχανικούς της να εντάξουν την AI σε όλο τον κύκλο ανάπτυξης λογισμικού. Αυτό σήμαινε κάτι παραπάνω από πρόσβαση σε έναν βοηθό κώδικα. Μπήκαμε στα έργα τους, στηρίξαμε τους μηχανικούς και τους βοηθήσαμε να χτίζουν με coding agents: εργαλεία AI που αναλαμβάνουν εργασίες ανάπτυξης.')),
    delivery: t('We provided shared agent skills, harnesses (the instructions and tools around the agents), CI/CD automation, infrastructure setup and hands-on support.', 'Παραδώσαμε κοινά skills για τους agents, harnesses (τις οδηγίες και τα εργαλεία γύρω τους), αυτοματισμούς CI/CD, διαμόρφωση υποδομών και πρακτική υποστήριξη.'),
    showcaseTitle: t('From the specification to the reviewed change.', 'Από την προδιαγραφή στην ελεγμένη αλλαγή.'),
    showcaseBody: t('Specification drafts, architecture decisions, implementation and review live in one process. Engineers and product leads stay responsible for decisions, and each team shapes its own review responsibilities.', 'Προσχέδια προδιαγραφών, αρχιτεκτονικές αποφάσεις, υλοποίηση και έλεγχος σε μία διαδικασία. Οι μηχανικοί και οι υπεύθυνοι προϊόντος κρατούν την ευθύνη των αποφάσεων και κάθε ομάδα διαμορφώνει τις δικές της αρμοδιότητες ελέγχου.'),
    workflow: [
      block(t('Shared agent setup', 'Κοινό περιβάλλον για τους agents'), t('Project instructions, reusable skills and coding harnesses give engineers a shared starting point. We work alongside them on real projects while they learn to use it.', 'Οι οδηγίες έργου, τα επαναχρησιμοποιήσιμα skills και τα coding harnesses δίνουν στους μηχανικούς κοινή αφετηρία. Δουλεύουμε δίπλα τους σε πραγματικά έργα όσο το μαθαίνουν.')),
      block(t('Build and review automation', 'Αυτοματισμοί παράδοσης και ελέγχου'), t('CI/CD automation handles repeatable delivery work. The review workflow we designed includes AI-assisted review and notifications. Each team defines who approves what.', 'Οι αυτοματισμοί CI/CD καλύπτουν την επαναλαμβανόμενη δουλειά παράδοσης. Η ροή ελέγχου που σχεδιάσαμε περιλαμβάνει έλεγχο με υποστήριξη AI και ειδοποιήσεις. Κάθε ομάδα ορίζει ποιος εγκρίνει τι.')),
      block(t('Operational investigation', 'Διερεύνηση λειτουργικών προβλημάτων'), t('The proposed support workflow brings logs, traces, playbooks and code together for read-only investigation. Findings and suggested fixes go back to the people responsible for the system.', 'Η προτεινόμενη ροή υποστήριξης συνδυάζει logs, traces, οδηγούς αντιμετώπισης προβλημάτων και κώδικα για διερεύνηση μόνο με ανάγνωση. Τα ευρήματα και οι προτεινόμενες διορθώσεις επιστρέφουν στους ανθρώπους που έχουν την ευθύνη του συστήματος.'))
    ],
    outcome: block(t('AI inside the team.\nNot instead of it.', 'Η AI μέσα στην ομάδα.\nΌχι στη θέση της.'), t('Engineers came away with shared tooling, delivery automation and support for agentic development in their own projects. The point is a team that can work with AI, not a workflow that removes the team from software delivery.', 'Οι μηχανικοί απέκτησαν κοινά εργαλεία, αυτοματισμούς παράδοσης και υποστήριξη για ανάπτυξη με agents στα έργα τους. Στόχος είναι μια ομάδα που δουλεύει με AI, όχι μια διαδικασία που αφαιρεί την ομάδα από την παράδοση λογισμικού.'))
  },
  {
    slug: 'ai-employees', id: 'work-employees', name: 'AI Employees',
    kind: t('AI teams for small businesses', 'Ομάδες AI για μικρές επιχειρήσεις'),
    hook: t('From legal documents\nto the monthly books.', 'Από τα νομικά έγγραφα\nστα βιβλία του μήνα.'),
    summary: t('Role-based AI teams for small businesses: legal documents prepared for lawyer review, and monthly expense reports for bookkeeping.', 'Ομάδες AI με διακριτούς ρόλους για μικρές επιχειρήσεις: νομικά έγγραφα έτοιμα για έλεγχο από δικηγόρο και μηνιαίες αναφορές εξόδων για τα λογιστικά.'),
    ...showcase('ai-employees'),
    intro: block(t('Small companies.\nThe same paperwork as everyone else.', 'Μικρές επιχειρήσεις.\nΊδια γραφειοκρατία με όλους.'), t('We helped several small businesses set up AI teams around legal and accounting work. Each role has a concrete job: preparing business agreements, or turning company expense records into monthly reports for bookkeeping.', 'Βοηθήσαμε μικρές επιχειρήσεις να στήσουν ομάδες AI γύρω από νομικές και λογιστικές εργασίες. Κάθε ρόλος έχει συγκεκριμένη δουλειά: να προετοιμάζει επαγγελματικές συμφωνίες ή να μετατρέπει τα εταιρικά έξοδα σε μηνιαίες αναφορές για τα λογιστικά βιβλία.')),
    delivery: t('The work combines role-based AI assistance, company information and an ERP holding expense records. Legal documents go through lawyer review before signing.', 'Η λύση συνδυάζει υποστήριξη AI με διακριτούς ρόλους, εταιρικές πληροφορίες και ένα ERP που τηρεί τα έξοδα. Τα νομικά έγγραφα περνούν από έλεγχο δικηγόρου πριν υπογραφούν.'),
    showcaseTitle: t('Documents to review. Reports to use.', 'Έγγραφα για έλεγχο. Αναφορές για χρήση.'),
    showcaseBody: t('The useful output is a document or report that moves the work forward. Not a chat reply. Legal preparation and accounting support have different inputs and review needs.', 'Το χρήσιμο αποτέλεσμα είναι ένα έγγραφο ή μια αναφορά που προχωρά τη δουλειά. Όχι μια απάντηση σε συνομιλία. Η νομική προετοιμασία και η λογιστική υποστήριξη έχουν διαφορετικά δεδομένα και ανάγκες ελέγχου.'),
    workflow: [
      block(t('Prepare legal documents', 'Προετοιμασία νομικών εγγράφων'), t('AI roles prepare non-disclosure agreements (NDAs), master service agreements (MSAs) and statements of work (SOWs) for lawyer review.', 'Οι ρόλοι AI προετοιμάζουν συμφωνίες εμπιστευτικότητας (NDA), συμβάσεις-πλαίσιο παροχής υπηρεσιών (MSA) και περιγραφές αντικειμένου εργασιών (SOW) για έλεγχο από δικηγόρο.')),
      block(t('Work from company expenses', 'Με βάση τα εταιρικά έξοδα'), t('An ERP holds the company’s expense records. Accounting assistance uses those records to generate monthly reports for the company’s bookkeeping.', 'Το ERP τηρεί τα έξοδα της εταιρείας. Η λογιστική υποστήριξη χρησιμοποιεί αυτές τις εγγραφές για να παράγει μηνιαίες αναφορές για τα λογιστικά της βιβλία.')),
      block(t('Put the output to work', 'Αξιοποίηση του αποτελέσματος'), t('Lawyers review the legal documents before signing. Monthly financial reports feed into bookkeeping. Each function ends in something concrete.', 'Οι δικηγόροι ελέγχουν τα νομικά έγγραφα πριν υπογραφούν. Οι μηνιαίες οικονομικές αναφορές περνούν στα λογιστικά. Κάθε λειτουργία καταλήγει σε κάτι συγκεκριμένο.'))
    ],
    outcome: block(t('From generated drafts\nto signed agreements.', 'Από τα προσχέδια\nστις υπογεγραμμένες συμφωνίες.'), t('Legal documents prepared through these AI roles passed lawyer review and were signed. The accounting work produced monthly reports from company expenses for bookkeeping. People stay responsible for the work. The AI does the preparation.', 'Νομικά έγγραφα που προετοιμάστηκαν μέσω αυτών των ρόλων AI εγκρίθηκαν από δικηγόρους και υπογράφηκαν. Η λογιστική υποστήριξη παρήγαγε μηνιαίες αναφορές από τα εταιρικά έξοδα για τα βιβλία. Οι άνθρωποι κρατούν την ευθύνη της δουλειάς. Η AI κάνει την προετοιμασία.'))
  }
];

export function projectContext(pagePath) {
  const project = projects.find(item => pagePath.replaceAll('\\', '/').endsWith(`/work/${item.slug}/index.html`));
  if (!project) return {};
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return { project, nextProject: next };
}

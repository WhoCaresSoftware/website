// Public facts and search metadata for every page, in both languages.
// Search titles and descriptions say what the studio does in the words people
// search with; the visible copy keeps its own voice. Never invent claims here.
import { projects } from './projects.mjs';

export const origin = 'https://whocaressoftware.com';
export const email = 'whocaressoftware@gmail.com';
export const sameAs = [
  'https://www.linkedin.com/company/whocaressoftware/',
  'https://github.com/WhoCaresSoftware'
];
export const founders = [
  { name: 'Michail “Mike” Bastakis', alternateName: 'Mike', url: 'https://www.linkedin.com/in/mbastakis/' },
  { name: 'XRS', url: 'https://www.linkedin.com/in/chriskarpousis/' }
];

const t = (en, el) => ({ en, el });

export const home = {
  title: t(
    'Custom Software, Automation & AI Development — Who Cares Software',
    'Ανάπτυξη Λογισμικού, Αυτοματισμοί & AI — Who Cares Software'
  ),
  description: t(
    'Independent software studio in Greece. Custom software development, workflow automation, practical AI and cloud infrastructure, built around how your business actually works.',
    'Ανεξάρτητο στούντιο λογισμικού στην Ελλάδα. Ανάπτυξη λογισμικού στα μέτρα σας, αυτοματισμοί, πρακτικό AI και υποδομές cloud, γύρω από τον τρόπο που δουλεύει η επιχείρησή σας.'
  ),
  socialTitle: t(
    'Who Cares Software — Custom software, automation and AI for work that’s stuck',
    'Who Cares Software — Λογισμικό, αυτοματισμοί και AI για δουλειά που έχει κολλήσει'
  ),
  socialDescription: t(
    'We start with how the work runs, then build what’s missing. Custom software, automation, AI and cloud from an independent studio in Greece.',
    'Ξεκινάμε από τον τρόπο που γίνεται η δουλειά και φτιάχνουμε ό,τι λείπει. Λογισμικό, αυτοματισμοί, AI και cloud από ένα ανεξάρτητο στούντιο στην Ελλάδα.'
  )
};

export const services = [
  { name: t('Custom software development', 'Ανάπτυξη λογισμικού στα μέτρα σας'),
    description: t('Internal tools and customer applications shaped around how your business runs, or improvements to the software you already have.', 'Εσωτερικά εργαλεία και εφαρμογές για πελάτες, φτιαγμένα γύρω από τον τρόπο που δουλεύει η επιχείρησή σας, ή βελτίωση του λογισμικού που ήδη έχετε.') },
  { name: t('Workflow automation and AI', 'Αυτοματισμοί και AI'),
    description: t('Connecting tools, removing repetitive work and using AI where it earns its place.', 'Σύνδεση εργαλείων, λιγότερη επαναλαμβανόμενη δουλειά και AI εκεί που κερδίζει τη θέση του.') },
  { name: t('Cloud infrastructure and reliability', 'Υποδομές cloud και αξιοπιστία'),
    description: t('The infrastructure behind your software, set up to be easier to run, update and maintain.', 'Η υποδομή πίσω από το λογισμικό σας, στημένη ώστε να λειτουργεί, να ενημερώνεται και να συντηρείται πιο εύκολα.') }
];

// Search titles per project: the name plus what it is, then the brand.
const projectTitles = {
  aigistos: t('Aigistos: Custom Worksite ERP for Construction Fleets', 'Aigistos: ERP στα μέτρα για στόλους εργοταξίων'),
  'hex-mythica': t('Hex Mythica: Roguelite Deck-Builder Game Development', 'Hex Mythica: Ανάπτυξη roguelite παιχνιδιού με κάρτες'),
  'private-llm-gateway': t('Private LLM Gateway: Company-Hosted AI Infrastructure', 'Private LLM Gateway: Ιδιωτική υποδομή AI για εταιρείες'),
  'brand-image-pipelines': t('Brand Image Pipelines: AI Image & Video for Brands', 'Brand Image Pipelines: Εικόνες και βίντεο με AI για brands'),
  'coding-agents': t('Coding Agents: AI Adoption for Engineering Teams', 'Coding Agents: Υιοθέτηση AI σε ομάδες μηχανικών'),
  'ai-employees': t('AI Employees: AI Teams for Small Businesses', 'AI Employees: Ομάδες AI για μικρές επιχειρήσεις')
};
for (const slug of Object.keys(projectTitles)) {
  if (!projects.some(project => project.slug === slug)) throw new Error(`Search title for unknown project: ${slug}`);
}
for (const project of projects) {
  if (!projectTitles[project.slug]) throw new Error(`Missing search title for project: ${project.slug}`);
}

export const brand = 'Who Cares Software';
export const projectTitle = (project, lang) => `${projectTitles[project.slug][lang]} — ${brand}`;
export const pagePath = (lang, slug) => `${lang === 'el' ? '/el' : ''}${slug ? `/work/${slug}/` : '/'}`;
export const pageUrl = (lang, slug) => origin + pagePath(lang, slug);

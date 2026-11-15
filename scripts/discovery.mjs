// Machine-readable files written at build time from the same approved facts as
// the pages: llms.txt (https://llmstxt.org), a Markdown copy of each page beside
// its HTML (index.md), and sitemap.xml with hreflang alternates.
import { projects } from './projects.mjs';
import { brand, email, founders, home, origin, pagePath, pageUrl, sameAs, services } from './site.mjs';

const plain = text => text.replace(/\n/g, ' ');
const lines = (...parts) => `${parts.flat().filter(part => part !== null && part !== undefined).join('\n')}\n`;

const projectMarkdown = (project, lang) => {
  const el = lang === 'el';
  const steps = project.workflow ?? [];
  return lines(
    `# ${project.name}`, '',
    `> ${project.summary[lang]}`, '',
    `${el ? 'Είδος' : 'Type'}: ${project.kind[lang]}`,
    `${el ? 'Από' : 'By'}: [${brand}](${pageUrl(lang)})`,
    `${el ? 'Σελίδα' : 'Page'}: ${pageUrl(lang, project.slug)}`, '',
    `## ${plain(project.intro.title[lang])}`, '',
    project.intro.body[lang], '',
    project.delivery[lang], '',
    `## ${plain(project.showcaseTitle[lang])}`, '',
    project.showcaseBody[lang], '',
    steps.length ? [...steps.map(step => `- **${step.title[lang]}**: ${step.body[lang]}`), ''] : null,
    `## ${plain(project.outcome.title[lang])}`, '',
    project.outcome.body[lang], '',
    project.links?.length ? [...project.links.map(link => `- [${link.label[lang]}](${link.href})`), ''] : null,
    `## ${el ? 'Επικοινωνία' : 'Contact'}`, '',
    `Email: [${email}](mailto:${email})`
  );
};

const homeMarkdown = lang => {
  const el = lang === 'el';
  return lines(
    `# ${brand}`, '',
    `> ${home.description[lang]}`, '',
    el
      ? 'Το στούντιο το τρέχουν ο Mike και ο XRS, συνιδρυτές και μηχανικοί πλατφορμών. Μιλάτε με τους ανθρώπους που φτιάχνουν το λογισμικό, και όταν το ζητά η δουλειά μπαίνει και ένα δίκτυο έμπιστων συνεργατών. Έδρα στην Ελλάδα, συνεργασία με πελάτες παντού, στα ελληνικά και στα αγγλικά.'
      : 'The studio is run by Mike and XRS, co-founders and platform engineers. You talk to the people who build the software, with a collective of trusted specialists when the work calls for it. Based in Greece, working with clients anywhere, in English and Greek.', '',
    `## ${el ? 'Υπηρεσίες' : 'Services'}`, '',
    services.map(service => `- **${service.name[lang]}**: ${service.description[lang]}`), '',
    `## ${el ? 'Έργα' : 'Selected work'}`, '',
    projects.map(project => `- [${project.name}](${origin}${pagePath(lang, project.slug)}index.md): ${project.kind[lang]}. ${project.summary[lang]}`), '',
    `## ${el ? 'Προσέγγιση' : 'Approach'}`, '',
    el
      ? ['1. **Ρωτάμε τα δύσκολα**: δοκιμάζουμε τις παραδοχές και συμφωνούμε το αντικείμενο πριν μιλήσει κανείς για τιμή.', '2. **Χτίζουμε γύρω από τη δουλειά**: πληρώνετε για το αντικείμενο, όχι για τον αριθμό των ατόμων.', '3. **Κανονίζουμε τι γίνεται μετά**: τι ανήκει σε ποιον, πώς γίνεται η παράδοση και ποια υποστήριξη ακολουθεί.']
      : ['1. **Ask the awkward questions**: we test the assumptions and agree the scope before anyone talks price.', '2. **Build around the work**: you pay for the scope, not for headcount.', '3. **Decide what happens after**: who owns what, how handover works and what support follows.'], '',
    `## ${el ? 'Επικοινωνία' : 'Contact'}`, '',
    el ? 'Δεν χρειάζεται έτοιμο σχέδιο. Πείτε μας με τι ασχολείστε και τι σας εμποδίζει.' : 'No finished brief needed. Tell us what you are working on and what is in the way.', '',
    `- Email: [${email}](mailto:${email})`,
    founders.map(founder => `- ${founder.alternateName ?? founder.name}: [LinkedIn](${founder.url})`),
    sameAs.map(url => `- [${new URL(url).hostname.replace('www.', '')}](${url})`)
  );
};

export const llmsTxt = () => lines(
  `# ${brand}`, '',
  `> ${home.description.en}`, '',
  'Who Cares Software is run by its two co-founders, Mike and XRS, with a collective of trusted specialists. It is based in Greece and works with clients anywhere, in English and Greek. The website is static and complete in both languages: English at /, Greek at /el/. Every page below has a Markdown copy at the same path with index.md.', '',
  'Facts on these pages are approved by the studio. Project pages describe delivered scope and outcomes qualitatively; illustrations are conceptual and are not client screenshots.', '',
  '## Overview', '',
  `- [About, services and approach](${origin}/index.md): What the studio does, how it works and how to get in touch`,
  `- [Σχετικά, υπηρεσίες και προσέγγιση (Ελληνικά)](${origin}/el/index.md): The same overview in Greek`, '',
  '## Selected work', '',
  projects.map(project => `- [${project.name}](${origin}${pagePath('en', project.slug)}index.md): ${project.kind.en}. ${project.summary.en}`), '',
  '## Contact', '',
  `- [Email](mailto:${email}): Start a conversation; no finished brief needed`,
  sameAs.map(url => `- [${new URL(url).hostname.replace('www.', '')}](${url})`), '',
  '## Optional', '',
  projects.map(project => `- [${project.name} (Ελληνικά)](${origin}${pagePath('el', project.slug)}index.md)`),
  `- [Sitemap](${origin}/sitemap.xml)`
);

export const sitemapXml = () => {
  const entries = [null, ...projects].map(project => {
    const slug = project?.slug;
    const alternates = ['en', 'el'].map(lang => `<xhtml:link rel="alternate" hreflang="${lang}" href="${pageUrl(lang, slug)}"/>`)
      .concat(`<xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('en', slug)}"/>`).join('');
    return ['en', 'el'].map(lang => `  <url><loc>${pageUrl(lang, slug)}</loc>${alternates}</url>`).join('\n');
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`;
};

// Vite plugin: emit llms.txt, the sitemap and every page's Markdown copy.
export function discoveryPlugin() {
  return {
    name: 'website-discovery',
    apply: 'build',
    generateBundle() {
      const emit = (fileName, source) => this.emitFile({ type: 'asset', fileName, source });
      emit('llms.txt', llmsTxt());
      emit('sitemap.xml', sitemapXml());
      for (const lang of ['en', 'el']) {
        const prefix = lang === 'el' ? 'el/' : '';
        emit(`${prefix}index.md`, homeMarkdown(lang));
        for (const project of projects) emit(`${prefix}work/${project.slug}/index.md`, projectMarkdown(project, lang));
      }
    }
  };
}


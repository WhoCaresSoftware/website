// Head metadata and JSON-LD for each page and language, built from site.mjs and projects.mjs.
import { projects } from './projects.mjs';
import { brand, email, founders, home, origin, pagePath, pageUrl, projectTitle, sameAs, services } from './site.mjs';

const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const locale = { en: 'en_US', el: 'el_GR' };
const organizationId = `${origin}/#organization`;
const websiteId = `${origin}/#website`;

const organization = () => ({
  '@type': 'Organization',
  '@id': organizationId,
  name: brand,
  alternateName: ['whocares', 'WhoCaresSoftware'],
  url: `${origin}/`,
  logo: { '@type': 'ImageObject', url: `${origin}/whocares-logo-512.png`, width: 512, height: 512 },
  image: `${origin}/social/home-en.jpg`,
  email,
  description: home.description.en,
  address: { '@type': 'PostalAddress', addressCountry: 'GR' },
  areaServed: 'Worldwide',
  knowsLanguage: ['en', 'el'],
  founder: founders.map(({ name, alternateName, url }) => ({ '@type': 'Person', name, ...(alternateName && { alternateName }), sameAs: url })),
  contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email, availableLanguage: ['English', 'Greek'] },
  sameAs
});

const breadcrumbs = (lang, project) => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: brand, item: pageUrl(lang) },
    { '@type': 'ListItem', position: 2, name: lang === 'el' ? 'Έργα' : 'Work', item: `${pageUrl(lang)}#work` },
    { '@type': 'ListItem', position: 3, name: project.name, item: pageUrl(lang, project.slug) }
  ]
});

export function structuredData(lang, project) {
  if (project) {
    const url = pageUrl(lang, project.slug);
    return { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: projectTitle(project, lang), description: project.summary[lang],
        inLanguage: lang, isPartOf: { '@id': websiteId }, primaryImageOfPage: `${origin}${socialImage(lang, project)}`,
        about: { '@type': 'CreativeWork', name: project.name, description: project.summary[lang], creator: { '@id': organizationId } },
        breadcrumb: breadcrumbs(lang, project) },
      organization()
    ] };
  }
  const url = pageUrl(lang);
  return { '@context': 'https://schema.org', '@graph': [
    // One site name for the whole domain, declared on the root home page and mirrored on /el/.
    { '@type': 'WebSite', '@id': websiteId, name: brand, alternateName: ['whocares', 'WhoCaresSoftware'], url: `${origin}/`, inLanguage: ['en', 'el'], publisher: { '@id': organizationId } },
    { ...organization(),
      makesOffer: services.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name[lang], description: service.description[lang], provider: { '@id': organizationId } } })) },
    { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: home.title[lang], description: home.description[lang], inLanguage: lang, isPartOf: { '@id': websiteId }, about: { '@id': organizationId } },
    { '@type': 'ItemList', name: lang === 'el' ? 'Επιλεγμένα έργα' : 'Selected work',
      itemListElement: projects.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, url: pageUrl(lang, item.slug) })) }
  ] };
}

export const socialImage = (lang, project) => `/social/${project ? project.slug : 'home'}-${lang}.jpg`;

// Everything search engines and link previews read, rendered as <head> markup.
export function headMeta(lang, project) {
  const title = project ? projectTitle(project, lang) : home.title[lang];
  const description = project ? project.summary[lang] : home.description[lang];
  const socialTitle = project ? `${project.name} — ${project.kind[lang]}` : home.socialTitle[lang];
  const socialDescription = project ? project.summary[lang] : home.socialDescription[lang];
  const url = pageUrl(lang, project?.slug);
  const image = origin + socialImage(lang, project);
  const imageAlt = project ? `${project.name} — ${brand}` : (lang === 'el' ? 'Χαρτιά που γίνονται ένα καθαρό γράφημα: Who Cares Software' : 'Loose paperwork resolving into one clear chart: Who Cares Software');
  const other = lang === 'el' ? 'en' : 'el';
  const lines = [
    `<title>${escape(title)}</title>`,
    `<meta name="description" content="${escape(description)}">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="alternate" hreflang="en" href="${pageUrl('en', project?.slug)}">`,
    `<link rel="alternate" hreflang="el" href="${pageUrl('el', project?.slug)}">`,
    `<link rel="alternate" hreflang="x-default" href="${pageUrl('en', project?.slug)}">`,
    `<link rel="alternate" type="text/markdown" href="${pagePath(lang, project?.slug)}index.md">`,
    `<link rel="describedby" type="text/markdown" href="/llms.txt">`,
    `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`,
    `<meta property="og:site_name" content="${brand}">`,
    `<meta property="og:type" content="${project ? 'article' : 'website'}">`,
    `<meta property="og:locale" content="${locale[lang]}">`,
    `<meta property="og:locale:alternate" content="${locale[other]}">`,
    `<meta property="og:title" content="${escape(socialTitle)}">`,
    `<meta property="og:description" content="${escape(socialDescription)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${escape(imageAlt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${JSON.stringify(structuredData(lang, project)).replace(/</g, '\\u003c')}</script>`
  ];
  return lines.join('\n  ');
}

export const allPages = () => ['en', 'el'].flatMap(lang => [{ lang, path: pagePath(lang) }, ...projects.map(project => ({ lang, project, path: pagePath(lang, project.slug) }))]);

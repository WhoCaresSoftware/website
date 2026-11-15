import aigistos from './images/work-editorial/aigistos-portrait.webp';
import aigistosSmall from './images/work-editorial/aigistos-portrait-512.webp';
import hex from './images/work-stories/hex-mythica-tall.webp';
import hexSmall from './images/work-stories/hex-mythica-tall-568.webp';
import hexWide from './images/work-stories/hex-mythica-wide.webp';
import hexWideSmall from './images/work-stories/hex-mythica-wide-1088.webp';
import llm from './images/work-stories/private-llm-compact.webp';
import llmSmall from './images/work-stories/private-llm-compact-728.webp';
import llmWide from './images/work-stories/private-llm-landscape.webp';
import llmWideSmall from './images/work-stories/private-llm-landscape-824.webp';
import pipelines from './images/work-stories/brand-pipelines-compact.webp';
import pipelinesSmall from './images/work-stories/brand-pipelines-compact-728.webp';
import pipelinesWide from './images/work-stories/brand-pipelines-landscape.webp';
import pipelinesWideSmall from './images/work-stories/brand-pipelines-landscape-824.webp';
import coding from './images/work-stories/coding-agents-compact.webp';
import codingSmall from './images/work-stories/coding-agents-compact-728.webp';
import codingWide from './images/work-stories/coding-agents-wide.webp';
import codingWideSmall from './images/work-stories/coding-agents-wide-1088.webp';
import employees from './images/work-stories/ai-employees-compact.webp';
import employeesSmall from './images/work-stories/ai-employees-compact-728.webp';
import employeesWide from './images/work-stories/ai-employees-wide.webp';
import employeesWideSmall from './images/work-stories/ai-employees-wide-1088.webp';
import { media } from './media.js';

// Each image lists a half-width companion beside its master; sizes is measured
// by the browser from the rendered tile (sizes="auto"), with a fallback for
// browsers that do not support it yet.
const set = (small, smallWidth, large, largeWidth) => `${small} ${smallWidth}w, ${large} ${largeWidth}w`;
const covers = {
  'work-aigistos': { srcset: set(aigistosSmall, 512, aigistos, 1024), src: aigistosSmall, width: 1024, height: 1536 },
  'work-hex': { srcset: set(hexSmall, 568, hex, 1122), src: hexSmall, width: 1122, height: 1402,
    alternate: set(hexWideSmall, 1088, hexWide, 2172), media: media['work-tablet'] },
  'work-llm': { srcset: set(llmSmall, 728, llm, 1448), src: llmSmall, width: 1448, height: 1086,
    alternate: set(llmWideSmall, 824, llmWide, 1635), media: `not all and ${media['work-stacked']}` },
  'work-images': { srcset: set(pipelinesSmall, 728, pipelines, 1448), src: pipelinesSmall, width: 1448, height: 1086,
    alternate: set(pipelinesWideSmall, 824, pipelinesWide, 1635), media: `not all and ${media['work-stacked']}` },
  'work-agents': { srcset: set(codingSmall, 728, coding, 1448), src: codingSmall, width: 1448, height: 1086,
    alternate: set(codingWideSmall, 1088, codingWide, 2172), media: `not all and ${media.phone}` },
  'work-employees': { srcset: set(employeesSmall, 728, employees, 1448), src: employeesSmall, width: 1448, height: 1086,
    alternate: set(employeesWideSmall, 1088, employeesWide, 2172), media: `not all and ${media.phone}` }
};
const sizes = 'auto, (max-width: 600px) 65vw, (max-width: 1200px) 90vw, 45vw';

// Native art direction: complete compositions, not a universal portrait crop.
// Documents use the compact master; tile sources follow the existing grid.
export function projectArtwork(projectID, className = 'project-artwork') {
  const cover = covers[projectID];
  const picture = document.createElement('picture');
  picture.className = className;
  picture.dataset.project = projectID;
  if (cover.alternate && className === 'project-artwork') {
    const source = document.createElement('source');
    source.media = cover.media;
    source.srcset = cover.alternate;
    source.sizes = sizes;
    picture.append(source);
  }
  const image = new Image();
  // loading must precede sizes="auto" and src so the browser defers the choice to layout.
  image.loading = 'lazy';
  image.decoding = 'async';
  image.sizes = sizes;
  image.srcset = cover.srcset;
  image.src = cover.src;
  image.alt = '';
  image.width = cover.width;
  image.height = cover.height;
  picture.append(image);
  return picture;
}

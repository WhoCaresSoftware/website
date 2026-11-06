import aigistos from './images/work-editorial/aigistos-portrait.webp';
import hex from './images/work-stories/hex-mythica-tall.webp';
import hexWide from './images/work-stories/hex-mythica-wide.webp';
import llm from './images/work-stories/private-llm-compact.webp';
import llmWide from './images/work-stories/private-llm-landscape.webp';
import pipelines from './images/work-stories/brand-pipelines-compact.webp';
import pipelinesWide from './images/work-stories/brand-pipelines-landscape.webp';
import coding from './images/work-stories/coding-agents-compact.webp';
import codingWide from './images/work-stories/coding-agents-wide.webp';
import employees from './images/work-stories/ai-employees-compact.webp';
import employeesWide from './images/work-stories/ai-employees-wide.webp';
import { media } from './media.js';

const covers = {
  'work-aigistos': { src: aigistos, width: 1024, height: 1536 },
  'work-hex': { src: hex, width: 1122, height: 1402, alternate: hexWide, media: media['work-tablet'] },
  'work-llm': { src: llm, width: 1448, height: 1086, alternate: llmWide, media: `not all and ${media['work-stacked']}` },
  'work-images': { src: pipelines, width: 1448, height: 1086, alternate: pipelinesWide, media: `not all and ${media['work-stacked']}` },
  'work-agents': { src: coding, width: 1448, height: 1086, alternate: codingWide, media: `not all and ${media.phone}` },
  'work-employees': { src: employees, width: 1448, height: 1086, alternate: employeesWide, media: `not all and ${media.phone}` }
};

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
    picture.append(source);
  }
  const image = new Image();
  image.src = cover.src;
  image.alt = '';
  image.width = cover.width;
  image.height = cover.height;
  image.decoding = 'async';
  picture.append(image);
  return picture;
}

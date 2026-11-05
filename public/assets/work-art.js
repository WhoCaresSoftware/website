import aigistos from './images/work-editorial/aigistos-portrait.webp';
import hex from './images/work-editorial/hex-mythica-portrait.webp';
import llm from './images/work-editorial/private-llm-portrait.webp';
import pipelines from './images/work-editorial/brand-pipelines-portrait.webp';
import coding from './images/work-editorial/coding-agents-portrait.webp';
import employees from './images/work-editorial/ai-employees-portrait.webp';

const covers = {
  'work-aigistos': aigistos,
  'work-hex': hex,
  'work-llm': llm,
  'work-images': pipelines,
  'work-agents': coding,
  'work-employees': employees
};

// One synchronous source for tiles, folder papers and project documents.
export function projectArtwork(projectID, className = 'project-artwork') {
  const image = new Image();
  image.src = covers[projectID];
  image.className = className;
  image.alt = '';
  image.width = 1024;
  image.height = 1536;
  image.decoding = 'async';
  return image;
}

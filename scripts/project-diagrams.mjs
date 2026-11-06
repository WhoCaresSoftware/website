// Editorial explanations, never representations of a client's implementation.
const drawings = {
  'private-llm-gateway': `
    <path class="concept-tint" d="M360 35H840V270H360Z"/>
    <g class="concept-line"><path d="M355 30H845V275H355Z" stroke-dasharray="5 7"/>
    <rect class="concept-paper" x="60" y="80" width="210" height="135" rx="5"/>
    <path d="M60 110H270M80 96H84M95 96H99M110 96H114M85 137H191M85 155H230M85 173H200M85 192H146M140 215V238M110 238H220"/>
    <rect class="concept-paper" x="480" y="76" width="160" height="150" rx="4"/>
    <path d="M480 126H640M480 176H640M503 99H550M503 150H550M503 201H550"/>
    <circle cx="613" cy="100" r="4"/><circle cx="613" cy="150" r="4"/><circle cx="613" cy="200" r="4"/>
    <path class="concept-paper" d="M706 70H779L803 94V173H706Z"/><path d="M779 70V94H803M725 115H781M725 133H781M725 151H763"/>
    <path d="M694 92V186H779"/></g>
    <path class="concept-route" d="M270 148H480M640 148H672Q687 148 687 133V119Q687 104 702 104H706M467 140 480 148 467 156"/>
  `,
  'brand-image-pipelines': `
    <path class="concept-tint" d="M290 30H840V278H290Z"/>
    <g class="concept-line"><path class="concept-paper" d="M55 90H205V235H55Z"/>
    <path class="concept-paper" d="M102 109H158V124L170 139V206H90V139L102 124Z"/><path d="M102 109V94H158V109M91 157H169M91 184H169"/>
    <rect class="concept-paper" x="325" y="53" width="215" height="175"/>
    <path d="M325 181Q355 160 385 181T445 181T505 181T540 181M325 195Q355 174 385 195T445 195T505 195T540 195M397 112H450V127L459 140V197H388V140L397 127ZM397 112V98H450V112M389 154H458M389 176H458"/>
    <rect class="concept-paper" x="595" y="91" width="215" height="175"/>
    <path d="M595 215H810M625 215V148Q625 113 660 113T695 148V215M689 158H741V173L751 186V240H680V186L689 173ZM689 158V144H741V158M681 199H750M681 219H750M773 215V92"/></g>
    <path class="concept-route" d="M205 163H269Q285 163 285 147V128Q285 112 301 112H325M285 147V245Q285 261 301 261H560Q576 261 576 245V190Q576 174 592 174H595M312 104 325 112 312 120M582 166 595 174 582 182"/>
  `,
  'coding-agents': `
    <path class="concept-tint" d="M350 45H680V263H350Z"/>
    <g class="concept-line"><path class="concept-paper" d="M64 68H240V239H64Z"/>
    <path d="M89 94H183M89 114H213M89 134H188M90 174H130V198H90ZM172 174H212V198H172ZM130 186H172M150 154V186"/>
    <rect class="concept-paper" x="354" y="80" width="275" height="165" rx="4"/>
    <path d="M354 109H629M372 95H376M386 95H390M400 95H404M391 139 377 153 391 167M591 139 605 153 591 167M508 131 489 176M407 192H464M407 212H530"/>
    <path class="concept-paper" d="M713 63H827V223H713Z"/><path d="M732 99H750V117H732ZM763 108H805M735 106l5 5 11-13M732 140H750V158H732ZM763 149H805M735 147l5 5 11-13M732 181H750V199H732ZM763 190H805M735 188l5 5 11-13"/></g>
    <path class="concept-route" d="M240 153H354M629 153H669Q685 153 685 137V124Q685 108 701 108H713M341 145 354 153 341 161M700 100 713 108 700 116"/>
  `,
  'ai-employees': `
    <path class="concept-tint" d="M300 28H663V283H300Z"/>
    <g class="concept-line"><path class="concept-paper" d="M65 87H190V235H65Z"/><path d="M80 72H205V220M95 57H220V205M84 116H166M84 137H166M84 158H149M84 192H166M84 211H139"/>
    <path class="concept-paper" d="M361 47H537V145H361Z"/><path d="M385 71H508M385 93H508M385 116H476"/>
    <path class="concept-paper" d="M391 182H584V273H391Z"/><path d="M391 211H584M391 242H584M453 182V273M522 182V273"/>
    <path class="concept-paper" d="M725 75H825V232H725Z"/><path d="M743 100H804M743 121H804M743 142H792"/>
    <circle cx="775" cy="185" r="23"/><path d="m763 184 9 9 18-20"/></g>
    <path class="concept-route" d="M220 148H270Q286 148 286 132V113Q286 97 302 97H361M286 132V211Q286 227 302 227H391M537 97H626Q642 97 642 113V148Q642 164 658 164H725M584 227H626Q642 227 642 211V180Q642 164 658 164M712 156 725 164 712 172"/>
  `
};

export function projectDiagram(slug) {
  if (!drawings[slug]) return '';
  return `<svg class="case-concept" viewBox="0 0 900 310" fill="none" aria-hidden="true">${drawings[slug]}</svg>`;
}

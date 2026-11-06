/* One vector family: cut-paper silhouettes, teal overprints and an amber thread. */
let maskSequence = 0;
let instanceSequence = 0;

// Draw in SVG coordinates inside an alpha mask; the visible ink keeps its
// non-scaling weight. Separate arrow arms start at the tip, after the shaft.
function thread(shaft, arms = []) {
  const reveal = (paths, part) => {
    const id = `__ART__-${++maskSequence}`;
    return `<defs><mask id="${id}" class="art-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="240" height="160">${paths.map(d => `<path class="art-reveal art-reveal-${part}" pathLength="1" d="${d}"/>`).join('')}</mask></defs><path class="art-route art-${part}" mask="url(#${id})" d="${paths.join(' ')}"/>`;
  };
  return `<g class="art-thread">${reveal([shaft], 'shaft')}${arms.length ? reveal(arms, 'head') : ''}</g>`;
}

const drawings = {
  software: `<path class="art-field" d="M28 42 153 20l21 112-125 22Z"/>
    <g transform="rotate(-5 113 84)"><path class="art-paper" d="M46 39h139v93H46Z"/><path d="M46 57h139"/><path class="art-detail" d="M57 48h3m7 0h3"/><path class="art-solid" d="M58 69h37v50H58Z"/><path d="M109 73h59m-59 16h41m-41 16h52"/></g>
    <g class="art-piece" transform="rotate(8 189 107)"><path class="art-solid" d="M161 79h52v56h-52Z"/><path class="art-inverse" d="m174 105 8 8 17-19"/></g>
    ${thread('M17 119h18v22h111q11 0 11-11v-17', ['M157 113l-5 6', 'M157 113l5 6'])}`,
  automation: `<circle class="art-field" cx="122" cy="79" r="62"/>
    <g transform="rotate(-8 54 76)"><path class="art-paper" d="M22 41h61v79H22Z"/><path d="M34 57h35m-35 13h25m-25 13h31"/></g>
    ${thread('M61 134h54q9 0 9-9V39q0-10 10-10h42', ['M176 29l-6-5', 'M176 29l-6 5'])}
    <g class="art-piece" transform="rotate(5 125 81)"><path class="art-solid" d="M91 50h67v64H91Z"/><path class="art-inverse" d="m104 83 10-10-10-10m40 20-10 10 10 10M118 97l12-32"/></g>
    <g transform="rotate(7 195 84)"><path class="art-paper" d="M174 46h43v64h-43Z"/><path d="M183 58h24m-24 10h17"/>${thread('M184 87l7 7 14-16')}</g>`,
  cloud: `<path class="art-field" d="M27 60 143 22l38 96-116 38Z"/>
    ${thread('M29 124h52V35h99', ['M180 35l-7-5', 'M180 35l-7 5'])}
    ${thread('M81 83h118v42', ['M199 125l-5-6', 'M199 125l5-6'])}
    <g transform="rotate(-6 137 65)"><path class="art-solid" d="M92 45h115v36H92Z"/><path class="art-inverse" d="M104 57h43m-43 12h28"/><circle class="art-inverse" cx="193" cy="63" r="4"/></g>
    <g transform="rotate(5 139 107)"><path class="art-paper" d="M87 90h115v36H87Z"/><path d="M99 102h43m-43 12h28"/><circle class="art-ink" cx="188" cy="108" r="4"/></g>
    <circle class="art-paper" cx="49" cy="91" r="23"/>${thread('M37 91l8 8 16-18')}`,
  clarify: `<circle class="art-field" cx="123" cy="81" r="62"/>
    <g transform="rotate(-12 65 83)"><path class="art-paper" d="M28 40h71v85H28Z"/><path d="M41 58h43m-43 13h30m-30 13h37"/></g>
    <g transform="rotate(8 137 67)"><path class="art-solid" d="M104 22h70v90h-70Z"/><path class="art-inverse" d="M118 41h41m-41 13h30m-30 13h36"/></g>
    <g class="art-piece" transform="rotate(-3 181 106)"><path class="art-paper" d="M148 68h65v77h-65Z"/><path d="M160 85h39m-39 12h25"/>${thread('M160 125h37')}${thread('M17 132h105q11 0 11-11V91', ['M133 91l-5 6', 'M133 91l5 6'])}</g>`,
  build: `<path class="art-field" d="M35 54 164 20l28 105-129 34Z"/>
    <g transform="rotate(-7 62 83)"><path class="art-paper" d="M22 44h74v77H22Z"/><path d="M35 62h46m-46 13h30m-30 13h40"/></g>
    ${thread('M33 139h81q11 0 11-11V30h69', ['M194 30l-7-5', 'M194 30l-7 5'])}
    <g class="art-piece" transform="rotate(5 128 81)"><path class="art-solid" d="M90 42h76v79H90Z"/><path class="art-inverse" d="m113 68-12 13 12 13m29-26 12 13-12 13m-19 9 10-44"/></g>
    <g transform="rotate(-6 189 109)"><path class="art-paper" d="M166 85h49v48h-49Z"/>${thread('M178 109l8 8 16-18')}</g>`,
  delivery: `<circle class="art-field" cx="120" cy="83" r="62"/>
    ${thread('M45 49V33h143q22 0 22 22v39', ['M210 94l-5-7', 'M210 94l5-7'])}
    ${thread('M195 120v20H47q-22 0-22-22V81', ['M25 81l-5 7', 'M25 81l5 7'])}
    <g transform="rotate(-5 117 82)"><path class="art-paper" d="M48 54h139v63H48Z"/><path d="M94 54v63m46-63v63M61 76h20m-20 12h13"/><path class="art-solid" d="M94 54h46v63H94Z"/><path class="art-inverse" d="m106 83 8 8 15-17"/><path d="M153 76h20m-20 12h13"/></g>
    <circle class="art-solid" cx="194" cy="126" r="19"/><path class="art-inverse" d="M185 126h18m-9-9v18"/>`
};

export function illustration(name, className = '') {
  if (!Object.hasOwn(drawings, name)) throw new Error(`Unknown illustration: ${name}`);
  const body = drawings[name].replaceAll('__ART__', `art-${++instanceSequence}`);
  return `<svg class="editorial-art ${className}" viewBox="0 0 240 160" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}

// import { SearchAddon } from 'xterm-addon-search';
import { FitAddon } from 'xterm-addon-fit';
import { Unicode11Addon } from 'xterm-addon-unicode11';

const fitAddon = new FitAddon();
// const searchAddon = new SearchAddon();
const unicode11Addon = new Unicode11Addon();
// term.unicode.activeVersion = '11';

export const xtermAddons = [fitAddon, /* searchAddon,  */unicode11Addon];

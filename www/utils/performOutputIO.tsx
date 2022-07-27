import { Terminal as XTerminal } from 'xterm';

export function performOutputIO(output: string, terminal: XTerminal) {
    terminal.clear()
    terminal.write(
        // > https://stackoverflow.com/questions/71515841/xtermjs-doesnt-display-correctly-and-shows-crooked-text
        output.split('\n').join('\r\n'));
}

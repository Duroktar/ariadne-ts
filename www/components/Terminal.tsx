import * as React from 'react';
import { ITerminalOptions } from 'xterm';
import { XTerm } from 'xterm-for-react';
import { useStore } from '../store';
import { performOutputIO } from '../utils/performOutputIO';
import { xtermAddons } from '../utils/xtermAddons';

const xtermDefaultOptions: ITerminalOptions = {
    allowTransparency: true,
    fontSize: 14,
    fontFamily: "Operator Mono Lig, Menlo, Monaco, 'Courier New', monospace"
};

type TerminalProps = {}

export const Terminal = (_props: TerminalProps) => {
    const xtermRef = React.useRef<XTerm>(null)
    const output = useStore(state => state.outputString)

    React.useEffect(() => {
        const el = xtermRef.current;
        if (el)
            el.terminal.unicode.activeVersion = '11';
    }, [xtermRef.current])

    React.useEffect(() => {
        try {
            const el = xtermRef.current
            if (el)
                performOutputIO(output, el.terminal);
        } catch {}  
    }, [output, xtermRef.current])

    return (
        <XTerm ref={xtermRef} addons={xtermAddons} options={xtermDefaultOptions} />
    )
}



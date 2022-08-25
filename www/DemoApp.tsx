import * as React from 'react';
import { BuilderForm } from './components/BuilderForm';
import { EditorTabs } from './components/EditorTabs';
import { Terminal } from './components/Terminal';

import 'xterm/css/xterm.css'
import './styles.css'

export const DemoApp = () => {
    return (
        <React.Fragment>
            <div id="top">
                <div className="source-pane">
                    <EditorTabs />
                </div>
                <div className="builder-form">
                    <BuilderForm />
                </div>
            </div>
            <div className="terminal">
                <Terminal />
            </div>
        </React.Fragment>
    );
};

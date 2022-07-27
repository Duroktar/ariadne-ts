import * as React from 'react';
import { BuilderForm } from './components/BuilderForm';
import { SourcePane } from './components/SourcePane';
import { Terminal } from './components/Terminal';

export const DemoApp = () => {
    return (
        <React.Fragment>
            <div id="top">
                <div className="source-pane">
                    <SourcePane />
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

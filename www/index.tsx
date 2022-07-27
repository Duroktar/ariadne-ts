import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DemoApp } from './DemoApp';
import 'xterm/css/xterm.css'
import './styles.css'

createRoot(document.querySelector('#root')!)
    .render(<DemoApp />);

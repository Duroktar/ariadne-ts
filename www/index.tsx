import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { DemoApp } from './DemoApp';

createRoot(document.querySelector('#root')!)
    .render(<DemoApp />);

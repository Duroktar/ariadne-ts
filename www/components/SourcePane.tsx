import * as React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { defaultEditorSourceContent, defaultEditorSourceDevelopmentContent } from 'www/fixtures';
import { useStore } from 'www/store';
import { Editor } from './Editor';
import 'react-tabs/style/react-tabs.css';

export const SourcePane = ({plus = '+'}: {plus?: string}) => {
    const [n, setN] = React.useState<number>(1);
    const [tabs, setTabs] = React.useState<string[]>([`Untitled-1`, plus]);
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const setOutput = useStore(state => state.setSourceString);
    const setSelection = useStore(state => state.setSelection);

    const rm = React.useCallback((tab: string) => {
        if (tabs.length > 2) {
            if (tabIndex === tabs.length - 2) {
                // BUG: This should work without a timeout
                setTimeout(() => {
                    setTabIndex(tabIndex - 1)
                }, 10)
            }
            setTabs(tabs => tabs.filter(t => t !== tab))
        }
    }, [tabs, tabIndex, setTabs, setTabIndex])

    return (
        <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
                if (index === tabs.length - 1) {
                    setTabs(tabs => [...tabs.slice(0, -1), `Untitled-${n + 1}`, plus])
                    setN(n => n + 1)
                }
                setTabIndex(index)
            }}
        >
            <TabList>
                {tabs.map(tab => (
                    <Tab key={tab}>
                        {tab}{tab === '+' ? null : <span className="tab-close-btn" onClick={() => rm(tab)}>X</span>}
                    </Tab>
                ))}
            </TabList>

            {tabs.map(tab => (
                <TabPanel key={tab}>
                    <Editor
                        name="editor-1"
                        defaultValue={defaultEditorSourceDevelopmentContent}
                        onChange={setOutput}
                        onSelectionChange={setSelection}
                    />
                </TabPanel>
            ))}
        </Tabs>
    );
}

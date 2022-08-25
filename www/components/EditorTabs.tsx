import * as React from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { defaultEditorSourceDevelopmentContent } from '../fixtures';
import { useStore } from '../store';
import { Editor } from './Editor';
import 'react-tabs/style/react-tabs.css';

type EditorTabsProps = {
    plus?: string;
};

type EditorTab = {
    id: string;
};

const tab = (id: string): EditorTab => ({
    id,
})

export const EditorTabs = ({plus = '+'}: EditorTabsProps) => {
    const [n, setN] = React.useState<number>(1);
    const [tabs, setTabs] = React.useState<EditorTab[]>([tab(`Untitled-1`), tab(plus)]);
    const [tabIndex, setTabIndex] = React.useState<number>(0);
    const setOutput = useStore(state => state.setSourceString);
    const setSelection = useStore(state => state.setSelection);

    const rm = React.useCallback((tab: EditorTab) => {
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
            forceRenderTabPanel={true}
            selectedIndex={tabIndex}
            onSelect={(index) => {
                if (index === tabs.length - 1) {
                    setTabs(tabs => [...tabs.slice(0, -1), tab(`Untitled-${n + 1}`), tab(plus)])
                    setN(n => n + 1)
                }
                setTabIndex(index)
            }}
        >
            <TabList>
                {tabs.map(tab => (
                    <Tab key={tab.id}>
                        <>{tab.id}{<CloseButton tab={tab} rm={rm} />}</>
                    </Tab>
                ))}
            </TabList>

            {tabs.map(tab => (
                <TabPanel key={tab.id}>
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

type CloseButtonProps = {
    tab: EditorTab;
    rm: (tab: EditorTab) => void;
    icon?: string;
};

const CloseButton = ({ tab, rm, icon = 'X'}: CloseButtonProps) => {
    if (tab.id === '+')
        return null

    return (
        <span
            className="tab-close-btn"
            onClick={() => rm(tab)}
        >
            {icon}
        </span>
    )
}


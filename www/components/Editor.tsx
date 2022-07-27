import React from "react";
import AceEditor from "react-ace";
import { getSelectionRange } from "www/utils/getSelectionRange";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

type EditorProps = {
    name?: string;
    defaultValue?: string;
    mode?: string;
    onChange?: (newValue: any) => void;
    onSelectionChange?: (range: any, value: any, event?: any) => void;
};

export const Editor = (props: EditorProps) => {
    const editorRef = React.useRef<AceEditor>(null)
    return (
        <AceEditor
            ref={editorRef}
            mode={props.mode ?? 'text'}
            theme="monokai"
            width="100%"
            height="100%"
            onChange={props.onChange}
            name={props.name}
            editorProps={{ $blockScrolling: true }}
            defaultValue={props.defaultValue}
            onSelectionChange={(...args) => {
                props.onSelectionChange?.(getSelectionRange(editorRef.current?.editor), ...args)
            }}
            setOptions={{
                displayIndentGuides: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
                fontSize: 15
            }}
        />
    )
}

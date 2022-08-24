import * as React from "react";
import AceEditor from "react-ace";
import { Ace, createEditSession } from 'ace-builds';
import { getSelectionRange } from "../utils/getSelectionRange";

import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import 'ace-builds/src-noconflict/ext-searchbox';
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
    const editSessionRef = React.useRef<Ace.EditSession>()
    React.useEffect(() => {
        if (editorRef.current) {
            editSessionRef.current = editorRef.current.editor.session
            debugger
        }
    }, [editorRef.current])
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
                if (editorRef.current?.editor === undefined)
                    return
                if (props.onSelectionChange === undefined)
                    return

                const editor = editorRef.current.editor;
                const range = getSelectionRange(editor);
                props.onSelectionChange(range, ...args);
            }}
            setOptions={{
                displayIndentGuides: false,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 2,
                fontSize: 15,
            }}
        />
    )
}

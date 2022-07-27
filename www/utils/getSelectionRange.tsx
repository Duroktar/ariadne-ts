export function getSelectionRange(editor: any) {
    const r = editor.getSelectionRange();
    const start = editor.session.doc.positionToIndex(r.start);
    const end = editor.session.doc.positionToIndex(r.end);
    return { start, end };
}

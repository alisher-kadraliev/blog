"use client"
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useEffect } from "react";


const ContentArea = ({ dbContent }: any) => {
    const editor = useCreateBlockNote();
    useEffect(() => {
        async function loadInitialHTML() {
            const blocks = await editor.tryParseHTMLToBlocks(dbContent);
            editor.replaceBlocks(editor.document, blocks);
        }
        loadInitialHTML();
    }, [editor]);
    return (
        <BlockNoteView editor={editor} editable={false} theme={"light"} />
    )
}

export default ContentArea
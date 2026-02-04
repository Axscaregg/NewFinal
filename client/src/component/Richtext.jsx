import React, { useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";

export default function Richtext({ value = "", onChange, editable = true }) {
    const [html, setHtml] = useState(value || "");

    useEffect(() => {
        setHtml(value || "");
    }, [value]);

    return (
        <Editor
            value={html}
            disabled={!editable}
            onChange={(e) => {
                const next = e.target.value;
                setHtml(next);
                onChange?.(next);
            }}
        />
    );
}

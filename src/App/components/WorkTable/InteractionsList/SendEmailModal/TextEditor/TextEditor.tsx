import React, { useRef, useEffect } from "react";

interface TextEditorProps {
  text: string;
  setText: (value: string) => void;
  isInvalid: boolean;
}

export default function TextEditor({
  text,
  setText,
  isInvalid,
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== text) {
      const contentWithoutHR = text.replace(/^<hr>/, "");
      editorRef.current.innerHTML = `<div><br></div><hr>${contentWithoutHR}`;
    }
  }, [text]);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    let current = editorRef.current?.innerHTML || "";
    current = current.replace(/^<hr>/, "");
    setText(current);
  };

  return (
    <div className="text-editor">
      <div className="text-editor__format">
        <button
          className="text-editor__format__button"
          onClick={() => handleCommand("bold")}
        >
          <strong>B</strong>
        </button>
        <button
          className="text-editor__format__button"
          onClick={() => handleCommand("italic")}
        >
          <em>I</em>
        </button>
        <button
          className="text-editor__format__button"
          onClick={() => handleCommand("underline")}
        >
          <u>U</u>
        </button>
        <input
          className="text-editor__format__input"
          type="color"
          onChange={(e) => handleCommand("foreColor", e.target.value)}
        />
        <select
          className="text-editor__format__input"
          onChange={(e) => handleCommand("fontSize", e.target.value)}
        >
          <option value="">Font Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
        </select>
      </div>

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className={`text-editor__content ${isInvalid ? "invalid" : ""}`}
      ></div>
    </div>
  );
}

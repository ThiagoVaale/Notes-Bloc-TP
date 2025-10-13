import React, { useState, useEffect, useRef } from "react";
import { Document } from "../composite/Document";
import { CommandHistory } from "../command/CommandHistory";
import { InsertCharCommand } from "../command/InsertCharCommand";
import { DeleteCommand } from "../command/DeleteCommand";
import { ChangeAlignmentCommand } from "../command/ChangeAlignmentCommand";

import { LeftAlign } from "../strategy/LeftAlign";
import { RightAlign } from "../strategy/RightAlign";
import { CenterAlign } from "../strategy/CenterAlign";
import { JustifyAlign } from "../strategy/JustifyAlign";

import "./Editor.css";
import type { Alignment } from "../types/Aligment";

export const Editor: React.FC = () => {
  const [doc] = useState(() => new Document());
  const [text, setText] = useState("");
  const [alignment, setAlignment] = useState<Alignment>("left");

  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [lineCount, setLineCount] = useState(1);
  const [paragraphCount, setParagraphCount] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const history = useRef(new CommandHistory()).current;
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const MAX_LINES_PER_PAGE = 10;

  useEffect(() => {
    const main = document.querySelector(".editor-main");
    if (main) {
      if (text.trim().length > 0) main.classList.add("has-text");
      else main.classList.remove("has-text");
    }

    setWordCount(doc.getWordCount());
    setLetterCount(text.length);

    const lines = text.split("\n");
    setLineCount(lines.length);

    const paragraphs =
      text.trim().length === 0
        ? 0
        : text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
    setParagraphCount(paragraphs);

    const pages = Math.max(1, Math.ceil(lines.length / MAX_LINES_PER_PAGE));
    setPageCount(pages);
    if (currentPage > pages) setCurrentPage(pages);
  }, [text, doc, currentPage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key;

    if (e.ctrlKey && key === "z") {
      e.preventDefault();
      history.undo();
      setText(doc.getText());
      requestAnimationFrame(() => textAreaRef.current?.focus());
      return;
    }

    if (key === "Backspace") {
      e.preventDefault();
      history.executeCommand(new DeleteCommand(doc));
      setText(doc.getText());
      return;
    }

    if (key.length === 1) {
      e.preventDefault();
      history.executeCommand(new InsertCharCommand(doc, key));
      setText(doc.getText());
    }

    if (key === "Enter") {
      e.preventDefault();
      history.executeCommand(new InsertCharCommand(doc, "\n"));
      setText(doc.getText());
    }
  };

  const handleAlign = (type: Alignment) => {
    if (type === alignment) return;

    history.executeCommand(new ChangeAlignmentCommand(setAlignment, alignment, type));

    let strategy;
    switch (type) {
      case "right":
        strategy = new RightAlign();
        break;
      case "center":
        strategy = new CenterAlign();
        break;
      case "justify":
        strategy = new JustifyAlign();
        break;
      default:
        strategy = new LeftAlign();
    }

    const aligned = strategy.align(doc.getText(), 80);
    setText(aligned);
    requestAnimationFrame(() => textAreaRef.current?.focus());
  };

  const getPages = (): string[] => {
    const lines = text.split("\n");
    const pages: string[] = [];
    for (let i = 0; i < lines.length; i += MAX_LINES_PER_PAGE) {
      const chunk = lines.slice(i, i + MAX_LINES_PER_PAGE).join("\n");
      pages.push(chunk);
    }
    if (pages.length === 0) pages.push("");
    return pages;
  };

  const pages = getPages();
  const currentText = pages[currentPage - 1] || "";

  const handlePageChange = (dir: "next" | "prev") => {
    setCurrentPage((prev) => {
      if (dir === "next" && prev < pageCount) return prev + 1;
      if (dir === "prev" && prev > 1) return prev - 1;
      return prev;
    });
    requestAnimationFrame(() => textAreaRef.current?.focus());
  };

  return (
    <div className="editor-wrapper">
      <header className="editor-header">
        <h1>📝 Text Editor</h1>
        <div className="toolbar">
          <button
            className={alignment === "left" ? "active" : ""}
            onClick={() => handleAlign("left")}
            title="Left"
          >
            ⯇
          </button>
          <button
            className={alignment === "center" ? "active" : ""}
            onClick={() => handleAlign("center")}
            title="Center"
          >
            ↔
          </button>
          <button
            className={alignment === "right" ? "active" : ""}
            onClick={() => handleAlign("right")}
            title="Right"
          >
            ⯈
          </button>
          <button
            className={alignment === "justify" ? "active" : ""}
            onClick={() => handleAlign("justify")}
            title="Justify"
          >
            ≡
          </button>
        </div>
      </header>

      <main className={`editor-main${text.trim() ? " has-text" : ""}`}>
        <div className="editor-page">
          <div className="page-header">Page {currentPage}</div>
          <div className="editor-block">
            <div className="placeholder-text">
              {text.trim() === "" ? "Start typing your text here..." : ""}
            </div>
            <textarea
              ref={textAreaRef}
              value={currentText}
              onKeyDown={handleKeyDown}
              onChange={() => {}}
              spellCheck={false}
              className={`editor-textarea align-${alignment}`}
              autoFocus
            />
          </div>
        </div>

        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
          >
            ◀
          </button>
          <span className="page-indicator">
            Page {currentPage} / {pageCount}
          </span>
          <button
            className="page-btn"
            onClick={() => handlePageChange("next")}
            disabled={currentPage === pageCount}
          >
            ▶
          </button>
        </div>
      </main>

      <footer className="editor-footer">
        <div>Words: <strong>{wordCount}</strong></div>
        <div>Letters: <strong>{letterCount}</strong></div>
        <div>Lines: <strong>{lineCount}</strong></div>
        <div>Paragraphs: <strong>{paragraphCount}</strong></div>
        <div>Pages: <strong>{pageCount}</strong></div>
        <div>Alignment: <span className="align-label">{alignment}</span></div>
      </footer>
    </div>
  );
};

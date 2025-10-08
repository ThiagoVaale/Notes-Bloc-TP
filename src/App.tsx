import { useCallback, useMemo, useState } from "react";
import "./App.css";

import { Document as Doc } from "./composite/Document";
import { Page } from "./composite/Page";
import { Paragraph } from "./composite/Paragraph";
import { Line } from "./composite/Line";
import { Word } from "./composite/Word";

import { LeftAlign } from "./strategy/LeftAlign";
import { RightAlign } from "./strategy/RightAlign";
import { CenterAlign } from "./strategy/CenterAlign";
import { JustifyAlign } from "./strategy/JustifyAlign";
import type { AlignmentStrategy } from "./strategy/AlignmentStrategy";
import { renderAligned } from "./strategy/Render";

import { CommandHistory } from "./command/CommandHistory";
import { InsertWordCommand } from "./command/InsertWordCommand";
import { DeleteWordCommand } from "./command/DeleteWordCommand";
import { AlignStrategyCommand } from "./command/AlignStrategyCommnad";

const initialDoc = () => {
  const d = new Doc();
  const p = new Page();
  const pg = new Paragraph();
  const ln = new Line();
  d.add(p); p.add(pg); pg.add(ln);
  return d;
};

function App() {
  const [document] = useState(() => initialDoc());
  const [history] = useState(() => new CommandHistory());
  const [strategy, setStrategy] = useState<AlignmentStrategy>(() => new LeftAlign());
  const [typed, setTyped] = useState(""); // buffer de textarea

  const plain = useMemo(() => document.getContent(), [document, strategy, typed]); // contenido semántico
  const preview = useMemo(() => renderAligned(plain, strategy), [plain, strategy]);

  const flushWord = useCallback((w: string) => {
    if (!w.trim()) return;
    history.execute(new InsertWordCommand(document, new Word(w.trim())));
  }, [document, history]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      flushWord(typed);
      setTyped("");
    }
  }, [flushWord, typed]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTyped(e.target.value);
  }, []);

  const onDelete = useCallback(() => {
    history.execute(new DeleteWordCommand(document));
  }, [document, history]);

  const changeAlign = useCallback((next: AlignmentStrategy) => {
    history.execute(new AlignStrategyCommand(
      () => strategy,
      (s) => setStrategy(s),
      next
    ));
  }, [history, strategy]);

  const undo = useCallback(() => {
    history.undo();
  }, [history]);

  const words = document.countWords();
  const pages = document.countPages();

  return (
    <div className="editor-container">
      <h2>Editor de Texto — Composite + Command + Strategy</h2>

      <div className="toolbar">
        <div className="group">
          <button onClick={undo} disabled={!history.canUndo()}>Undo</button>
          <button onClick={onDelete}>Delete last word</button>
        </div>

        <div className="group">
          <span>Alineación:</span>
          <button onClick={() => changeAlign(new LeftAlign())}>Left</button>
          <button onClick={() => changeAlign(new CenterAlign())}>Center</button>
          <button onClick={() => changeAlign(new RightAlign())}>Right</button>
          <button onClick={() => changeAlign(new JustifyAlign())}>Justify</button>
        </div>

        <div className="group">
          <strong>Words:</strong> {words} &nbsp; | &nbsp; <strong>Pages:</strong> {pages}
        </div>
      </div>

      <div className="editor">
        <pre className="preview">{preview || "Preview will appear here..."}</pre>
        <textarea
          value={typed}
          onChange={onChange}
          onKeyDown={onKeyDown}
          placeholder="Escribe y presiona espacio o Enter para agregar palabras…"
        />
      </div>
    </div>
  );
}

export default App;

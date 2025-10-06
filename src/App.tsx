import { useState, useCallback } from 'react'
import './App.css'
import { Document } from './composite/Document'
import { Word } from './composite/Word'
import { CommandHistory } from './command/CommandHistory'
import { InsertWordCommand } from './command/InsertWordCommand'
import { DeleteWordCommand } from './command/DeleteWordCommand'

function App() {
  const [document, setDocument] = useState<Document>(new Document())
  const [content, setContent] = useState<string>('')
  const commandHistory = new CommandHistory()

  const handleInsertWord = useCallback((text: string) => {
    const word = new Word(text)
    const command = new InsertWordCommand(document, word)
    commandHistory.executeCommand(command)
    setContent(document.getContent())
  }, [document])

  const handleDelete = useCallback(() => {
    const command = new DeleteWordCommand(document)
    commandHistory.executeCommand(command)
    setContent(document.getContent())
  }, [document])

  const handleUndo = useCallback(() => {
    commandHistory.undo()
    setContent(document.getContent())
  }, [])

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === ' ') {
      const text = (e.target as HTMLTextAreaElement).value.trim()
      if (text) {
        handleInsertWord(text)
        ;(e.target as HTMLTextAreaElement).value = ''
      }
      e.preventDefault()
    }
  }, [handleInsertWord])

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={handleUndo} disabled={!commandHistory.undo()}>
          Undo
        </button>
        <button onClick={handleDelete}>Delete Word</button>
        <div>
          Words: {document.countWords()}
          Pages: {document.countPages()}
        </div>
      </div>
      
      <div className="editor">
        <div className="preview">
          {content}
        </div>
        <textarea
          onKeyPress={handleKeyPress}
          placeholder="Type and press space to add words..."
        />
      </div>
    </div>
  )
}

export default App
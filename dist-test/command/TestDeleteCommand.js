import { Document } from "../composite/Document";
import { CommandHistory } from "../command/CommandHistory";
import { InsertCharCommand } from "../command/InsertCharCommand";
import { DeleteCommand } from "../command/DeleteCommand";
const doc = new Document();
const history = new CommandHistory();

history.executeCommand(new InsertCharCommand(doc, "H"));
history.executeCommand(new InsertCharCommand(doc, "o"));
history.executeCommand(new InsertCharCommand(doc, "l"));
history.executeCommand(new InsertCharCommand(doc, "a"));

console.log("Texto actual:", doc.getText()); 
history.executeCommand(new DeleteCommand(doc));

console.log("Después de borrar:", doc.getText()); 

history.undo();
console.log("Después de undo:", doc.getText()); 

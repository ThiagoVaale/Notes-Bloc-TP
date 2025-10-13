## 📘 Documentación de Clases y Patrones de Diseño

Este proyecto implementa un **Editor de Texto** con manejo de comandos, alineaciones dinámicas y paginación, aplicando varios **patrones de diseño** clásicos para garantizar un código escalable, mantenible y extensible.

---

### 🧩 Clases Principales y sus Responsabilidades

| Clase / Componente | Ubicación | Responsabilidad Principal | Ítem de cambio que esconde |
|--------------------|-----------|----------------------------|----------------------------|
| **Document** | `composite/Document.ts` | Representa el documento editable. Contiene el texto actual y provee operaciones para obtener cantidad de palabras, líneas y páginas. Sirve como *receptor* de los comandos. | Cambios en la estructura o formato interno del texto (manejo de palabras, líneas o páginas). |
| **CommandHistory** | `command/CommandHistory.ts` | Administra la pila de comandos ejecutados y permite realizar operaciones de **undo/redo**. Implementa la lógica de reversión de acciones del usuario. | Cambios en la gestión del historial de acciones (por ejemplo, límites de undo, persistencia, niveles múltiples). |
| **InsertCharCommand** | `command/InsertCharCommand.ts` | Encapsula la acción de insertar un carácter en el documento. Permite deshacer la inserción. | Cambios en la forma de insertar texto (soporte para pegar bloques, insertar líneas, etc.). |
| **DeleteCommand** | `command/DeleteCommand.ts` | Encapsula la acción de eliminar un carácter del documento. Permite deshacer la eliminación. | Cambios en las reglas de eliminación (por ejemplo, eliminar palabras completas o líneas enteras). |
| **ChangeAlignmentCommand** | `command/ChangeAlignmentCommand.ts` | Encapsula el cambio de alineación del texto (izquierda, centro, derecha, justificado). | Cambios en la forma de aplicar alineaciones o agregar nuevas estrategias de alineado. |
| **LeftAlign / RightAlign / CenterAlign / JustifyAlign** | `strategy/` | Estrategias que definen **cómo se alinea visualmente el texto**. Cada clase implementa el método `align()` según su estilo. | Cambios en los algoritmos de alineación visual o incorporación de nuevos estilos. |
| **Editor.tsx** | `components/Editor.tsx` | Componente principal de React. Administra el estado del documento, las acciones del usuario (input, undo, alineación, etc.) y coordina los comandos. | Cambios en la interfaz o comportamiento del usuario (atajos, eventos, integración visual). |
| **Editor.css** | `components/Editor.css` | Define el estilo visual del editor: modo oscuro, alineaciones dinámicas, paginación, y comportamiento del cursor. | Cambios en el diseño visual, disposición de componentes o adaptabilidad responsiva. |

---

### 🧠 Patrones de Diseño Utilizados

#### 1️⃣ **Command Pattern**
> Permite encapsular una operación como un objeto, separando la ejecución de la acción de quien la invoca.

- **Invoker:** `Editor.tsx`  
- **Command Interface:** (implícita en `command/` con los métodos `execute()` y `undo()`)  
- **Concrete Commands:** `InsertCharCommand`, `DeleteCommand`, `ChangeAlignmentCommand`  
- **Receiver:** `Document`  
- **Caretaker (Historial):** `CommandHistory`

✅ Gracias a este patrón se puede implementar **Ctrl + Z (undo)** sin acoplar el componente del editor a la lógica de cada acción.

---

#### 2️⃣ **Strategy Pattern**
> Define una familia de algoritmos (en este caso, alineaciones) y los intercambia dinámicamente en tiempo de ejecución.

- **Contexto:** `Editor.tsx` (que elige la estrategia de alineación activa)  
- **Estrategias Concretas:**  
  - `LeftAlign`  
  - `CenterAlign`  
  - `RightAlign`  
  - `JustifyAlign`

✅ Esto permite cambiar el comportamiento del alineado del texto sin modificar el editor, solo seleccionando una estrategia diferente.

---

#### 3️⃣ **Composite Pattern**
> Compone objetos en estructuras jerárquicas para representar relaciones parte-todo.

- **Componente raíz:** `Document`  
- **Elementos compuestos:** cada bloque o porción de texto dentro del documento.  
- Aunque en este caso no se maneja una jerarquía compleja, la clase `Document` actúa como un *composite* que agrupa texto, líneas y páginas lógicamente.

✅ Facilita futuras extensiones, como añadir secciones, párrafos o estructuras anidadas dentro del documento.

---

#### (Opcional) 4️⃣ **Memento Pattern**
> Puede considerarse que `CommandHistory` implementa parcialmente un *memento*, ya que almacena los estados previos del documento al ejecutar o deshacer acciones.

- **Originator:** `Document`  
- **Memento:** estado previo del texto almacenado dentro de cada comando  
- **Caretaker:** `CommandHistory`

---

### ⚙️ Otros Detalles de Implementación

- **Paginación:** una nueva página se genera automáticamente cuando el documento supera **10 líneas de texto**.  
- **Atajos soportados:**  
  - `Ctrl + Z` → Deshacer  
  - `Ctrl + Y` (opcional) → Rehacer  
- **Placeholder persistente:** visible hasta que se escribe contenido.  
- **Alineaciones disponibles:** izquierda, centro, derecha, justificada.  
- **Modo sin scroll:** toda la hoja y el paginador visibles en una sola vista.

---

### 📄 Resumen de Diseño

El diseño sigue un enfoque orientado a objetos clásico, pero adaptado a React + TypeScript:

- La **UI (React)** es reactiva, pero las operaciones internas del texto están modeladas siguiendo principios de diseño orientado a objetos.
- Los **patrones Command + Strategy + Composite** permiten aislar responsabilidades, mantener bajo acoplamiento y alta cohesión.
- El resultado es un editor extensible, donde agregar nuevas acciones (comandos) o comportamientos (estrategias de alineado) no requiere modificar el núcleo del componente.

---

### 🧾 Conclusión

Este proyecto logra un balance entre **arquitectura limpia y componentes React modernos**.  
Cada clase cumple un propósito único y aislado, facilitando la comprensión, el mantenimiento y la posibilidad de expansión futura.

---

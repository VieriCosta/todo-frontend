import React, { useRef, useState } from "react";

type AddPayload = {
  title: string;
  description?: string;
  color?: string;
};

interface Props {
  onAdd: (data: AddPayload) => void | Promise<void>;
}

const DEFAULT_COLOR = "#f3f4f6";

const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(DEFAULT_COLOR);

  const colorRef = useRef<HTMLInputElement | null>(null);

  const reset = () => {
    setTitle("");
    setDescription("");
    setColor(DEFAULT_COLOR);
    setIsOpen(false);
  };

  const handleSave = async () => {
    const payload: AddPayload = {
      title: title.trim(),
      description: description.trim() ? description.trim() : undefined,
      color,
    };
    if (!payload.title) return reset();
    await Promise.resolve(onAdd(payload));
    reset();
  };

  return (
    <div className={`new-todo ${isOpen ? "open" : ""}`}>
      <input
        className="new-title"
        placeholder="Add a new todo..."
        value={title}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => setTitle(e.target.value)}
      />

      {isOpen && (
        <>
          <textarea
            className="new-desc"
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="new-opts">
            <button
              type="button"
              className="color-emoji"
              title="Pick a color"
              onClick={() => colorRef.current?.click()}
            >
              🎨
            </button>

            <input
              ref={colorRef}
              type="color"
              className="color-hidden"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="color picker"
            />

            <div className="form-actions">
              <button type="button" className="btn ghost" onClick={reset}>
                Cancel
              </button>
              <button type="button" className="btn primary" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TodoForm;
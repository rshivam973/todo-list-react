import React, { useState } from 'react'

const ToDoComponent = ({todo, onToggle, onDelete, onPriorityChange}) => {

    const [editPriority, setEditPriority] = useState(false);
  const [newPriority, setNewPriority] = useState(todo.priority);

  const handlePriorityEdit = () => {
    setEditPriority(true);
  };

  const handlePriorityChange = () => {
    setEditPriority(false);
    onPriorityChange(todo.id, newPriority);
  };

  return (
    <div style={{width:'60%', margin:'0 10%', alignItems:'center'}}>
    <div className="d-flex justify-content-between align-items-center mb-3">
    <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="me-2"
          style={{ transform: "scale(1.5)"}}
        />
      <div style={{fontSize:'25px'}}>{todo.content}</div>
      <div>
      <span className="ms-2 text-muted">
          Priority: {!editPriority ? todo.priority : (
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              onBlur={handlePriorityChange}
              autoFocus
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          )}
          {!editPriority && (
            <button
              type="button"
              className="btn btn-link btn-sm ms-1"
              onClick={handlePriorityEdit}
            >
              Edit
            </button>
          )}
        </span>
      </div>
      <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
    </div>
    </div>
  )
}

export default ToDoComponent
import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onDelete, onOpenEdit, onUpdate }) {
  if (tasks.length === 0) return <p>Görev bulunamadı.</p>;

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onOpenEdit={onOpenEdit}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default TaskList;

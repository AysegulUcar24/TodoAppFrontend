import React from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import "../App.css";

const TaskItem = ({ task, onDelete, onOpenEdit, onUpdate }) => {
  const handleStatusChange = () => {
    const nextStatus =
      task.durum === "Yapılacak"
        ? "Yapılıyor"
        : task.durum === "Yapılıyor"
        ? "Tamamlandı"
        : "Yapılacak";

    onUpdate(task.id, { durum: nextStatus });
  };

  return (
    <div className={`task-item ${task.durum}`}>
      <div className="task-main">
        <h3>{task.baslik}</h3>
        <p>{task.aciklama}</p>
        <small>Durum:</small>{" "}
        <span className={`badge ${task.durum}`}>{task.durum}</span>
        {task.tags && <div className="tags">Etiketler: {task.tags}</div>}
      </div>
      <div className="task-actions-icon-only">
        <button onClick={() => onOpenEdit(task)} title="Düzenle">
          <FaEdit size={18} />
        </button>
        <button onClick={() => onDelete(task.id)} title="Sil">
          <FaTrashAlt size={18} />
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={handleStatusChange}
          style={{
            padding: "6px 12px",
            fontSize: "13px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "#f1f1f1",
            cursor: "pointer",
          }}
        >
          Durumu Değiştir
        </button>
      </div>
    </div>
  );
};

export default TaskItem;

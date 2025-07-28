import React, { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";
import {
  getAllTasks,
  createTask,
  deleteTask,
  updateTask,
} from "./com/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modalTask, setModalTask] = useState(null);
  const [deletedTask, setDeletedTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await getAllTasks();
      setTasks(data);
    } catch {
      toast.error("Görevler alınamadı!");
    }
  };

  const handleAddTask = async (task) => {
    try {
      const newTask = await createTask(task);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Görev eklendi!");
    } catch {
      toast.error("Görev eklenemedi!");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const taskToDelete = tasks.find((t) => t.id === id);
      if (!taskToDelete) return;

      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setDeletedTask(taskToDelete);

      toast.info(
        <div>
          Görev silindi!{" "}
          <button
            onClick={handleUndoDelete}
            style={{
              marginLeft: "10px",
              background: "none",
              border: "none",
              color: "#59297c",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Geri Al
          </button>
        </div>,
        { autoClose: 5000 }
      );
    } catch {
      toast.error("Görev silinemedi!");
    }
  };

  const handleUndoDelete = async () => {
    if (!deletedTask) return;
    try {
      const { id, ...taskWithoutId } = deletedTask;
      const newTask = await createTask(taskWithoutId);
      setTasks((prev) => [newTask, ...prev]);
      setDeletedTask(null);
      toast.success("Görev geri alındı!");
    } catch {
      toast.error("Geri alma başarısız!");
    }
  };

  const handleUpdateTask = async (id, updatedFields) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === id);
      if (!taskToUpdate) return;

      const updatedTask = { ...taskToUpdate, ...updatedFields };
      await updateTask(id, updatedTask);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
      toast.success("Görev güncellendi!");
    } catch {
      toast.error("Görev güncellenemedi!");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "done") return task.durum === "Tamamlandı";
    if (filter === "todo") return task.durum === "Yapılacak" || task.durum === "Yapılıyor";
    return true;
  });

  return (
    <div className="App container">
      <h1>Görev Takip Uygulaması</h1>

      <div className="filter-buttons">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          Tümü
        </button>
        <button
          onClick={() => setFilter("todo")}
          className={filter === "todo" ? "active" : ""}
        >
          Yapılacaklar
        </button>
        <button
          onClick={() => setFilter("done")}
          className={filter === "done" ? "active" : ""}
        >
          Tamamlananlar
        </button>
      </div>

      <div className="form-wrapper">
        <TaskForm onAdd={handleAddTask} />
      </div>

      <TaskList
        tasks={filteredTasks}
        onDelete={handleDeleteTask}
        onOpenEdit={setModalTask}
        onUpdate={handleUpdateTask}
      />

      {modalTask && (
        <EditModal
          task={modalTask}
          onClose={() => setModalTask(null)}
          onSave={handleUpdateTask}
        />
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;

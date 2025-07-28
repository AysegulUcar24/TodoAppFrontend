import axios from "axios";

const API_BASE_URL = "https://localhost:7252/"; // Backend URL’ini güncelle

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Görevleri getir
export const getAllTasks = async () => {
  const response = await api.get("api/taskitems");
  return response.data;
};

// Yeni görev oluştur
export const createTask = async (task) => {
  const response = await api.post("api/taskitems", task);
  return response.data;
};

// Görev güncelle
export const updateTask = async (id, updatedTask) => {
  await api.put(`api/taskitems/${id}`, updatedTask);
  return true;
};

// Görev sil
export const deleteTask = async (id) => {
  await api.delete(`api/taskitems/${id}`);
  return true;
};

export default api;

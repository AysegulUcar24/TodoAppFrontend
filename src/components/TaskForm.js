import React, { useState } from "react";
import "./TaskForm.css";

function TaskForm({ onAdd }) {
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [tags, setTags] = useState("");
  const [durum, setDurum] = useState("Yapılacak");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!baslik.trim()) return;

    onAdd({
      baslik,
      aciklama,
      durum,
      tags,
      createdAt: new Date().toISOString(),
    });

    setBaslik("");
    setAciklama("");
    setDurum("Yapılacak");
    setTags("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Görev Başlığı"
        value={baslik}
        onChange={(e) => setBaslik(e.target.value)}
      />
      <input
        type="text"
        placeholder="Açıklama"
        value={aciklama}
        onChange={(e) => setAciklama(e.target.value)}
      />
      <select value={durum} onChange={(e) => setDurum(e.target.value)}>
        <option value="Yapılacak">Yapılacak</option>
        <option value="Yapılıyor">Yapılıyor</option>
        <option value="Tamamlandı">Tamamlandı</option>
      </select>
      <input
        type="text"
        placeholder="Etiketler (virgülle ayır)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Ekle</button>
    </form>
  );
}

export default TaskForm;

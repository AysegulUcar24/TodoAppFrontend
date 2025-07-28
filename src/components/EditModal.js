import React, { useState } from "react";
import "./EditModal.css";

function EditModal({ task, onClose, onSave }) {
  const [baslik, setBaslik] = useState(task.baslik);
  const [aciklama, setAciklama] = useState(task.aciklama);
  const [durum, setDurum] = useState(task.durum);
  const [tags, setTags] = useState(task.tags || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task.id, {
      baslik,
      aciklama,
      durum,
      tags,
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Görev Güncelle</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={baslik}
            onChange={(e) => setBaslik(e.target.value)}
            placeholder="Başlık"
          />
          <textarea
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            placeholder="Açıklama"
          />
          <select value={durum} onChange={(e) => setDurum(e.target.value)}>
            <option value="Yapılacak">Yapılacak</option>
            <option value="Yapılıyor">Yapılıyor</option>
            <option value="Tamamlandı">Tamamlandı</option>
          </select>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Etiketler"
          />
          <div className="modal-buttons">
            <button type="submit">Kaydet</button>
            <button type="button" onClick={onClose}>
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;

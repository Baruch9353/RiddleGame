import { useState, useEffect } from "react";

type Riddle = {
  _id: string;
  name: string;
  taskDescription: string;
  correctAnswer: string;
};

export default function AdminRiddles() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", taskDescription: "", correctAnswer: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRiddles();
  }, []);

  const fetchRiddles = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/riddles");
      const data = await res.json();
      setRiddles(data);
    } catch {
      setError("Failed to load riddles");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startEdit = (riddle: Riddle) => {
    setEditingId(riddle._id);
    setFormData({ name: riddle.name, taskDescription: riddle.taskDescription, correctAnswer: riddle.correctAnswer });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ name: "", taskDescription: "", correctAnswer: "" });
  };

  const saveRiddle = async () => {
    if (!formData.name || !formData.taskDescription || !formData.correctAnswer) return;

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:3000/riddles/${editingId}`
        : `http://localhost:3000/riddles`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save riddle");

      await fetchRiddles();
      cancelEdit();
    } catch {
      setError("Error saving riddle");
    }
  };

  const deleteRiddle = async (id: string) => {
    if (!confirm("Are you sure you want to delete this riddle?")) return;
    try {
      const res = await fetch(`http://localhost:3000/riddles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete riddle");
      fetchRiddles();
    } catch {
      setError("Error deleting riddle");
    }
  };

  if (loading) return <p>Loading riddles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <h3>{editingId ? "Edit Riddle" : "Add New Riddle"}</h3>
        <input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Riddle Name"
        />
        <textarea
          name="taskDescription"
          value={formData.taskDescription}
          onChange={handleInputChange}
          placeholder="Task Description"
        />
        <input
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
          placeholder="Correct Answer"
        />
        <button onClick={saveRiddle}>{editingId ? "Update" : "Add"}</button>
        {editingId && <button onClick={cancelEdit}>Cancel</button>}
      </div>

      <ul>
        {riddles.map((r) => (
          <li key={r._id}>
            <strong>{r.name}</strong>
            <p>{r.taskDescription}</p>
            <p>Answer: {r.correctAnswer}</p>
            <button onClick={() => startEdit(r)}>Edit</button>
            <button onClick={() => deleteRiddle(r._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

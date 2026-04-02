import { useState, useEffect } from "react";

function TransactionForm({ onSave, editData }) {
  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.category || !form.amount) {
      alert("All fields required");
      return;
    }

    onSave({
      ...form,
      amount: Number(form.amount),
      id: editData ? editData.id : Date.now(),
    });

    setForm({ date: "", category: "", amount: "", type: "expense" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />

      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      />

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit">
        {editData ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default TransactionForm;
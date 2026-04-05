import { useState, useEffect } from "react";
import { transactionsData } from "./data";

import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Transactions from "./components/Transactions";
import Filters from "./components/Filters";
import RoleSwitch from "./components/RoleSwitch";
import TransactionForm from "./components/TransactionForm";
import Insights from "./components/Insights";

import "./App.css";

function App() {
  const [transactions, setTransactions] = useState(transactionsData);
  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");

  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const [editData, setEditData] = useState(null);

  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // Show Hide Form
  const [showForm, setShowForm] = useState(false);

  
  // Filtering
  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  // Sorting
  if (sortBy === "amount") {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "date") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  // Save Add / Edit
  const handleSave = (newTx) => {
    if (editData) {
      setTransactions(
        transactions.map((t) => (t.id === newTx.id ? newTx : t))
      );
    } else {
      setTransactions([...transactions, newTx]);
    }
    setEditData(null);
    setShowForm(false);
  };


  //  Auto open form on edit
  useEffect(() => {
  if (editData) {
    setShowForm(true);

    setTimeout(() => {
      document
        .getElementById("formSection")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }
}, [editData]);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <header className="header">
        <h1>💰 Finance Dashboard</h1>

        <div style={{ display: "flex", gap: "10px" }}>
          <RoleSwitch role={role} setRole={setRole} />

          <button className="toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      {/* Admin Button */}
      {role === "admin" && (
        <button
          className="toggle"
          onClick={() => setShowForm(!showForm)}
          style={{ margin: "10px 0" }}
        >
          {showForm ? "Close Form" : "Add Transaction"}
        </button>
      )}

      {/* Form Show/Hide */}
      {role === "admin" && showForm && (
     <div id="formSection">
       <TransactionForm onSave={handleSave} editData={editData} />
    </div>
    )}

      <SummaryCards transactions={filtered} />

      <div className="grid">
        <Charts transactions={filtered} />

        <Filters
          search={search}
          setSearch={setSearch}
          filterType={filterType}
          setFilterType={setFilterType}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      <Insights transactions={filtered} />

      <Transactions
        transactions={filtered}
        role={role}
        setTransactions={setTransactions}
        setEditData={setEditData}
      />
    </div>
  );
}

export default App;
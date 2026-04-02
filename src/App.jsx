// import { useState } from "react";
// import { transactionsData } from "./data";

// import SummaryCards from "./components/SummaryCards";
// import Charts from "./components/Charts";
// import Transactions from "./components/Transactions";
// import Filters from "./components/Filters";
// import RoleSwitch from "./components/RoleSwitch";
// import TransactionForm from "./components/TransactionForm";
// import Insights from "./components/Insights";

// import { useState } from "react";

// import "./App.css";

// function App() {
//   const [transactions, setTransactions] = useState(transactionsData);
//   const [role, setRole] = useState("viewer");
//   const [search, setSearch] = useState("");

//   // 🔥 NEW STATES
//   const [filterType, setFilterType] = useState("all");
//   const [sortBy, setSortBy] = useState("");

//   const [editData, setEditData] = useState(null);

//   // 🔥 FILTER + SEARCH + SORT LOGIC
//   let filtered = transactions.filter((t) =>
//     t.category.toLowerCase().includes(search.toLowerCase())
//   );

//   // Filter
//   if (filterType !== "all") {
//     filtered = filtered.filter((t) => t.type === filterType);
//   }

//   // Sort
//   if (sortBy === "amount") {
//     filtered = [...filtered].sort((a, b) => b.amount - a.amount);
//   }
//   if (sortBy === "date") {
//     filtered = [...filtered].sort(
//       (a, b) => new Date(b.date) - new Date(a.date)
//     );
//   }

//   // CRUD
//   const handleSave = (newTx) => {
//     if (editData) {
//       setTransactions(
//         transactions.map((t) => (t.id === newTx.id ? newTx : t))
//       );
//     } else {
//       setTransactions([...transactions, newTx]);
//     }
//     setEditData(null);
//   };

//   return (
//     <div className="app">
//       <header className="header">
//         <h1>💰 Finance Dashboard</h1>
//         <RoleSwitch role={role} setRole={setRole} />
//       </header>

//       {/* ADMIN ONLY */}
//       {role === "admin" && (
//         <TransactionForm
//           onSave={handleSave}
//           editData={editData}
//         />
//       )}

//       <SummaryCards transactions={filtered} />

//       <div className="grid">
//         <Charts transactions={filtered} />

//         <Filters
//           search={search}
//           setSearch={setSearch}
//           filterType={filterType}
//           setFilterType={setFilterType}
//           sortBy={sortBy}
//           setSortBy={setSortBy}
//         />
//       </div>

//       <Insights transactions={filtered} />

//       <Transactions
//         transactions={filtered}
//         role={role}
//         setTransactions={setTransactions}
//         setEditData={setEditData}
//       />
//     </div>
//   );
// }

// export default App;


import { useState } from "react";
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

  // 🌙 DARK MODE
  const [darkMode, setDarkMode] = useState(false);

  let filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  if (filterType !== "all") {
    filtered = filtered.filter((t) => t.type === filterType);
  }

  if (sortBy === "amount") {
    filtered = [...filtered].sort((a, b) => b.amount - a.amount);
  }

  if (sortBy === "date") {
    filtered = [...filtered].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
  }

  const handleSave = (newTx) => {
    if (editData) {
      setTransactions(
        transactions.map((t) => (t.id === newTx.id ? newTx : t))
      );
    } else {
      setTransactions([...transactions, newTx]);
    }
    setEditData(null);
  };

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

      {role === "admin" && (
        <TransactionForm onSave={handleSave} editData={editData} />
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
function SummaryCards({ transactions }) {
  const income = transactions.filter(t => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  // 3 cards
  return (
    <div className="cards">
      <div className="card">Balance: ₹{balance}</div>
      <div className="card">Income: ₹{income}</div>
      <div className="card">Expense: ₹{expense}</div>
    </div>
  );
}

export default SummaryCards;
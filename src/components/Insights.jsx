function Insights({ transactions }) {
  const expenseTx = transactions.filter(t => t.type === "expense");

  const map = {};
  expenseTx.forEach(t => {
    map[t.category] = (map[t.category] || 0) + t.amount;
  });

  let maxCat = "", maxVal = 0;

  for (let key in map) {
    if (map[key] > maxVal) {
      maxVal = map[key];
      maxCat = key;
    }
  }

  return (
    <div className="card">
      <h3>Insights</h3>
      <p>Highest spending: {maxCat}</p>
      <p>Total: ₹{maxVal}</p>
    </div>
  );
}

export default Insights;
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

function Charts({ transactions }) {

  // Category data (Pie)
  const categoryMap = {};
  transactions.forEach(t => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  const pieData = Object.keys(categoryMap).map(k => ({
    name: k,
    value: categoryMap[k]
  }));

  //  Bar data
  const barData = [
    {
      name: "Income",
      value: transactions.filter(t => t.type === "income")
        .reduce((a, b) => a + b.amount, 0),
    },
    {
      name: "Expense",
      value: transactions.filter(t => t.type === "expense")
        .reduce((a, b) => a + b.amount, 0),
    },
  ];

  // Line data  = Monthly Trend
  const monthlyMap = {};

  transactions.forEach(t => {
    const month = t.date.slice(0, 7); // YYYY-MM
    monthlyMap[month] = (monthlyMap[month] || 0) + t.amount;
  });

  const lineData = Object.keys(monthlyMap).map(m => ({
    month: m,
    amount: monthlyMap[m]
  }));

  return (
    <div className="chartBox">

      {/* PIE */}
      <div className="chart">
        <h3>Category Breakdown</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value">
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* right Bar */}
      <div className="chart">
        <h3>Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line chart */}
      
      <div className="chart">
        <h3>Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;
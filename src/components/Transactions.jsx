function Transactions({ transactions, role, setTransactions, setEditData }) {
  const deleteTx = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  if (transactions.length === 0) {
    return <p>No Transactions Found</p>;
  }

  return (
    <div className="tableBox">
      <h2>Transactions</h2>

      <div className="table">
        <div className="row head">
          <span>Date</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Type</span>
          {role === "admin" && <span>Action</span>}
        </div>

        {transactions.map((t) => (
          <div className="row" key={t.id}>
            <span>{t.date}</span>
            <span>{t.category}</span>
            <span>₹{t.amount}</span>
            <span className={t.type}>{t.type}</span>


            {/* Admin role button functionality*/}
            
            {role === "admin" && (
              <span>
                <button className="editBtn" onClick={() => setEditData(t)}>Edit</button>
                <button className="deleteBtn" onClick={() => deleteTx(t.id)}> Delete</button>
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;
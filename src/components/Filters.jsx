function Filters({
  search,
  setSearch,
  filterType,
  setFilterType,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filterBox">
      <input
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="amount">Amount</option>
      </select>
    </div>
  );
}

export default Filters;
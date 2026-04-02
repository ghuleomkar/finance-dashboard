function RoleSwitch({ role, setRole }) {
  return (
    <select value={role} onChange={(e) => setRole(e.target.value)}>
      <option value="viewer">Viewer</option>
      <option value="admin">Admin</option>
    </select>
  );
}

export default RoleSwitch;
import { useState } from "react";

function App() {
  const [income, setIncome] = useState("");
  const [jars, setJars] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/distribute.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ income }),
    });
    const data = await res.json();
    setJars(data.jars);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Personal Money Management System (6 Jars)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number" 
          placeholder="Enter your income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Distribute</button>
      </form>

      {jars && (
        <ul>
          {Object.entries(jars).map(([name, amount]) => (
            <li key={name}>
              <strong>{name}</strong>: ₱{amount.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;

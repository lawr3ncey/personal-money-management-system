import { useState, useEffect } from "react";
import "./dashboard.css";

function App() {
  const [income, setIncome] = useState("");
  const [jars, setJars] = useState(null);
  
  const [jarsFromDb, setJarsFromDb] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/distribute.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ income }),
    });
    const data = await res.json();
    setJars(data.jars);

    const incomeValue = parseFloat(e.target.income.value); // read input field value

    console.log("Distribute button clicked!"); // ✅ Check if this appears
    try {
      const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/distribute.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ income: incomeValue }),
      })
      
      console.log("Response status:", res.status);

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      console.log("Backend response:", data);

      // Example: if backend returns { jars: [...] }
      if (data.jars) setJars(data.jars);
    } 
      catch (error) {
        console.error("Error submitting:", error);
      }
  };

   // ✅ Fetch data from DB
  const fetchJarsFromDb = async () => {
    try {
      const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/get_jars.php");
      const data = await res.json();
      setJarsFromDb(data.jars || []);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Run once when app loads
  useEffect(() => {
    fetchJarsFromDb();
  }, []);

  const handleSave = async () => {
    if (!jars) return alert("No jars to save!");
    
    try {
      const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/save_jars.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jars }),
      });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
    }

    fetchJarsFromDb();
  };

  return (
    <div className="dashboard-container">
      <h1>Personal Money Management System (6 Jars)</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number" 
          placeholder="Enter your income"
          name="income"
          onChange={(e) => setIncome(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <button type="submit">Distribute</button>
      </form>

      {jars && (
        <div>
          <h3>Distributed Amounts:</h3>
        <ul>
          {Object.entries(jars).map(([name, amount]) => (
            <li key={name}>
              <strong>{name}</strong>: ₱{amount.toFixed(2)}
            </li>
          ))}
        </ul>
        <button onClick={handleSave}>Save to Database</button>
        </div>
      )}

      <div style={{ marginTop: 40 }}>
        <h3>Stored Jars from Database:</h3>
        <ul>
          {jarsFromDb.map(jar => (
            <li key={jar.id}>
              <p>Balance: ₱{Number(jar.balance).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

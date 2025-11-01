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


       // ✅ Reset distributed jars to 0 after saving
    setJars(Object.fromEntries(Object.keys(jars).map(key => [key, 0])));
    setIncome("");   // Clears the input field
    fetchJarsFromDb(); // Refresh jars from database

    
    } catch (err) {
      console.error(err);
    }

    fetchJarsFromDb();
  };

  return (
    <div>
      <div className="dashboard-container text-center d-flex">
        <h1 className="title">Personal Money Management (6 Jars)</h1>
        <form className="income-form" onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter your income"
            name="income"
            onChange={(e) => setIncome(e.target.value)}
          />
          <button type="submit">Distribute</button>
        </form>
      </div> 
      
      <div className="jars-results d-flex justify-content-center col-lg-12 gap-4 mt-5"> 
        {jars && (
          <div className="results-card glassy-card col-lg-3 text-center">
            <h3>Distributed Amounts</h3>
            <ul>
              {Object.entries(jars).map(([name, amount]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>₱{amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <button className="save-btn" onClick={handleSave}>Save to Database</button>
          </div>
        )}

        <div>
          <div className="db-card glassy-card col-lg-9 text-center">
            <h3>Stored Jars from Database</h3>
            <div className="jars-grid d-flex justify-content-center gap-4">
              {jarsFromDb.map((jar) => (
                <div key={jar.id} className="jar-card">
                  <div className="jar-image-container">
                    <img
                      src={`/images/${jar.jar_name.toLowerCase().replace(/\s+/g, '-')}.png`}
                      alt={jar.jar_name}
                      className="jar-image"
                    />
                    <div className="jar-overlay">
                      <span className="jar-amount">₱{Number(jar.amount).toFixed(2)}</span>
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

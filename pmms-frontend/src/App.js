import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./dashboard.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [modalShow, setModalShow] = useState(false);
  const [selectedJar, setSelectedJar] = useState(null);
  const [mode, setMode] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [income, setIncome] = useState("");
  const [jars, setJars] = useState(null);
  const [jarsFromDb, setJarsFromDb] = useState([]);

  const resetModalState = () => {
    setMode("");
    setAmount("");
    setReason("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!income || income <= 0) return alert("Enter a valid income!");
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

  // Calculate total balance from database jars
  const totalBalance = jarsFromDb.reduce((total, jar) => total + parseFloat(jar.amount), 0);

  const updateJarAmount = async () => {
    if (!selectedJar) return;
    if (!amount || parseFloat(amount) <= -1) return alert("Enter a valid amount!");

    const res = await fetch("http://localhost/personal-money-management-system/pmms-backend/api/update_jar.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jar_name: selectedJar.jar_name,
        amount: parseFloat(amount),
        action: mode,
        reason
      }),
    });

    const data = await res.json();
    alert(data.message);

    resetModalState();
    setModalShow(false);
    fetchJarsFromDb();
  };

  function MyJarModal({ show, onHide, jar }) {
    if (!jar) return null;

    return (
      <Modal show={show} onHide={() => { resetModalState(); onHide(); }} centered>
        <Modal.Header closeButton>
          <Modal.Title>{jar?.jar_name || "Loading..."}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center">
          {jar ? (
            <>
              <img
                src={`/images/${jar.jar_name.toLowerCase().replace(/\s+/g, '-')}.png`}
                alt={jar.jar_name}
                className="jar-image"
              />
              <h4>Amount: ₱{Number(jar.amount).toFixed(2)}</h4>
              <p>You can later add options like Edit/Add Money.</p>
            </>
          ) : (
            <p>Loading...</p>
          )}

          {mode === "" && (
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button variant="success" onClick={() => setMode("add")}>+ Add</Button>
              <Button variant="danger" onClick={() => setMode("subtract")}>- Subtract</Button>
              <Button variant="warning" onClick={() => setMode("edit")}>Edit Amount</Button>
            </div>
          )}

          {mode !== "" && (
            <div className="mt-4">
              <input
                type="number"
                step="0.01"
                className="form-control"
                placeholder={`Enter amount to ${mode}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <textarea
                className="form-control mt-2"
                placeholder="Reason (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button variant="primary" onClick={updateJarAmount}>✅ Save</Button>
                <Button variant="secondary" onClick={resetModalState}>Cancel</Button>
              </div>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => { resetModalState(); onHide(); }}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div>
      <div className="dashboard-container text-center d-flex">
        <h1 className="title">Personal Money Management (6 Jars)</h1>
        <form className="income-form" onSubmit={handleSubmit}>
          <input
            type="number"
            step="0.01" // ✅ Allow decimal numbers
            placeholder="Enter your income"
            name="income"
            value={income}
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
                <div key={jar.id} className="jar-card"
                  onClick={() => {
                    setSelectedJar(jar);
                    setModalShow(true);
                    }}
                    style={{ cursor: "pointer" }}
                  >
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
            {/* ✅ Total Balance Display */}
            <h3 className="total-balance">Total Balance</h3>
            <div className="balance-amount">₱{totalBalance.toFixed(2)}</div>
          </div>
        </div>
      </div>
        <MyJarModal 
          show={modalShow} 
          onHide={() => setModalShow(false)} 
          jar={selectedJar} 
        />
    </div>
  );
}

export default App;

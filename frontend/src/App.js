import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Pact from "./components/Pact";
import Verify from "./pages/Verify";
function App() {
  return (
    <>
      <Router>
        <div className="container">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/verify" element={<Verify />} />
            <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
            <Route path="/pact" element={<Pact />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer autoClose={2000} limit={2} />
    </>
  );
}

export default App;

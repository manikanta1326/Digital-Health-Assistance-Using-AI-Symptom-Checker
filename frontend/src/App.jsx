import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SymptomChecker from "./pages/SymptomChecker";
import History from "./pages/History";
import Chatbot from "./pages/Chatbot";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminDiseases from "./pages/AdminDiseases";

function App() {
  return (
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/checker" element={<SymptomChecker />} />
  <Route path="/history" element={<History />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/profile"  element={<Profile />}/>
  <Route  path="/admin"  element={<AdminDashboard />}/>
  <Route
  path="/admin/diseases"
  element={<AdminDiseases />}
/>

</Routes>
    </BrowserRouter>
  );
}

export default App;
import {BrowserRouter , Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage"
function App() {
  return (
<BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/user-page" element={<UserPage />} />
    </Routes>
</BrowserRouter>
  );
}

export default App;

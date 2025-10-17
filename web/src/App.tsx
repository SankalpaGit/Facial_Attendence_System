import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Enroll from "./pages/Enroll";
import Employee from "./pages/Employee";
import Details from "./pages/Detail";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public login */}
        <Route path="/" element={<Login />} />

        {/* Content Routes */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/details" element={<Details />} />

          {/* Catch-all 404 route (inside layout) */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

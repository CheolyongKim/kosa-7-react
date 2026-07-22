import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Landing from "../pages/Landing.jsx";
import Login from "../pages/LoginV2.jsx";
import Register from "../pages/Register.jsx";
import Account from "../pages/Account.jsx";
import BoardList from "../pages/BoardList.jsx";
import BoardFormV2 from "../pages/BoardFormV2.jsx";
import BoardDetailV2 from "../pages/BoardDetailV2.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Account />} />
          <Route path="/boards" element={<ProtectedRoute><BoardList /></ProtectedRoute>} />
          <Route path="/boards/write" element={<ProtectedRoute><BoardFormV2 /></ProtectedRoute>} />
          <Route path="/boards/:id" element={<ProtectedRoute><BoardDetailV2 /></ProtectedRoute>} />
          <Route path="/boards/:id/edit" element={<ProtectedRoute><BoardFormV2 /></ProtectedRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

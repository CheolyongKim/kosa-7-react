import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import BoardList from "../pages/BoardList.jsx";
import BoardForm from "../pages/BoardForm.jsx";
import BoardDetail from "../pages/BoardDetail.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boards/write" element={<BoardForm />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/boards/:id/edit" element={<BoardForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

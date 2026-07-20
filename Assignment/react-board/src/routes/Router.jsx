import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import BoardList from "../pages/BoardList.jsx";
import BoardWrite from "../pages/BoardWrite.jsx";
import BoardDetail from "../pages/BoardDetail.jsx";
import BoardUpdate from "../pages/BoardUpdate.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boards/write" element={<BoardWrite />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
          <Route path="/boards/:id/edit" element={<BoardUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

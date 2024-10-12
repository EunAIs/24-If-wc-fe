import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainPage from "./pages/MainPage";
import SearchPage from "./pages/SearchPage";
import DashBoard from "./pages/DashBoard";

function Layout() {
  return (
    <>
      <Nav />

      <Outlet></Outlet>

      <Footer></Footer>
    </>
  );
}
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path=":main" element={<MainPage />} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

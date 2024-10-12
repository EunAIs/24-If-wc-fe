import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./Nav.css";

export default function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 1) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  useEffect(() => {
    console.log(isLogin);
  }, [isLogin]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  const loginStateChange = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
    isLogin ? navigate(``) : navigate(`/main`);
  };

  return (
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="netflix logo"
        src="https://cnbl-cdn.bamgrid.com/assets/478bf74ef5ffc184e7c96808eef869a4ca967cbcc5a8db8f7e3c4005d93bbfd5/original"
        className="nav__logo"
        onClick={() => navigate(`/main`)}
      />
      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="영화 검색"
      />
      {isLogin ? (
        <img
          alt="user logged"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
          className="nav__avatar"
          onClick={loginStateChange}
        />
      ) : (
        <button className="login" onClick={loginStateChange}>
          LOGIN
        </button>
      )}
    </nav>
  );
}

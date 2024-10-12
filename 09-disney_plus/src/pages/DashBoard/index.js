import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

export default function DashBoard() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(false);
  const loginStateChange = () => {
    isLogin ? setIsLogin(false) : setIsLogin(true);
    isLogin ? navigate(``) : navigate(`/main`);
  };
  return (
    <>
      <section className="dashboard">
        <div className="innerWrap">
          <h3>
            <img
              src="https://cnbl-cdn.bamgrid.com/assets/478bf74ef5ffc184e7c96808eef869a4ca967cbcc5a8db8f7e3c4005d93bbfd5/original"
              alt=""
            />
            <br />이 모든 이야기가 여기에 지금 스트리밍 중.
          </h3>
          <button onClick={loginStateChange}>로그인</button>
          <p>
            디즈니+ 스탠다드는 월 9,900원부터, 디즈니+ 프리미엄은 월
            13,900원부터 구독 가능합니다.
            <br />
            <span>
              *월간 멤버십 12개월 구독료 대비 할인된 가격입니다. 추가 약관 적용.
            </span>
          </p>
        </div>
      </section>
    </>
  );
}

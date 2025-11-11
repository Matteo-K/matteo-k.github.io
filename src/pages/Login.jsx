import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [isRedirected, setIsRedirected] = useState(false);
  if (localStorage.getItem("isLogin") || isRedirected) {
    return <Navigate to="/" replace />;
  }

  function handleLogin() {
    localStorage.setItem("isLogin", true);
    setIsRedirected(true);
  }

  return (
    <>
      <a onClick={handleLogin}>Connection</a>
    </>
  );
}
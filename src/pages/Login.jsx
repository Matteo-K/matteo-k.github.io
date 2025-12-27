import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [time, setTime] = useState(new Date());
  const [isRedirected, setIsRedirected] = useState(false);

  const isLoggedIn = localStorage.getItem("isLogin");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isLoggedIn || isRedirected) {
    return <Navigate to="/" replace />;
  }

  function handleLogin() {
    localStorage.setItem("isLogin", "true");
    setIsRedirected(true);
  }

  return (
    <main id="login">
      <time
        dateTime={`${time
          .getHours()
          .toString()
          .padStart(2, "0")}:${time
          .getMinutes()
          .toString()
          .padStart(2, "0")}`}
      >
        {time.getHours().toString().padStart(2, "0")}:
        {time.getMinutes().toString().padStart(2, "0")}
      </time>

      <button onClick={handleLogin}>
        <img
          src="/image/matteo_kervadec.png"
          alt="Mattéo KERVADEC"
          title="Mattéo KERVADEC"
        />
        <h1>Mattéo KERVADEC</h1>
        <p>Cliquez n’importe où sur l’écran</p>
      </button>
    </main>
  );
}

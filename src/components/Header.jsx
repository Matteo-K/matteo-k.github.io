import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <header>
        <nav>
          <a href="#">Portfolio</a>
          <a href="#">Contact</a>
        </nav>

        <div>
          <a href="">
            <img src="" alt="paramètres" title="paramètres" />
          </a>
          <figure>
            <img src="" alt="Icon de Mattéo Kervadec" title="Icon de Mattéo Kervadec"/>
            <figcaption>Mattéo Kervadec</figcaption>
          </figure>
          <time datetime={time.getHours() + ":" + time.getMinutes()}>{time.getHours()}:{time.getMinutes()}</time>
        </div>
      </header>
    </>
  );
}
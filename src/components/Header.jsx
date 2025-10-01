import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

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
        {/* Navigation */}
        
        <nav>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-ps-lightGray ${isActive ? "text-ps-lightGray" : "text-ps-white"}`
            }
          >
            Portfolio
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `transition-colors duration-200 hover:text-ps-lightGray ${isActive ? "text-ps-lightGray" : "text-ps-white"}`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Profil + Heure */}
        <div>
          <figure>
            <img
              src="/image/matteo_kervadec.png"
              alt="Icon de Mattéo Kervadec"
              title="Icon de Mattéo Kervadec"
            />
            <figcaption>
              Mattéo Kervadec
            </figcaption>
          </figure>
          <time
            dateTime={`${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`}
          >
            {time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}
          </time>
        </div>
      </header>
    </>

  );
}
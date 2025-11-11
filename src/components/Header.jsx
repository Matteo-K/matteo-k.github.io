import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { BurgerMenu } from "./_partials";
import { isDragActive } from "framer-motion";

export default function Header() {
  const [time, setTime] = useState(new Date());

  const nav_about = [
    {"title": "profil", "lien": "/about"},
    {"title": "trophées", "lien": "/trophies"},
    {"title": "Déconnexion", "lien": "/logout"},
  ]
  
  const nav_home = [
    {"title": "Portfolio", "lien": "/"},
    {"title": "Contact", "lien": "/contact"},
  ]

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
          {nav_home.map((element) => {
            return (
              <NavLink
                to={element.lien}
                end
                className={({isActive}) => (
                  "nav-link " + (isActive ? "active" : "")
                )}
              >
                {element.title}
              </NavLink>
            )
          })}
        </nav>

        {/* Profil + Heure */}
        <div>
          <BurgerMenu type="profile" data={nav_about} title="Mattéo Kervadec">
            <img
              className="profil-icon"
              src="/image/matteo_kervadec.png"
              alt="Icon de Mattéo Kervadec"
              title="Icon de Mattéo Kervadec"
            />
          </BurgerMenu>
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
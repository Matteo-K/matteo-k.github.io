import { NavLink } from "react-router-dom";

export default function Description() {
  return (
    <section className="block description">
      <div>
        <div className="title">
          <h2>Bienvenue</h2>
          <h3>
            Salut, je suis <strong>Mattéo KERVADEC</strong>
          </h3>
        </div>

        <div className="content">
          <p className="subtitle">
            Développeur web en alternance chez <a href="https://www.e-declic.com" target="_blank" rel="noopener noreferrer">e-declic</a>,  
            passionné par le back-end et le développement logiciel.
          </p>

          <p className="citation">
            Ce portfolio s’inspire de l’univers PS5. Son interface m’a marqué dès le premier regard par son effet "WoW" et son design immersif.
          </p>
        </div>

        <NavLink
          to="/aboutme/presentation"
          end
          className="nav-link"
        >
          En savoir plus sur moi
        </NavLink>
      </div>
    </section>
  );
}

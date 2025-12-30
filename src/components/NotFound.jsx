import { NavLink } from "react-router-dom";

export default function NotFound() {
  return (
    <main id="e404">
      <h1 className="glitch">404</h1>
      <p>Oups… cette page n’existe pas</p>

      <NavLink to="/" end className="cta shine">
        Retour à l'accueil
      </NavLink>
    </main>
  );
}

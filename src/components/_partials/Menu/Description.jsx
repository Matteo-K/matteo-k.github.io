import { NavLink } from "react-router-dom";

export default function Description() {
  return (
    <section className="block description">
      <div className="title">
        <h2>Bienvenu</h2>
      </div>
      <div className='content'>
        <p></p>
        <ul>
          <li>TEST</li>
          <li>OK</li>
          <li>OJ2</li>
        </ul>
      </div>
      <NavLink
        to={"/aboutme/presentation"}
        end
        className={({isActive}) => (
          "nav-link " + (isActive ? "active" : "")
        )}
      >
        En savoir +
      </NavLink>
    </section>
  );
}
import { Page } from "../components/_partials";
import { NavLink } from "react-router-dom";

function About(props) {

  const nav_home = [
    {"title": "Présentation", "lien": "presentation"},
    {"title": "Projets", "lien": "projects"},
    {"title": "Collaborateurs", "lien": "collaborators"},
  ]

  return (
    <Page>
      <div id="aboutme">
        <header>
          <figure>
            <img src="/image/matteo_kervadec.png" alt="Mattéo Kervadec" title="Mattéo Kervadec"/>
            <figcaption>
              <h1>Mattéo Kervadec</h1>
              <div>
                <p>Etudiant en 3è année de BUT Informatique à Lannion</p>
                <p>Développeur web chez <a href="https://www.e-declic.com" target="_blank" rel="noreferrer">e-declic</a></p>
              </div>
            </figcaption>
          </figure>
        </header>
        <nav>
          {nav_home.map((element) => {
            return (
              <NavLink
                to={"/aboutme/" + element.lien}
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
        {props.children}
      </div>
    </Page>
  );
}

export default About;

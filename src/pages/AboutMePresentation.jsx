import About from "./About";
import { Trophies, RecentProject, MostProjectCollaborator } from "../components/_partials/Menu"

function AboutMePresentation() {
  return (
    <About>
      <main id="aboutme-presentation">
        <div>
          <Trophies total="true" className="aboutme">Trophées obtenues :</Trophies>
          <RecentProject className="aboutme"></RecentProject>
          <MostProjectCollaborator classNale="aboutme"></MostProjectCollaborator>
        </div>

        <div>
          <h3>A propos de</h3>
          <div className="block">
          </div>
        </div>

        <div>
          <h3>Info en plus</h3>
          <div className="block"></div>
        </div>

      </main>
    </About>
  );
}

export default AboutMePresentation;

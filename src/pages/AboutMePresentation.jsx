import About from "./About";
import { Trophies, RecentProject, MostProjectCollaborator } from "../components/_partials/Menu"

function AboutMePresentation() {
  return (
    <About>
      <main id="aboutme-presentation">
        <div>
          <Trophies type="profil" className="aboutme">Trophées obtenues :</Trophies>
          <RecentProject className="aboutme"></RecentProject>
          <MostProjectCollaborator classNale="aboutme"></MostProjectCollaborator>
        </div>

        <div>
          <h3>A propos de moi</h3>
          <div className="block">
            <p>
              Bonjour, je suis <strong>Mattéo KERVADEC.</strong>
            </p>
            <p>
              Je suis en 3<sup>e</sup> année de <strong>BUT Informatique</strong> à l'<strong>IUT de Lannion</strong>. <br />
              Je réalise mon alternance au sein de l'entreprise <strong>e-declic</strong> à Auray dans Morbihan. <br />
              Chez e-declic, je réalise des <strong>solutions web métier</strong> pour des professionnels.
            </p>
            <p>
              Passionné par le <strong>jeu vidéo</strong> et l'<strong>analyse cinématographique</strong> dans le jeu vidéo. <br />
              Je cherche à allier mes compétences techiniques à ma créativité dans ce domaine.
            </p>
            <p>
              Après l'optention de mon BUT, j'envisage de poursuivre en <strong>Master</strong> ou en <strong>école d'ingénieur</strong> <br />
              pour <strong>approfondir mes connaissances</strong> et <strong>élargir perspectives</strong> professionnelles.
            </p>
            <p>
              Basé dans le Morbihan, en Bretagne, je suis motivé par les projets innovants et les challenges techniques qui me permettent d'apprendre et de progresser constamment.
            </p>
          </div>
        </div>
      </main>
    </About>
  );
}

export default AboutMePresentation;

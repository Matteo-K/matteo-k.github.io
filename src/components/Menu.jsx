import { Description, Collaborator, Stat, Galerie, Trophies } from './_partials/Menu';
import { Tag } from './_partials/'

export default function Menu () {
  return (
    <div id="home-menu">
      {/* Badge */}
      <div>
        <div className="tags">
          <Tag>Développeur web chez <strong>e-declic</strong></Tag>
          <Tag>Étudiant en 3ème année à <strong>IUT Lannion</strong></Tag>
        </div>
      </div>

      {/* Liste de section */}
      <div>
        <Description></Description>
        <Collaborator></Collaborator>
        <Stat></Stat>
        <Galerie></Galerie>
        <Trophies type="menu">Trophées</Trophies>
      </div>
    </div>
  )
}
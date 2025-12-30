import { Description, Collaborator, Stat, Galerie, Trophies } from './_partials/Menu';

export default function Menu () {
  return (
    <div id="home-menu">
      {/* Badge */}
      <div>
        <div className="tags">
          je suis un tag
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
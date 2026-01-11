import { Trophies } from "./Menu";
import { NavLink } from "react-router-dom";

export default function HeadTrophyPage(props) {
  const project = props.project;
  return (
    <>
      <div className="linkBack">
        <NavLink
          to="/"
          end
        >
          Retour au Portfolio
        </NavLink>
      </div>
      <header className="headerTrophyPage">
        <div>
          <img src={"/image/uploads/images/project/card/" + project.illustrationCardName}
            alt={project.title}
            title={project.title}
          />
          <h1>{project.title}</h1>
        </div>
        <Trophies type="summary" project={project}></Trophies>
      </header>
    </>
  );
}
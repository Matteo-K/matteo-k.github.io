import About from "./About";
import { useData } from '../hooks/useData';
import { DataStatut } from '../enums/DataStatut';
import { RoadType } from '../enums/RoadType';

import { NavLink } from "react-router-dom";
import { ProgessBar } from "../components/_partials";

function AboutMeProject() {
  const { isLoading, error, getProjects } = useData();
  const projects = !isLoading && !error ? getProjects({
    where: { statut: DataStatut.ACTIF },
    order: { priority: 1}
  }) : [];
  return (
    <About>
      <main id="aboutme-project">
        {!isLoading && !error && (
          <ul>
            {projects.map((project) => {
              const activeRoads = project.trophyRoads
                .filter(road => road.statut === DataStatut.ACTIF);

              // Tous les trophées actifs
              const activeTrophies = activeRoads.flatMap(road =>
                road.trophies.filter(
                  trophy => trophy.statut === DataStatut.ACTIF
                )
              );

              const totalTrophies = activeTrophies.length;

              const accomplishedTrophies = activeTrophies.filter(
                trophy => trophy.accomplished === true
              ).length;

              // Platinium (MAIN) accompli ?
              const platiniumAccomplished = activeRoads
                .filter(road => road.type === RoadType.MAIN)
                .some(road =>
                  road.trophies.some(
                    trophy =>
                      trophy.statut === DataStatut.ACTIF &&
                      trophy.accomplished === true
                  )
                );

              return (
                <li className="border-hover">
                  <NavLink
                    to={"/project/trophy/" + project.title}
                    end
                  >
                    <figure>
                      <img src={"/image/uploads/images/project/card/" + project.illustrationCardName}
                        alt={project.title}
                        title={project.title}
                      />
                      <figcaption>
                        <h3>{project.title}</h3>
                        <div>Nombre de contributeurs : {project.collaborators.length}</div>
                      </figcaption>
                    </figure>
                    <div>
                      <img src={platiniumAccomplished 
                          ? "/image/icons/trophy/platinium.svg"
                          : "/image/icons/trophy.svg"
                        } 
                        alt={platiniumAccomplished 
                          ? "Trophée de platine obtenu" 
                          : "Trophée de platine non-obtenu"
                        }
                        title={platiniumAccomplished 
                          ? "Trophée de platine obtenu" 
                          : "Trophée de platine non-obtenu"
                        }
                      />
                      <div>
                        <div>{totalTrophies !== 0 ? parseInt((accomplishedTrophies/totalTrophies) * 100) : 0}%</div>
                        <ProgessBar value={totalTrophies !== 0 ? (accomplishedTrophies/totalTrophies) * 100 : 0}></ProgessBar>
                      </div>
                      <div><strong>{accomplishedTrophies} / {totalTrophies}</strong></div>
                    </div>
                  </NavLink>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </About>
  );
}

export default AboutMeProject;

import parse from 'html-react-parser';
import { RoadType } from '../../enums/RoadType';

function Details(props) {
  const project = props.project;
  const trophyRoads = project.trophyRoads;

  const road = trophyRoads.find((element) => {
    return element.type === RoadType.MAIN;
  }) ?? null;

  return (
    <>
      <div>

        {/* Bloc gauche - titre + lien */}
        <div>
          <figure>
            <img src={"/image/uploads/images/project/title/" + project.illustrationTitleName} 
              alt={project.title} title={project.title} />
            <figcaption>
              {project.summary}
            </figcaption>
          </figure>
          <div>
            {/* Web */}
            {project.web && 
              <a href={project.web}
                target="_blank" rel="noreferrer"
              > 
                Visiter le site
              </a>
            }

            {/* Code source */}
            {project.github && 
              <a href={project.github}
                target="_blank" rel="noreferrer"
              > 
                Code source
              </a>
            }

          </div>
        </div>

        {/* Bloc droit - activité + skills */}
        <div>
          <div>News</div>
          <div>Compétences</div>
        </div>
      </div>

      {/* Description */}
      <div>
        {project.description ? parse(project.description) : null}
      </div>

      {/* Collaborateurs */}
      {project.collaborators.length > 0 &&
        <section>
          <h2>Collaborateurs</h2>
          {project.collaborators.map(collaborateur => (
            <div
              key={collaborateur.id}
              style={
                collaborateur.illustrationName
                  ? {
                      backgroundImage: `url(/image/uploads/images/collaborator/illustration/${collaborateur.illustrationName})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}
              }
            >
              <p>{collaborateur.surname} {collaborateur.name}</p>
            </div>
          ))}
        </section>
      }

      {/* Trophy */}
      {road != null &&
        <section>
          <h2>Trophées</h2>
          {road.trophies.map(trophy => (
            <div
              key={trophy.id}
              style={
                trophy.illustrationName
                  ? {
                      backgroundImage: `url(/image/uploads/images/collaborator/illustration/${trophy.illustrationName})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {}
              }
            >
              <p>{trophy.name}</p>
            </div>
          ))}
        </section>
      }
    </>
  );
}

export default Details;
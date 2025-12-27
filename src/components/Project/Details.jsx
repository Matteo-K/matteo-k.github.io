import parse from 'html-react-parser';
import Trophies from './Trophies';
import Collaborators from './Collaborators';

export default function Details(props) {
  const project = props.project;

  return (
    <div className='detailsProject'>
      <div>

        {/* Bloc gauche - titre + lien */}
        <div>
          <figure>
            {project.illustrationTitleName 
              ? (
                <img src={"/image/uploads/images/project/title/" + project.illustrationTitleName} 
                  alt={project.title} title={project.title} />
              ) 
              : (
                <h1>{project.title}</h1>
              )
            }

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
      <div className='description block'>
        {project.description ? parse(project.description) : null}
      </div>

      <Collaborators project={project}></Collaborators>
      <Trophies project={project}></Trophies>
    </div>
  );
}
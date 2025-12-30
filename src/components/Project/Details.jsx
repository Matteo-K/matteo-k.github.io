import parse from 'html-react-parser';
import Trophies from './Trophies';
import Collaborators from './Collaborators';
import Skill from './Skill';

export default function Details(props) {
  const project = props.project;
  const date = new Date(project.date);
  const month = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre"
  ]

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
        </div>

        {/* Bloc droit - activité + skills */}
        <div>
          {/* <div>News</div> */}
        </div>
      </div>

      <div className='line-link'>
        <section className='action'>
          {/* Web */}
          {project.web && 
            <a href={project.web}
              target="_blank" rel="noreferrer"
              className='button-external-link border-hover'
            > 
              Visiter le site
            </a>
          }

          {/* Code source */}
          {project.github && 
            <a href={project.github}
              target="_blank" rel="noreferrer"
              className='button-external-link border-hover'
            > 
              Code source
            </a>
          }

        </section>

        <time dateTime={month[date.getMonth()] + " " + date.getFullYear()} className='block'>
          {month[date.getMonth()] + " " + date.getFullYear()}
        </time>
      </div>

      {/* Description */}
      <section className='info'>
        <Skill project={project}></Skill>
        <div className='block description'>
          {project.description ? parse(project.description) : null}
        </div>
      </section>

      {/* <Collaborators project={project}></Collaborators> */}
      <Trophies project={project}></Trophies>
    </div>
  );
}
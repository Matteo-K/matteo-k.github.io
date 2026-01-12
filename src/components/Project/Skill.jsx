import { DataStatut } from '../../enums/DataStatut';

export default function Skill(props) {
  const project = props.project;
  const skills = project.projectTechnologies;

  return (
    <section className='block skill'>
      <div className='title'>
        <h2>Technologie{skills.length > 1 ? "s": ""}</h2>
      </div>

      <div className='content'>
        {/* Skill */}
        {skills.filter((skill) => skill.statut === DataStatut.ACTIF)
          .sort((skill1, skill2) => skill1.pourcentage_using < skill2.pourcentage_using)
          .map((skill) => (
          <figure>
            <img src={"/image/uploads/images/technology/" + skill.technologie.illustrationName} 
              alt={skill.technologie.name}
              title={skill.technologie.name}
              className="icon-bg-white"
            />
            <figcaption>
              <div>{skill.technologie.name}</div>
              <div>{skill.pourcentage_using}%</div>
            </figcaption>
          </figure>
        ))}
      </div>

    </section>
  );
}
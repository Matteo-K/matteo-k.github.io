import { useNavigate } from "react-router-dom";

export default function Projects(props) {
  const config = props.config;
  const navigate = useNavigate();
  const project = props.project;

  return (
    <section className={"trophies border-hover " + props.config.className}
      onClick={() => navigate(config.navigation)}
    >
      <figure className="title">
        <img src={"/image/uploads/images/project/card/" + project.illustrationCardName}
          alt={project.title}
          title={project.title}
        />
        <figcaption>
          <div>{project.title}</div>
          {project.summary && (
            <div>{project.summary}</div>
          )}
        </figcaption>
      </figure>
      <div className='content'>
        {config.showTotal ?? (
          <span>
            Total :&nbsp;
            {Object.entries(props.trophies).reduce(
              (accumulator, [,currentValue]) => accumulator + currentValue.count,
              0
            )}
          </span>
        )}
        {Object.entries(props.trophies).map(([key, trophy]) => (
          <figure key={key}>
            <img 
              src={`/image/icons/trophy/${trophy.img}`} 
              alt={trophy.alt}
              title={trophy.alt}
            />
            <figcaption>{trophy.count}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
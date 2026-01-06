import { useNavigate } from "react-router-dom";
import TrophyTypeImg from "../../../image/TrophyTypeImg";

export default function Road(props) {
  const config = props.config;
  const navigate = useNavigate();
  const road = props.road;

  return (
    <section className={"trophies border border-hover " + props.config.className}
      onClick={() => navigate(config.navigation)}
    >
      <div className="title">
        <h2>{road.name}</h2>
      </div>
      {/* <img src={"/image/uploads/images/project/card/" + project.illustrationCardName}
        alt={project.title}
        title={project.title}
      /> */}
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
            <TrophyTypeImg type={trophy.type}>{trophy.alt}</TrophyTypeImg>
            <figcaption>{trophy.count}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
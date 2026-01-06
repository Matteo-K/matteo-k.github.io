import { useNavigate } from "react-router-dom";
import TrophyTypeImg from "../../../image/TrophyTypeImg";

export default function Profil(props) {
  const navigate = useNavigate();
  const config = props.config;
  return (
    <section
      className={props.className + " block trophies border-hover"}
      onClick={() => navigate(config.navigation)}
    >
      <div className={"title " + config.className}>
        <div>
          {props.type === "menu" &&
          (
            <img 
              src="/image/icons/trophy.svg"
              alt="Trophée"
              title="Trophée"
            />
          )}
          <h2>{ props.children ? props.children : "Trophies"}</h2>
        </div>
        {config.showTotal && (
          <span>
            Total :&nbsp;
            {Object.entries(props.trophies).reduce(
              (accumulator, [,currentValue]) => accumulator + currentValue.count,
              0
            )}
          </span>
        )}
      </div>
      <div className='content'>
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
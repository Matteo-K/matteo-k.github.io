import TrophyTypeImg from "../image/TrophyTypeImg"
import parse from 'html-react-parser';

export default function DetailsTrophy(props) {
  const trophy = props.trophy;
  return (
    <section className={`trophies details ${trophy.type}`}>
      <div className="title">
        <TrophyTypeImg type={trophy.type}>Icon de trophée</TrophyTypeImg>
        <h2>{trophy.name}</h2>
      </div>
      <div className="content">
        {trophy.description ? parse(trophy.description) : null}
      </div>

    </section>
  );
}
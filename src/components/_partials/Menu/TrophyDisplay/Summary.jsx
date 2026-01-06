import TrophyTypeImg from "../../../image/TrophyTypeImg";

export default function Summary(props) {
  const config = props.config;
  return (
    <section className={"trophies " + config.className}>
      {config.showTotal && (
        <span>
          Total :&nbsp;
          {Object.entries(props.trophies).reduce(
            (accumulator, [,currentValue]) => accumulator + currentValue.count,
            0
          )}
        </span>
      )}
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
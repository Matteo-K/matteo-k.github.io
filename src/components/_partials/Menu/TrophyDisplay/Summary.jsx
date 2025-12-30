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
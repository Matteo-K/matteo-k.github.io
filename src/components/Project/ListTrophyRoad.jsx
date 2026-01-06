import DetailsTrophy from "./DetailsTrophy";

export default function ListTrophyRoad(props) {
  const road = props.road ?? null;
  return (
    <>
      <div>
        <p>Tous les trophées : {road?.trophies.length ?? 0}</p>
      </div>
      {road?.trophies.sort((trophy1, trophy2) => trophy1.priority > trophy2.priority)
        .map((trophy) => (
          <DetailsTrophy trophy={trophy}></DetailsTrophy>
        ))
      }
    </>
  );
}
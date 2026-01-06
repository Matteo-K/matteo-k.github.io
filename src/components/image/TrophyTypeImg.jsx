import { TrophyType } from '../../enums/TrophyType';

export default function TrophyTypeImg(props) {
  const type = props.type;

  const DEFAULT_TYPE = {
    [TrophyType.PLATINUM]: {img:"platinium.svg", alt:"Trophée en platine"},
    [TrophyType.GOLD]: {img:"gold.svg", alt:"Trophée en or"},
    [TrophyType.SILVER]: {img:"silver.svg", alt:"Trophée en argent"},
    [TrophyType.BRONZE]: {img:"bronze.svg", alt:"Trophée de bronse"},
  }

  const img = DEFAULT_TYPE[type].img ?? DEFAULT_TYPE[TrophyType.BRONZE].img

  return (
    <img 
      src={`/image/icons/trophy/${img}`}
      alt={props.children}
      title={props.children}
    />
  );
}
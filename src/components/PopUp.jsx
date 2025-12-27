import { useState } from "react"

/**
 * Fenètre modale
 * @param {*} props paramètre
 * - src : lien de l'image
 * - title : Intitulé de l'image
 * - count : Nombre en valeur
 */
export default function PopUp(props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="popup">
      <button onClick={() => setOpen(!open)} className="border-hover">
        <img
          src={props.src}
          alt={props.title}
          title={props.title}
        />
        {props.count > 0 && (
          <div className="forward">
            {props.count > 9 ? "+9" : props.count}
          </div>
        )}
      </button>
      <div className={open ? "open" : ""}>
        {props.children}
      </div>
    </div>
  );
}
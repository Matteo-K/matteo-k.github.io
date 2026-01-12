import { ProjectObjective } from "../../enums/ProjectObjective";
import { NavLink } from "react-router-dom";
import parse from 'html-react-parser';

export default function CompanyDetails({ company, type }) {

  const img_path = type === ProjectObjective.COMPANY
    ? "society"
    : "school"
  ;
  return (
    <div className="company-details">
      <figure>
        <img
          src={`/image/uploads/images/${img_path}/${company.logoName}`}
          alt={company.name}
          className="icon-bg-white"
        />
        <figcaption>
          <NavLink to={company.link_web} target="_blank">
            {company.name}
          </NavLink>
        </figcaption>
      </figure>
      <p>
        {parse(company.description)}
      </p>
    </div>
  )
}
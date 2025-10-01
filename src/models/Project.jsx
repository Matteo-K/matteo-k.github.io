import { Model, fk, many, attr } from 'redux-orm';

class Project extends Model {
  toString() {
    return `Project: ${this.title}`;
  }
}

Project.modelName = 'Project';

Project.fields = {
  id: attr(),
  statut: attr(),
  title: attr(),
  summary: attr(),
  description: attr(),
  projectTechnologies: many('ProjectTechnology'),
  objective: attr(),
  society: fk('Society'),
  school: fk('School'),
  illustrationCardName: attr(),
  illustrationBackgroundName: attr(),
  illustrationTitleName: attr(),
  date: attr(),
  web: attr(),
  github: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  collaborators: many('Collaborator'),
  trophyRoads: many('TrophyRoad'),
  priority: attr()
};

export default Project;
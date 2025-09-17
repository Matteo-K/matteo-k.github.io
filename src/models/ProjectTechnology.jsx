import { Model, fk, attr } from 'redux-orm';

class ProjectTechnology extends Model {
  toString() {
    return `ProjectTechnology: ${this.id}`;
  }
}

ProjectTechnology.modelName = 'ProjectTechnology';

ProjectTechnology.fields = {
  id: attr(),
  statut: attr(),
  project: fk('Project'),
  technologie: fk('Technology'),
  pourcentage_using: attr(),
  createdAt: attr(),
  updatedAt: attr(),
};

export default ProjectTechnology;
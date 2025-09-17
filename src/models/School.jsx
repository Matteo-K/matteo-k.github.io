import { Model, many, attr } from 'redux-orm';

class School extends Model {
  toString() {
    return `School: ${this.name}`;
  }
}

School.modelName = 'School';

School.fields = {
  id: attr(),
  statut: attr(),
  name: attr(),
  link_web: attr(),
  description: attr(),
  projects: many('Project'),
  logoName: attr(),
  createdAt: attr(),
  updatedAt: attr(),
};

export default School;
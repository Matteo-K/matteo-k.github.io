import { Model, many, attr } from 'redux-orm';

class Society extends Model {
  toString() {
    return `Society: ${this.name}`;
  }
}

Society.modelName = 'Society';

Society.fields = {
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

export default Society;
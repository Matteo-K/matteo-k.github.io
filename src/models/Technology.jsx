import { Model, attr } from 'redux-orm';

class Technology extends Model {
  toString() {
    return `Technology: ${this.name}`;
  }
}

Technology.modelName = 'Technology';

Technology.fields = {
  id: attr(),
  statut: attr(),
  name: attr(),
  illustrationName: attr(),
  date: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  priority: attr(),
};

export default Technology;
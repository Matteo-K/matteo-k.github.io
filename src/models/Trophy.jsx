import { Model, fk, attr } from 'redux-orm';

class Trophy extends Model {
  toString() {
    return `Trophy: ${this.name}`;
  }
}

Trophy.modelName = 'Trophy';

Trophy.fields = {
  id: attr(),
  statut: attr(),
  type: attr(),
  name: attr(),
  description: attr(),
  illustrationName: attr(),
  accomplished: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  trophyRoad: fk('TrophyRoad'),
  priority: attr()
};

export default Trophy;
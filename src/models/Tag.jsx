import { Model, many, attr } from 'redux-orm';

class Tag extends Model {
  toString() {
    return `Tag: ${this.label}`;
  }
}

Tag.modelName = 'Tag';

Tag.fields = {
  id: attr(),
  label: attr(),
  completeLabel: attr(),
  createdAt: attr(),
  updatedAt: attr(),
  projects: many('Project'),
};

export default Tag;
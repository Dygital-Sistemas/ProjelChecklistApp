import {Realm} from '@realm/react';

export const TaskSchema = {
  name: 'Task',
  primaryKey: '_id',
  properties: {
    _id: 'uuid',
    content: 'string',
    done: {type: 'bool', default: false},
  },
};

export interface Task {
  _id?: Realm.BSON.UUID;
  content: string;

  done?: boolean;
}

export const TaskRepository = {
  create: (dto: Task): Task => {
    return {
      _id: new Realm.BSON.UUID(),
      ...dto,
    };
  },
};

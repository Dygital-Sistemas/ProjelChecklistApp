import {createRealmContext} from '@realm/react';
import {TaskSchema} from './tasks';

const RealmContext = createRealmContext({
  schema: [TaskSchema],
  deleteRealmIfMigrationNeeded: true,
  schemaVersion: 0,
});

export const {RealmProvider, useObject, useQuery, useRealm} = RealmContext;

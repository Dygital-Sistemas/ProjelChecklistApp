import { Configuration } from 'realm';
import { ChecklistSchema } from './schemas/checklist';
import { UserSchema } from './schemas/user';

export const realmConfig: Configuration = {
  schema: [UserSchema, ChecklistSchema],
  deleteRealmIfMigrationNeeded: true,
  schemaVersion: 0,
};

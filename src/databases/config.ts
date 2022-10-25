import { Configuration } from 'realm';
import { ChecklistSchema } from './schemas/checklist';
import { UserSchema } from './schemas/user';
import { VehicleSchema } from './schemas/vehicle';

export const realmConfig: Configuration = {
  schema: [UserSchema, ChecklistSchema, VehicleSchema],
  deleteRealmIfMigrationNeeded: true,
  schemaVersion: 0,
};

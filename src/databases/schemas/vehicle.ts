import { ObjectSchema } from 'realm';

export const VehicleSchema: ObjectSchema = {
  name: 'Vehicle',
  primaryKey: 'id',
  properties: {
    id: 'int',
    model: 'string',
    plate: 'string',
    updated_at: 'string',
    tag: 'string',
  },
};

export interface Vehicle {
  id: number;
  model: string;
  updated_at: string;
  plate: string;
  tag: string;
}

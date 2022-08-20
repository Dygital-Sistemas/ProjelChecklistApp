import { ObjectSchema } from 'realm';

export const ChecklistSchema: ObjectSchema = {
  name: 'Checklist',
  properties: {
    id: 'string',
    date: 'date',
    closed: { type: 'bool', default: false },
    brakes: { type: 'string', default: 'C' },
    headlamps: { type: 'string', default: 'C' },
    fireExtinguisher: { type: 'string', default: 'C' },
  },
  primaryKey: 'id',
};

export type OptionCommonAnswer = 'C' | 'N' | 'NA';

export interface Checklist {
  id: string;
  date: Date;
  closed?: boolean;
  brakes?: OptionCommonAnswer;
  headlamps?: OptionCommonAnswer;
  fireExtinguisher?: OptionCommonAnswer;
}

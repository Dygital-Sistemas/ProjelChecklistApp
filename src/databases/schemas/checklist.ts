import { ObjectSchema } from 'realm';

export const ChecklistSchema: ObjectSchema = {
  name: 'Checklist',
  properties: {
    id: 'string',
    date: 'date',
    isClosed: { type: 'bool', default: false },

    startOdometer: { type: 'string', default: '0' },
    endOdometer: { type: 'string', default: '0' },
    fuelLevel: { type: 'string', default: '0' },

    brakes: { type: 'string', default: 'C' },
    fireExtinguisher: { type: 'string', default: 'C' },
    headlightFlashlight: { type: 'string', default: 'C' },
    securityBelt: { type: 'string', default: 'C' },
    totalyOperation: { type: 'string', default: 'C' },
    windshieldCrack: { type: 'string', default: 'C' },
    preventiveMaintenanceTerm: { type: 'string', default: 'C' },
    waterLevel: { type: 'string', default: 'C' },
    oilLevel: { type: 'string', default: 'C' },
    fixedPlates: { type: 'string', default: 'C' },
    logoFixation: { type: 'string', default: 'C' },
    horn: { type: 'string', default: 'C' },
    communicationRadio: { type: 'string', default: 'C' },
    tireTools: { type: 'string', default: 'C' },
    spareTire: { type: 'string', default: 'C' },
    reverseAlarm: { type: 'string', default: 'C' },
    carFlag: { type: 'string', default: 'C' },
    carFlagLights: { type: 'string', default: 'C' },
    wheelChocks: { type: 'string', default: 'C' },
    trafficLights: { type: 'string', default: 'C' },

    blowouts: { type: 'string', default: '0' },
    maximumSpeed: { type: 'string', default: '0' },
    tireChange: { type: 'bool', default: false },
    frontBreakdowns: 'string[]',
    backBreakdowns: 'string[]',
    leftBreakdowns: 'string[]',
    rightBreakdowns: 'string[]',
    topBreakdowns: 'string[]',

    observations: 'string?',
  },
  primaryKey: 'id',
};

export type OptionCommonAnswer = 'C' | 'N' | 'NA';

export interface Checklist {
  id: string;
  date: Date;
  isClosed?: boolean;
  startOdometer?: string;
  endOdometer?: string;
  fuelLevel?: string;
  brakes?: OptionCommonAnswer;
  fireExtinguisher?: OptionCommonAnswer;
  headlightFlashlight?: OptionCommonAnswer;
  securityBelt?: OptionCommonAnswer;
  totalyOperation?: OptionCommonAnswer;
  windshieldCrack?: OptionCommonAnswer;
  preventiveMaintenanceTerm?: OptionCommonAnswer;
  waterLevel?: OptionCommonAnswer;
  oilLevel?: OptionCommonAnswer;
  fixedPlates?: OptionCommonAnswer;
  logoFixation?: OptionCommonAnswer;
  horn?: OptionCommonAnswer;
  communicationRadio?: OptionCommonAnswer;
  tireTools?: OptionCommonAnswer;
  spareTire?: OptionCommonAnswer;
  reverseAlarm?: OptionCommonAnswer;
  carFlag?: OptionCommonAnswer;
  carFlagLights?: OptionCommonAnswer;
  wheelChocks?: OptionCommonAnswer;
  trafficLights?: OptionCommonAnswer;
  blowouts?: string;
  maximumSpeed?: string;
  tireChange?: boolean;
  frontBreakdowns?: string[];
  backBreakdowns?: string[];
  leftBreakdowns?: string[];
  rightBreakdowns?: string[];
  topBreakdowns?: string[];
  observations?: string;
}

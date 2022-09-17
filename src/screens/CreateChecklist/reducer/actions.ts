import { Checklist, OptionCommonAnswer } from '../../../databases/schemas';
import { Action, ActionType } from './types';

const createAction = <T>(type: ActionType) => {
  return (value: T): Action => {
    return {
      type,
      value,
    };
  };
};

export const update = createAction<Partial<Checklist>>('UPDATE');

import { OptionCommonAnswer } from '../../../databases/schemas';
import { Action, ActionType } from './types';

const createAction = <T>(type: ActionType) => {
  return (value: T): Action => {
    return {
      type,
      value,
    };
  };
};

export const changeClosed = createAction<boolean>('CHANGE_CLOSED');
export const changeBrakes = createAction<OptionCommonAnswer>('CHANGE_BRAKES');
export const changeDate = createAction<Date>('CHANGE_DATE');

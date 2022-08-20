export type ActionType = 'CHANGE_DATE' | 'CHANGE_CLOSED' | 'CHANGE_BRAKES';

export interface Action {
  type: ActionType;
  value: any;
}

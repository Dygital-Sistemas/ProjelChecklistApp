import { Reducer, useReducer } from 'react';
import { Checklist } from '../../../databases/schemas';
import { Action } from './types';

const reducer: Reducer<Checklist, Action> = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, ...action.value };
    case 'CHANGE_CLOSED':
      return { ...state, isClosed: action.value };
    case 'CHANGE_BRAKES':
      return { ...state, brakes: action.value };
    case 'CHANGE_DATE':
      return { ...state, date: action.value };
  }
};

export const useChecklistStore = (initialState: Checklist) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    state,
    dispatch,
  };
};

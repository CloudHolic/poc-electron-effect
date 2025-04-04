import type {Union} from './union';

export const STATE = {
  None: 'None',
  Success: 'Success',
  Fail: 'Fail'
};

export type State = Union<typeof STATE>;

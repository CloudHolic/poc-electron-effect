export type RequestId = string;

export type Command = {
  requestId: RequestId;
  stateCode?: number; // 200, 401, ...
  state: State;
  param: any;
}
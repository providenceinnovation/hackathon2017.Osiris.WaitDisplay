/** TodoMVC model definitions **/

declare interface WaitTimeData {
  waitTime?: string;
}

declare interface TodoItemData {
  id?: TodoItemId;
  text?: string;
  completed?: boolean;
}

declare type TodoItemId = number;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type TodoStoreState = TodoItemData[];

declare type WaitTimeStoreState = WaitTimeData;

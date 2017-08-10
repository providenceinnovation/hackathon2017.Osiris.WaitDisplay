/** TodoMVC model definitions **/

declare interface TodoItemData {
  id?: TodoItemId;
  text?: string;
  completed?: boolean;
}

declare type TodoItemId = number;

declare type TodoFilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

declare type TodoStoreState = TodoItemData[];

declare type RealTimeServiceType = 'WAIT_TIME' | 'waitTime' | 'numberOfBeds' | 'acceptingNow';

// export const WAIT_TIME: RealTimeServiceType = 'waitTime';
// export const NUMBER_OF_BEDS: RealTimeServiceType = 'numberOfBeds';
// export const ACCEPTING_NOW: RealTimeServiceType = 'acceptingNow';
// export const ACCEPTED_INSURANCE: RealTimeServiceType = 'acceptedInsurance';
// export const NUMBER_OF_DENTAL_APPTS: RealTimeServiceType = 'numberDentalAppointments';
// export const NUMBER_OF_NEBULIZERS: RealTimeServiceType = 'numberOfNebulizers';


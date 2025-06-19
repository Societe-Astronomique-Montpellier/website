type Nullable<T> = T | null;
type DateValue = Date | string;

export interface ISamEvent {
  id: string;
  uid: string;
  title: string;
  start: Nullable<DateValue>;
  end?: Nullable<DateValue>;
  description?: Nullable<string>;
  location?: Nullable<string>;
  access_type?: Nullable<string>;
  access_type_txt?: Nullable<string>;
}

export interface IListSamEvents {
  events?: Array<ISamEvent> | null;
}

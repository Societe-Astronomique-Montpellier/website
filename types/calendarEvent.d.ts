type Nullable<T> = T | undefined | null;

interface ISamEvent {
  id: string;
  uid: string;
  title: string;
  start: string;
  end?: Nullable<string>;
  description?: Nullable<string>;
  location?: Nullable<string>;
}

interface IListSamEvents {
  events: Nullable<Array<ISamEvent>>;
}

export { ISamEvent, IListSamEvents };

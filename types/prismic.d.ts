type Nullable<T> = T | undefined | null;

export interface IPrismicDocument {
  id: string;
  uid: Nullable<string>;
  type: string;
  data: any;
}

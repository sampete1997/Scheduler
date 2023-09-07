export interface iGuest {
  userId: string;
  email: string;
}
export interface iEvent {
  title: string;
  agenda: string;
  guests: Array<iGuest>;
  createdBy: string;
  hostName: string;
  date: string;
  time: string;
  timezone?: string;
}

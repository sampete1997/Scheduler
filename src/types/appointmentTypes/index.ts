import { ObjectId } from "mongoose";
import { iTimeRange } from "../userTypes";

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
  eventTime: iTimeRange ;
  timezone?: string;
}

export interface iEventFilter {
  id?: ObjectId | string;
  createdBy?: string;
  date?: string;
  eventTime?: { start?: string; end?: string };
}

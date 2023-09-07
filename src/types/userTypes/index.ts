import { ObjectId } from "mongoose";

export type iTimeRange = { start: string; end: string };
export type iUnavailability = Array<iTimeRange>;
export interface iMeetingData {
  eventTime: iTimeRange;
  eventId: string | ObjectId;
}

export interface iMeetings {
  [key: string]: Array<iMeetingData>;
}
export interface iUserRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  unavailability: iUnavailability;
  meetings: iMeetings;
}

export interface iUserFilter {
  email?: string | null;
  firstName?: string | null;
}
export interface iUserUpdate {
  firstName?: string;
  lastName?: string;
  unavailability?: iUnavailability;
  meetings?: iMeetings;
}

export interface iPassword {
  password?: string;
}

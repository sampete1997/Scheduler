import { Request, Response, NextFunction } from "express";
import { createEvent, findAllEvents, isGuestAvailable } from "./functions";
import {
  iMeetingData,
  iSingleUserData,
  iTimeRange,
  iUserRegister,
} from "../../types/userTypes";
import { findUserById } from "../users/functions";
import { iEventFilter } from "../../types/appointmentTypes";

export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const userDetails = body;

    const result = await createEvent(userDetails);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const checkGuestAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const id = body.id;
    let eventDate = body?.eventDate;
    eventDate = eventDate.split("T")[0];
    const startTime = body.startTime;
    const endTime = body.endTime;
    if (id && eventDate && startTime && endTime) {
      const guestDetails: any = await findUserById(id);
      let clientSchedule: Array<iTimeRange> = guestDetails?.unavailability;

      //Note: guestDetails?.meetings.get(eventDate)  meetings is an Map dataStructure   
      const scheduledEventTimes: Array<iTimeRange> = guestDetails?.meetings
        .get(eventDate)
        .events?.map(({ eventTime }: iMeetingData) => eventTime);
      clientSchedule = [...clientSchedule, ...scheduledEventTimes];
      console.log('cl',clientSchedule);
      const result = isGuestAvailable(
        startTime,
        endTime,
        eventDate,
        clientSchedule
      );

      console.log("result client available", result);
      return res.status(200).json(result);
    }

    return res.status(402).json({ message: "Incorrect payload received" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: iEventFilter = {};
    const query: any = req.query;
    // extra filters

    if (query?.id) filter.id = query?.id;
    if (query?.date) filter.date = query?.date;
    if (query?.createdBy) filter.createdBy = query?.createdBy;
    if (query?.start) {
      filter.eventTime = { start: query.start };
    }
    if (query?.end) {
      filter.eventTime = { end: query.end };
    }

    const result = await findAllEvents(filter);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

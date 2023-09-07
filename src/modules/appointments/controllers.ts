import { Request, Response, NextFunction } from "express";
import { createEvent, isGuestAvailable } from "./functions";
import { iMeetingData, iTimeRange } from "../../types/userTypes";
import { findUserById } from "../users/functions";

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
    const eventDate = body.eventDate;
    const startTime = body.startTime;
    const endTime = body.endTime;
    if (id && eventDate && startTime && endTime) {
      const guestDetails: any = await findUserById(id);
      let clientSchedule: Array<iTimeRange> = guestDetails?.unavailability;
      const scheduledEventTimes: Array<iTimeRange> = guestDetails?.meetings[
        eventDate
      ]?.map(({ eventTime }: iMeetingData) => eventTime);
      clientSchedule = [...clientSchedule, ...scheduledEventTimes];

      const result = isGuestAvailable(
        startTime,
        endTime,
        eventDate,
        clientSchedule
      );

      console.log("result client available", result);
      return res.status(200).json({ availability: result });
    }

    return res.status(402).json({ message: "Incorrect payload received" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

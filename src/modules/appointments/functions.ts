import { dbCollections } from "../../models";
import { ObjectId } from "mongoose";
import { iEvent, iEventFilter } from "../../types/appointmentTypes";
import { iTimeRange } from "../../types/userTypes";

export const createEvent = async (eventData: iEvent) => {
  try {
    const Appointments = new dbCollections.Appointments(eventData);
    const eventDetails = (await Appointments.save()).toObject();

    console.log("Event created ", eventDetails);
    return eventDetails;
  } catch (err) {
    console.error("Error eventCreation:", err);
    throw err;
  }
};

export const isGuestAvailable = (
  startTime: string,
  endTime: string,
  eventDate: string,
  clientSchedule: Array<iTimeRange>
) => {
  console.log("dateeeee", eventDate);
  const requestedStart = new Date(`${eventDate}T${startTime}:00`);
  const requestedEnd = new Date(`${eventDate}T${endTime}:00`);
  for (const slot of clientSchedule) {
    const bookedStart = new Date(`${eventDate}T${slot.start}:00`);
    const bookedEnd = new Date(`${eventDate}T${slot.end}:00`);

    if (
      (requestedStart >= bookedStart && requestedStart < bookedEnd) ||
      (requestedEnd > bookedStart && requestedEnd <= bookedEnd) ||
      (requestedStart <= bookedStart && requestedEnd >= bookedEnd)
    ) {
      // There is an overlap, so the client is not available
      console.log("already booked at slot", slot);
      return { availability: false, bookedSlot: slot };
    }
  }
  // No overlap found, the client is available
  return { availability: true };
};

export const findAllEvents = async (filter: any) => {
  try {
    const result = await dbCollections.Appointments.find(filter);
    console.log("All events", result);
    return result;
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
};

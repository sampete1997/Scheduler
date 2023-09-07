import { dbCollections } from "../../models";
import { ObjectId } from "mongoose";
import { iEvent } from "../../types/appointmentTypes";
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
): boolean => {
  const [day, month, year] = eventDate.split("-");
  const formatedDate = `${year}-${month}-${day}`;
  const requestedStart = new Date(`${formatedDate}T${startTime}:00`);
  const requestedEnd = new Date(`${formatedDate}T${endTime}:00`);
  for (const slot of clientSchedule) {
    const bookedStart = new Date(`${formatedDate}T${slot.start}:00`);
    const bookedEnd = new Date(`${formatedDate}T${slot.end}:00`);

    if (
      (requestedStart >= bookedStart && requestedStart < bookedEnd) ||
      (requestedEnd > bookedStart && requestedEnd <= bookedEnd) ||
      (requestedStart <= bookedStart && requestedEnd >= bookedEnd)
    ) {
      // There is an overlap, so the client is not available
      return false;
    }
  }
  // No overlap found, the client is available
  return true;
};

//       const result = await dbCollections.User.findOne({ _id: id }, "-password");
//       console.log("user by Id", result);
//       return result?.toObject() || null;
//     } catch (err) {
//       console.error("error:", err);
//       throw err;
//     }
//   };

//   export const updateUserById = async (
//     id: ObjectId | string,
//     dataToUpdate: iUserUpdate | iPassword
//   ) => {
//     try {
//       const result = await dbCollections.User.findByIdAndUpdate(
//         id,
//         dataToUpdate,
//         { new: true }
//       );

//       return result?.toObject();
//     } catch (err) {
//       console.error("error:", err);
//       throw err;
//     }
//   };

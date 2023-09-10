// user.model.ts
import mongoose from "mongoose";

const eventTimeSchema = new mongoose.Schema(
  {
    start: String,
    end: String,
  },
  {
    _id: false,
  }
);

const eventItemSchema = new mongoose.Schema(
  {
    eventTime: eventTimeSchema,
    eventId: String,
  },
  {
    _id: false,
  }
);

const meetingDateSchema = new mongoose.Schema(
  {
    eventDate: Date,
    events: [eventItemSchema],
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Store the hashed password
  unavailability: [eventTimeSchema],
  meetings: {
    type: Map,
    of: meetingDateSchema,
  },
  eventDate: Date,
});

const User = mongoose.model("User", userSchema);

export default User;

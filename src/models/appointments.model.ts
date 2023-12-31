import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  title: String,
  agenda: String,
  guests: Array,
  hostName: String,
  createdBy: String, 
  date: String,
  eventTime: Object,
  timezone: String,
});

const Appointments = mongoose.model('appointments', appointmentSchema);

export default Appointments;
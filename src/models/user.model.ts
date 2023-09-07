// user.model.ts
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String, // Store the hashed password 
  unavailability: Array,
  meetings: Object,
});

const User = mongoose.model('User', userSchema);

export default User;

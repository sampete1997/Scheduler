import { Router } from "express";
import userRoutes from './modules/users/routes'
import appointmentsRoutes from './modules/appointments/routes'
const allRoutes = Router();

allRoutes.use('/users',userRoutes);
allRoutes.use('/appointments',appointmentsRoutes);

export default allRoutes;
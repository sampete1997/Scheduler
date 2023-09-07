import { Router } from "express";
import * as validators from "./validators";
import * as controllers from "./controllers";
import errorValidator from "../../middleware/ErrorValidator";
import isLoggedIn from "../../middleware/authorization/isLoggedIn";

const router: Router = Router();
router.use(isLoggedIn);
router.post('/createEvent',validators.createMeeting,errorValidator,controllers.createAppointment)
router.post('/availability',validators.guestAvailability,errorValidator,controllers.checkGuestAvailability)



export default router;
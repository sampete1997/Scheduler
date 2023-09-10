import { Router } from "express";
import * as validators from "./validators";
import * as controllers from "./controllers";
import errorValidator from "../../middleware/ErrorValidator";
import isLoggedIn from "../../middleware/authorization/isLoggedIn";
import { findAllUpcomingEvent } from "./functions";

const router: Router = Router();

router
  .route("/register")
  .post(validators.create, errorValidator, controllers.registerUser);
router
  .route("/login")
  .post(validators.login, errorValidator, controllers.userLogin);
router.route("/").get(isLoggedIn,validators.users, errorValidator, controllers.getUsers);
router
  .route("/user/:id")
  .get(isLoggedIn,validators.userById, errorValidator, controllers.getSingleUser);
router
  .route("/user/update")
  .put(isLoggedIn,validators.updateUser, errorValidator, controllers.updateUserDetails);
router
  .route("/user/updatePassword")
  .put(
    isLoggedIn,
    validators.validPassword,
    errorValidator,
    controllers.updateUserPassword
  );

  router.route("/upcomingEvents").get(isLoggedIn,validators.userByIdQuery,errorValidator,controllers.getUpcomingEvents);

export default router;

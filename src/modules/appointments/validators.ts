import { body, query, param } from "express-validator";

const timeFormat = (value: string) => {
  const timeFormatPattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  if (timeFormatPattern.test(value)) {
    return true;
  }
  throw new Error("invalid time received");
};

export const createMeeting = [
  body("title").notEmpty().withMessage("title is mandatory").toLowerCase(),
  body("agenda").toLowerCase().optional(),
  body("guests").isArray(),
  body("hostName")
    .notEmpty()
    .withMessage("hostName is mandatory")
    .toLowerCase(),
  body("createdBy")
    .notEmpty()
    .withMessage("createdBy is mandatory")
    .toLowerCase(),
  body("date").notEmpty().withMessage("date is mandatory").toLowerCase(),
  body("eventTime")
    .isObject()
    .withMessage("time payload is invalid or empthy")
    .custom((value) => {
      if (Object.keys(value)?.length === 2) {
        return true;
      }
      throw new Error("time field must have a length  2");
    }),
  body("timeZone").optional().toLowerCase(),
];

export const guestAvailability = [
  body("id")
    .notEmpty()
    .withMessage("id is mandatory")
    .toLowerCase()
    .isString()
    .withMessage("Must string")
    .isLength({ min: 24, max: 24 })
    .withMessage("id should be valid of 24 characters"),
  body("startTime")
    .notEmpty()
    .withMessage("startTime is mandatory")
    .isLength({ min: 5, max: 5 })
    .withMessage("invalid startTime received")
    .custom(timeFormat)
    .toLowerCase(),
  body("endTime")
    .notEmpty()
    .withMessage("endTime is mandatory")
    .isLength({ min: 5, max: 5 })
    .withMessage("invalid endTime received")
    .custom(timeFormat)
    .toLowerCase(),
  body("eventDate")
    .notEmpty()
    .withMessage("eventDate is mandatory")
    .toLowerCase(),
];

export const getEvents = [
  query("id")
    .notEmpty()
    .withMessage("id is mandatory")
    .toLowerCase()
    .isString()
    .withMessage("Must string")
    .isLength({ min: 24, max: 24 })
    .withMessage("id should be valid of 24 characters")
    .optional(),
  query("start")
    .isLength({ min: 5, max: 5 })
    .withMessage("invalid startTime received")
    .custom(timeFormat)
    .toLowerCase()
    .optional(),
  query("end")
    .isLength({ min: 5, max: 5 })
    .withMessage("invalid endTime received")
    .custom(timeFormat)
    .toLowerCase()
    .optional(),
  query("createdBy")
    .isEmail()
    .withMessage("invalid email as createdBy")
    .toLowerCase()
    .optional(),
  query("date")
    .isString()
    .withMessage("invalid date received")
    .toLowerCase()
    .optional(),
];

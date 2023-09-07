import { body, query, param } from "express-validator";

const strongPasswordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const create = [
  body("firstName")
    .notEmpty()
    .withMessage("firstName is mandatory")
    .toLowerCase(),
  body("lastName").toLowerCase(),
  body("email")
    .notEmpty()
    .withMessage("email is mandatory")
    .isEmail()
    .toLowerCase()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password is mandatory")
    .matches(strongPasswordRegex)
    .withMessage(
      "Password must be strong (at least 8 characters, including uppercase, lowercase, digit, and special character)."
    ),
];

export const login = [
  body("email")
    .notEmpty()
    .withMessage("email is mandatory")
    .isEmail()
    .toLowerCase()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("password is mandatory")
    .isLength({ min: 6 })
    .withMessage("minimum 6 character required"),
];

export const users = [
  query("email")
    .optional()
    .isEmail()
    .toLowerCase()
    .withMessage("Invalid email"),
  query("firstName")
    .optional()
    .toLowerCase()
    .isString()
    .withMessage("Must string"),
];

export const userById = [
  param("id")
    .notEmpty()
    .withMessage("id is mandatory")
    .toLowerCase()
    .isString()
    .withMessage("Must string")
    .isLength({ min: 24, max: 24 })
    .withMessage("Id should be valid of 24 characters"),
];

export const updateUser = [
  body("id")
    .notEmpty()
    .withMessage("id is mandatory")
    .toLowerCase()
    .isString()
    .withMessage("Must string")
    .isLength({ min: 24, max: 24 })
    .withMessage("Id should be valid of 24 characters"),
  body("unavailability")
    .custom((value) => {
      if (Array.isArray(value) && value.length > 0) {
        return true;
      }
      throw new Error("unavailability field must have a length greater than 0");
    })
    .optional(),
  body("firstName").toLowerCase().isString().optional(),
  body("lastName").toLowerCase().isString().optional(),
  body("meetings")
    .custom((value) => {
      if (Object.keys(value)?.length > 0) {
        return true;
      }
      throw new Error("meetings field must have a length greater than 0");
    })
    .optional(),
];

export const validPassword = [
  body("password")
    .notEmpty()
    .withMessage("password is mandatory")
    .matches(strongPasswordRegex)
    .withMessage(
      "Password must be strong (at least 8 characters, including uppercase, lowercase, digit, and special character)."
    ),
];

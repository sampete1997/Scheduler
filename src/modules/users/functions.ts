import {
  iPassword,
  iSingleUserData,
  iUserFilter,
  iUserRegister,
  iUserUpdate,
} from "../../types/userTypes";
import { dbCollections } from "../../models";
import bcrypt from "bcrypt";
import { encryptString } from "../../utils/encreption";
import mongoose, { ObjectId } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import ErrorHandler from "../../utils/ErrorHandler";

export const createUser = async (userDetails: iUserRegister) => {
  try {
    console.log("payload", userDetails);
    userDetails.password = await encryptString(userDetails.password);
    const User = new dbCollections.User(userDetails);
    const registeredUser = (await User.save()).toObject();

    delete registeredUser.password;
    console.log("user register", registeredUser);
    return registeredUser;
  } catch (err) {
    console.error("Error registering user:", err);
    throw err;
  }
};

export const valiateUserExist = async (userEmailId: string) => {
  try {
    const result = await dbCollections.User.findOne({ email: userEmailId });
    console.log("user exist", result);
    return result?.toObject();
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
};

export const createTokens = (
  userDetail: any
): { access: string; refresh: string } => {
  const { accessSecret, refreshSecret, accessValidity, refreshValidity } =
    process.env;
  if (refreshSecret && accessSecret) {
    const refresh = jwt.sign(userDetail, refreshSecret, {
      expiresIn: refreshValidity,
    });
    const access = jwt.sign(userDetail, accessSecret, {
      expiresIn: accessValidity,
    });
    return { refresh, access };
  } else {
    throw new ErrorHandler("Internal server error!", 500);
  }
};

export const findAllUsers = async (filter: iUserFilter) => {
  try {
    const result = await dbCollections.User.find(filter, "-password");
    console.log("All user", result);
    return result;
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
};

export const findUserById = async (id: ObjectId | null | string): Promise<iSingleUserData | any> => {
  try {
    const result = await dbCollections.User.findOne({ _id: id }, "-password");
    console.log("user by Id", result);
    return result?.toObject();
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
};

export const updateUserById = async (
  id: ObjectId | string,
  dataToUpdate: iUserUpdate | iPassword
) => {
  try {
    const result = await dbCollections.User.findByIdAndUpdate(
      id,
      dataToUpdate,
      { new: true }
    );

    return result?.toObject();
  } catch (err) {
    console.error("error:", err);
    throw err;
  }
};

export const findAllUpcomingEvent = async (filter: { id: any }) => {
  try {
    const todayDate = new Date().toISOString().split("T")[0];
    const result = await dbCollections.User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(filter.id),
        },
      },
      {
        $project: {
          _id: 0,
          meetings: {
            $objectToArray: "$meetings",
          },
        },
      },
      {
        $unwind: "$meetings",
      },
      {
        $match: {
          "meetings.v.eventDate": { $gte: new Date(todayDate) },
        },
      },
      {
        $group: {
          _id: null,
          meetings: { $push: "$meetings" },
        },
      },
      {
        $project: {
          _id: 0,
          meetings: 1,
        },
      },
    ]).exec();

    return result;
  } catch (err) {
    return err;
  }
};

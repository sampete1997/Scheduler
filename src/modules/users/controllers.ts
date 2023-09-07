import { Request, Response, NextFunction } from "express";
import {
  createTokens,
  createUser,
  findAllUsers,
  findUserById,
  updateUserById,
  valiateUserExist,
} from "./functions";
import { encryptString, matchEncryptedString } from "../../utils/encreption";
import {
  iTimeRange,
  iUserFilter,
  iUserRegister,
  iUserUpdate,
} from "../../types/userTypes";
import { ObjectId } from "mongoose";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const userResult = await valiateUserExist(body.email);
    if (userResult) {
      return res
        .status(200)
        .json({ message: "User with this email already exists" });
    } else {
      const userDetails: iUserRegister = {
        ...body,
        unavailablity: [],
        meetings: {},
      };
      const userDetail = await createUser(userDetails);
      const accessToken = createTokens(userDetail);

      return res.status(200).json({ userDetail, ...accessToken });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req.body;
    const userResult = await valiateUserExist(body.email);
    if (userResult) {
      const isValidCred = await matchEncryptedString(
        body.password,
        userResult?.password
      );
      if (isValidCred) {
        const userDetail = { ...userResult };
        delete userDetail.password;

        const accessToken = createTokens(userDetail);

        return res.status(200).json({ userDetail, ...accessToken });
      }
      return res.status(401).json("Incorrect Password!");
    } else {
      return res.status(401).json({ error: "Email Id not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filter: iUserFilter = {};
    const query: any = req.query;
    // extra filters
    if (query?.email) filter.email = query?.email || null;
    if (query?.firstName) filter.firstName = query?.firstName || null;

    const result = await findAllUsers(filter);
    return res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const params: any = req.params;
    const id: ObjectId | null | string = params?.id || null;
    const result = await findUserById(id);
    console.log("user result", result);

    if (result) res.status(200).json(result);
    return res.status(200).json({ message: `User not found with id:${id}` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const updateUserDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: any = req.body;
    const dataToUpdate: iUserUpdate = {};

    if (body?.firstName) dataToUpdate.firstName = body.firstName;
    if (body?.lastName) dataToUpdate.lastName = body.lastName;
    let redFlag = false;
    if (body?.unavailability) {
      body?.unavailability?.forEach((ele: iTimeRange) => {
        if (
          !ele.start ||
          !ele.end ||
          typeof ele.start !== "string" ||
          typeof ele.end !== "string"
        ) {
          redFlag = true;
        }
      });
      if (redFlag) {
        return res.status(404).json({
          message: `Incorrect payload in unavailability`,
        });
      }
      dataToUpdate.unavailability = body.unavailability;
    }
    if (body?.meetings) {
      dataToUpdate.meetings = body.meetings;
    }

    const id: ObjectId | string = body.id;

    const result = await updateUserById(id, dataToUpdate);
    console.log("update", result);
    delete result?.password;
    if (result) {
      return res.status(200).json(result);
    }
    return res.status(404).json({ message: `User not found with id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

export const updateUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: any = req.body;
    const id: ObjectId | string = body.id;
    const hashedPassword = await encryptString(body.password);
    const result = await updateUserById(id, { password: hashedPassword });
    console.log("update", result);
    if (result) {
      return res.status(200).json({ Message: "Password updated successfully" });
    }
    return res.status(404).json({ message: `User not found with id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
};

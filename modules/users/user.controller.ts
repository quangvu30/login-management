import { SignUpDto } from "./dto/signup.dto";
import * as bcrypt from "bcryptjs";
import UserModel from "./user.model";
import { LoginDto } from "./dto/login.dto";
import { Role, TokenType } from "@/constant/enum";
import * as _ from "lodash";
import { createLoginHistory } from "../loginHistory/loginHistory.controller";
import { UpdateUserDto } from "./dto/updateUser.dto";
import { createToken, disableToken, getToken } from "../token/token.controller";
import { ChangePasswordDto } from "./dto/changePass.dto";
import { sendMail } from "@/utils/mailer";

export const createUser = async (newUser: SignUpDto) => {
  const { name, email, password, birthday } = newUser;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    birthday,
    role: Role.User,
    active: false,
  });

  const token = await createToken(user, TokenType.Verify);
  user.token = token._id;
  await user.save();

  // generate link
  const linkVerify = "http://localhost:3000/auth/" + token.token;
  const urlMail = await sendMail(user.email, linkVerify);
  console.log({ urlMail });
  return user;
};

export const login = async (user: LoginDto) => {
  const u = await UserModel.findOne({ email: user.email });
  if (!u || !u.active) {
    return new Error("User not found");
  }
  const isPasswordMatched = await bcrypt.compare(user.password, u.password);
  if (!isPasswordMatched) {
    return new Error("Invalid email or password");
  }

  await createLoginHistory(user.ip, u);
  return u;
};

export const getUser = async (email: string) => {
  const u = await UserModel.findOne({ email }).select({
    email: 1,
    name: 2,
    birthday: 3,
    role: 4,
  });
  if (u) {
    return u;
  }
  return new Error("User not found");
};

export const getAllUser = async () => {
  const allUsers = await UserModel.find().select({
    email: 1,
    name: 2,
    birthday: 3,
    role: 4,
  });
  return allUsers;
};

export const activeAccout = async (tokenString: string) => {
  const token = await getToken(tokenString);
  if (_.isError(token)) {
    return token;
  }

  const u = await UserModel.findOne(token.user);
  if (_.isNull(u)) {
    return new Error("Your token is not correct");
  }
  if (u.active) {
    return new Error("Your account is activated");
  }
  u.active = true;
  await u.save();
  token.active = false;
  await token.save();
  return u;
};

export const updateUser = async (user: UpdateUserDto) => {
  const u = await UserModel.findOne({ email: user.email });
  if (_.isNull(u)) {
    return new Error("User not found");
  }

  u.name = user.name;
  u.birthday = user.birthday;
  await u.save();
  return u;
};

// execute when click reset password
export const resetPassword = async (email: string) => {
  const u = await UserModel.findOne({ email });
  if (_.isNull(u)) {
    return new Error("User not found");
  }

  if (!u.active) {
    return new Error("User is not actived !");
  }

  const token = await createToken(u, TokenType.Reset);
  u.token = token._id;
  await u.save();

  const linkVerify = "http://localhost:3000/auth/changePassword" + token.token;
  const urlMail = await sendMail(u.email, linkVerify);
  console.log({ urlMail });
  return u;
};

// execute when input new password
export const changePassword = async (changePassDto: ChangePasswordDto) => {
  const token = await getToken(changePassDto.token);
  if (_.isError(token)) {
    return token;
  }

  const u = await UserModel.findOne({ token });
  if (_.isNull(u)) {
    return new Error("Your token is not correct");
  }

  const hashedPassword = await bcrypt.hash(changePassDto.newPassword, 10);
  u.password = hashedPassword;

  await u.save();

  token.active = false;
  await token.save();
  return u;
};

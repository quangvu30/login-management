import { get, post, patch } from "./api_helper";

import * as url from "./url_helper";

export const postRegister =async (data:any) => {
  return await post(url.POST_REGISTER, data)
}

export const postVerifyEmail = async (data: any) => {
  return await post(url.POST_VERIFY_EMAIL, data)
}

export const patchChangePassword = async (data: any) => {
  return await patch(url.PATCH_CHANGE_PASSWORD, data)
}
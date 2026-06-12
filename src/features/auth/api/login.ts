import { apiClient } from "@/services/api-client";

import {
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";

export const login = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response =
    await apiClient.post<LoginResponse>(
      "/auth/login",
      payload,
    );


  return response.data;
};
import { apiDelete } from "@/apis/api";

export interface DeleteAccountResponse {
  success: boolean;
  message: string;
  data: null;
}

export const deleteAccount = () =>
  apiDelete<DeleteAccountResponse>("/users/delete");

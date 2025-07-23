import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES_CHANNEL } from "./constants";

export async function getMessagesChannels(id: string) {
  try {
    const response = await apiClient.get(GET_MESSAGES_CHANNEL + id);

    return response.data;
  } catch (error) {
    return error;
  }
}

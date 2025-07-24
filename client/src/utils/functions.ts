import { apiClient } from "@/lib/api-client";
import { GET_MESSAGES_CHANNEL, JOIN_CHANNEL } from "./constants";

export async function getMessagesChannels(id: string) {
  try {
    const response = await apiClient.get(GET_MESSAGES_CHANNEL + id);

    return response.data;
  } catch (error) {
    return error;
  }
}

export async function joinChannel(channelId: string, newMemberId: string) {
  try {
    if (!newMemberId) throw Error("New member id is required");
    if (!channelId) throw Error("channel id is required");

    const response = await apiClient.post(JOIN_CHANNEL, {
      channelId,
      newMemberId,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}

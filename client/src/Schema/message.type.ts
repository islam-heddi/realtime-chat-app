export type messageType = {
  _id?: string | null | undefined;
  isSeened: boolean;
  receiverId?: string | null | undefined;
  emiterId?: string | null | undefined;
  createdAt?: Date | string | null | undefined;
  content?: string | null | undefined;
};

export type chatSchema = {
  _id?: string;
  senderId?: string;
  receiverId?: string;
  name?: string | null;
  email?: string | null;
};

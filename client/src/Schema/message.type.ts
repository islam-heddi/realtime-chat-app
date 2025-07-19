export type messageType = {
  isSeened: boolean;
  receiverId?: string | null | undefined;
  emiterId?: string | null | undefined;
  createdAt?: Date | null | undefined;
  content?: string | null | undefined;
};

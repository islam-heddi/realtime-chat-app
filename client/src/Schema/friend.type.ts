export type friendSchema = {
  createdAt: string;
  friendId: string;
  status: "pending" | "accepted" | "rejected";
  updatedAt: string;
  userId: string;
  _id: string;
  friendEmail: string;
  friendName: string;
};

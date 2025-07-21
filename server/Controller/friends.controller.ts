import type { Request, Response } from "express";
import { User } from "../Model/Users.model";
import Friend from "../Model/Friend.model";

export const sendFriendRequest = async (req: Request, res: Response) => {
  const id = req.user;
  const { friendId } = req.body;
  try {
    const user = await User.findById(id?.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).send("Friend not found");
    }

    const existingRequest = await Friend.findOne({
      userId: user._id,
      friendId: friend._id,
    });

    if (existingRequest) {
      return res.status(200).send(existingRequest);
    }

    const result = await Friend.create({
      userId: user._id,
      friendId: friend._id,
      status: "pending",
    });
    return res.status(201).send(result);
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};

export const applyRequest = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  try {
    const existingRequest = await Friend.findOne({
      _id: id,
    });

    if (!existingRequest) {
      return res.status(404).send("Friend request not found");
    }

    if (status !== "accepted" && status !== "rejected") {
      return res.status(400).send("Invalid status");
    }

    const result = await Friend.updateOne(
      { _id: existingRequest?._id },
      { status }
    );

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};

export const applyFriendRequest = async (req: Request, res: Response) => {
  const id = req.user;
  const { friendId, status } = req.body;
  try {
    const user = await User.findById(id?.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(404).send("Friend not found");
    }

    const existingRequest = await Friend.findOne({
      userId: user._id,
      friendId: friend._id,
    });

    if (!existingRequest) {
      return res.status(404).send("Friend request not found");
    }

    if (status !== "accepted" && status !== "rejected") {
      return res.status(400).send("Invalid status");
    }

    const result = await Friend.updateOne(
      { _id: existingRequest?._id },
      { status }
    );

    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};

export const getFriendsRequests = async (req: Request, res: Response) => {
  const id = req.user;
  try {
    const user = await User.findById(id?.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const requests = await Friend.find({
      userId: user._id,
    });

    const myRequests = await Promise.all(
      requests.map(async (request) => {
        const friend = await User.findById(request.friendId);
        return {
          ...request.toObject(),
          friendName: friend?.name,
          friendEmail: friend?.email,
          userName: user.name,
          userEmail: user.email,
        };
      })
    );

    const FriendRequest = await Friend.find({
      friendId: user._id,
    });

    const myFriendsRequests = await Promise.all(
      FriendRequest.map(async (request) => {
        const friend = await User.findById(request.userId);
        return {
          ...request.toObject(),
          friendName: user.name,
          friendEmail: user.email,
          userName: friend?.name,
          userEmail: friend?.name,
        };
      })
    );

    return res.status(200).send(myRequests.concat(myFriendsRequests));
  } catch (error) {
    return res.status(500).send(`error: ${error}`);
  }
};

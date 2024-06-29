import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import conversationService from "../../services/conversation.service";
import { UnauthorizedError } from "../../core/error.response";
import { OK } from "../../core/success.response";

class ConversationController {
  constructor() {}

  createConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await conversationService.createConversation(
      req.user.userId.toString(),
      req.body.participants,
    );

    new OK({
      message: "Create conversation successfully!",
      metadata,
    }).send(res);
  };

  getConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await conversationService.getConversation(
      req.user.userId,
      req.params.conversation
    );

    new OK({
      message: "Get conversation successfully!",
      metadata,
    }).send(res);
  };

  getAllConversations = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await conversationService.getAllConversations(
      req.user.userId
    );

    new OK({
      message: "Get all conversations successfully!",
      metadata,
    }).send(res);
  };
}

export default new ConversationController();

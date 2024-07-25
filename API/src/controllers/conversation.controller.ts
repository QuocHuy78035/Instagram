import { NextFunction, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import conversationService from "../services/conversation.service";
import { UnauthorizedError } from "../core/error.response";
import { OK } from "../core/success.response";
import getMessage from "../helpers/getMessage";
import getMessageError from "../helpers/getMessageError";

class ConversationController {
  constructor() {}

  createConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await conversationService.createConversation(
      req.user.userId.toString(),
      req.body.participants
    );

    new OK({
      message: getMessage(203),
      metadata,
    }).send(res);
  };

  getConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await conversationService.getConversation(
      req.user.userId,
      req.params.conversation
    );

    new OK({
      message: getMessage(204),
      metadata,
    }).send(res);
  };

  getAllConversations = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await conversationService.getAllConversations(
      req.user.userId
    );

    new OK({
      message: getMessage(205),
      metadata,
    }).send(res);
  };

  deleteConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    await conversationService.deleteConversation(
      req.user.userId,
      req.params.conversation
    );

    new OK({
      message: getMessage(206),
    }).send(res);
  };
}

export default new ConversationController();

import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import messageService from "../../services/message.service";
import { UnauthorizedError } from "../../core/error.response";
import { CREATED } from "../../core/success.response";

class MessageController {
  constructor() {}

  sendMessage = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    const metadata = await messageService.sendMessage({
      userId: req.user?.userId,
      conversationId: req.body.conversation,
      message: req.body.message,
      file: req.file,
      replyMessageId: req.body.replyMessage,
      react: req.body.react,
    });

    new CREATED({
      message: "Send message successfully!",
      metadata,
    }).send(res);
  };
}

export default new MessageController();

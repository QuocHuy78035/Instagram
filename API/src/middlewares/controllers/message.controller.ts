import { NextFunction, Response } from "express";
import RequestV2 from "../../data/interfaces/requestv2.interface";
import messageService from "../../services/message.service";
import { BadRequestError, UnauthorizedError } from "../../core/error.response";
import { CREATED, OK } from "../../core/success.response";

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

  findByConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    if (!req.query.conversation) {
      throw new BadRequestError("Please fill the conversation query!");
    }
    if (!req.query.page) {
      throw new BadRequestError("Please fill the page query!");
    }
    if (typeof parseInt(req.query.page as string) !== "number") {
      throw new BadRequestError("Page query is invalid!");
    }
    const metadata = await messageService.findByConversation(
      req.user.userId,
      req.query.conversation as string,
      parseInt(req.query.page as string)
    );

    new OK({
      message: "Find messages by conversation successfully!",
      metadata,
    }).send(res);
  };

  deleteMessage =  async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError("User not found! Please log in again!");
    }
    await messageService.deleteMessage(req.params.messageId);
    new OK({
      message: "Delete message successfully!",
    }).send(res);
  }
  
}

export default new MessageController();

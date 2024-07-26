import { NextFunction, Response } from "express";
import RequestV2 from "../data/interfaces/requestv2.interface";
import messageService from "../services/message.service";
import { BadRequestError, UnauthorizedError } from "../core/error.response";
import { CREATED, OK } from "../core/success.response";
import getMessageError from "../helpers/getMessageError";
import getMessage from "../helpers/getMessage";
import { Types } from "mongoose";

class MessageController {
  constructor() {}

  sendMessage = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    const metadata = await messageService.sendMessage({
      userId: req.user?.userId as Types.ObjectId,
      conversationId: req.body.conversation,
      message: req.body.message,
      file: req.file,
      replyMessageId: req.body.replyMessage,
      react: req.body.react,
    });

    new CREATED({
      message: getMessage(207),
      metadata,
    }).send(res);
  };

  answerMessageByAI = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }

    const metadata = await messageService.answerMessageByAI({
      userId: req.user?.userId as Types.ObjectId,
      conversationId: req.body.conversation,
      message: req.body.message,
    });

    new CREATED({
      message: getMessage(208),
      metadata,
    }).send(res);
  };

  findByConversation = async (
    req: RequestV2,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    if (!req.query.conversation) {
      throw new BadRequestError(getMessageError(150));
    }
    if (!req.query.page) {
      throw new BadRequestError(getMessageError(151));
    }
    if (typeof parseInt(req.query.page as string) !== "number") {
      throw new BadRequestError(getMessageError(152));
    }
    const metadata = await messageService.findByConversation(
      req.user.userId as Types.ObjectId,
      req.query.conversation as string,
      parseInt(req.query.page as string)
    );

    new OK({
      message: getMessage(209),
      metadata,
    }).send(res);
  };

  deleteMessage = async (req: RequestV2, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new UnauthorizedError(getMessageError(101));
    }
    await messageService.deleteMessage(req.params.messageId);
    new OK({
      message: getMessage(210),
    }).send(res);
  };
}

export default new MessageController();

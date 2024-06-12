import reasonPhrases from "../utils/reasonPhrases";
import statusCodes from "../utils/statusCodes";
import { Response } from "express";
export class SuccessResponse {
  message: string;
  status: number;
  metadata: Object;
  constructor(
    message: string = reasonPhrases.OK,
    statusCode: number = statusCodes.OK,
    metadata: Object = {}
  ) {
    this.message = message;
    this.status = statusCode;
    this.metadata = metadata;
  }
  send(res: Response) {
    return res.status(this.status).send(this);
  }
}

export class OK extends SuccessResponse {
  constructor(body: { message?: string; status?: number; metadata?: Object }) {
    body.message = body.message || reasonPhrases.OK;
    body.status = body.status || statusCodes.OK;
    body.metadata = body.metadata || {};
    super(body.message, body.status, body.metadata);
  }
}

export class CREATED extends SuccessResponse {
  constructor(body: { message?: string; status?: number; metadata?: Object }) {
    body.message = body.message || reasonPhrases.CREATED;
    body.status = body.status || statusCodes.CREATED;
    body.metadata = body.metadata || {};
    super(body.message, body.status, body.metadata);
  }
}

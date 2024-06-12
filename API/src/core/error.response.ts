import { ErrorResponse } from "../data/error.class";
import reasonPhrases from "../utils/reasonPhrases";
import statusCodes from "../utils/statusCodes";

export class BadRequestError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.BAD_REQUEST,
    statusCode: number = statusCodes.BAD_REQUEST
  ) {
    super(message, statusCode);
  }
}

export class UnauthorizedError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.UNAUTHORIZED,
    statusCode: number = statusCodes.UNAUTHORIZED
  ) {
    super(message, statusCode);
  }
}

export class NotFoundError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.NOT_FOUND,
    statusCode: number = statusCodes.NOT_FOUND
  ) {
    super(message, statusCode);
  }
}

export class InternalServerError extends ErrorResponse {
  constructor(
    message: string = reasonPhrases.INTERNAL_SERVER_ERROR,
    statusCode: number = statusCodes.INTERNAL_SERVER_ERROR
  ) {
    super(message, statusCode);
  }
}

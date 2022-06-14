import { Request, Response } from 'express';

export abstract class Controller {
  // or even private
  protected request: Request;
  protected response: Response;

  protected abstract handle(): Promise<void | any>;

  public execute(request: Request, response: Response): void {
    this.request = request;
    this.response = response;

    this.handle();
  }

  public static jsonResponse(response: Response, code: number, message: string) {
    return response.status(code).json({ message })
  }

  public ok<T>(response: Response, dto?: T) {
    if (!!dto) {
      return response.status(200).json(dto);
    } else {
      return response.sendStatus(200);
    }
  }

  public created(response: Response) {
    return response.sendStatus(201);
  }

  public clientError(message?: string) {
    return Controller.jsonResponse(this.response, 400, message ? message : 'Bad request');
  }

  public unauthorized(message?: string) {
    return Controller.jsonResponse(this.response, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return Controller.jsonResponse(this.response, 402, message ? message : 'Payment required');
  }

  public forbidden(message?: string) {
    return Controller.jsonResponse(this.response, 403, message ? message : 'Forbidden');
  }

  public notFound(message?: string) {
    return Controller.jsonResponse(this.response, 404, message ? message : 'Not found');
  }

  public conflict(message?: string) {
    return Controller.jsonResponse(this.response, 409, message ? message : 'Conflict');
  }

  public tooMany(message?: string) {
    return Controller.jsonResponse(this.response, 429, message ? message : 'Too many requests');
  }

  public todo() {
    return Controller.jsonResponse(this.response, 400, 'TODO');
  }

  public fail(error: Error | string) {
    return this.response.status(500).json({
      message: error.toString()
    })
  }
}

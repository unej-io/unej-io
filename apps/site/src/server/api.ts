import type { NextApiResponse } from "next";

class APIError extends Error {
  public status: number;

  constructor(data: { status: number; message: string }, options?: ErrorOptions) {
    const { status, message } = data;
    super(message, options);
    this.status = status;
  }
}

type ResponseData<S extends number, D extends any> = {
  status: S;
  data: D;
};

type ResponseMessage<S extends number, M extends string = string> = {
  status: S;
  message: M;
};

const response = {
  ok<T>(res: NextApiResponse<T>, body: T) {
    res.status(200);
    res.json(body);
  },
  badRequest<T>(res: NextApiResponse<T>, body: T) {
    res.status(400);
    res.json(body);
  },
  unauthorized<T>(res: NextApiResponse<T>, body: T) {
    res.status(401);
    res.json(body);
  },
  notFound<T>(res: NextApiResponse<T>, body: T) {
    res.status(404);
    res.json(body);
  },
  internalServerError<T>(res: NextApiResponse<T>, body: T) {
    res.status(500);
    res.json(body);
  },
  $isAPIError(value: unknown): value is APIError {
    return value instanceof APIError;
  },
  $fromAPIError(res: NextApiResponse<ResponseMessage<number>>, error: APIError) {
    const { status, message } = error;
    res.status(status);
    res.json({ status, message });
    return;
  },
};

export type { ResponseData, ResponseMessage };
export { APIError };
export { response };

import { Request, NextFunction, Response } from "express";
export interface NewUserReqBody {
  name: string;
  email: string;
  photo: string;
  gender: string;
  _id: string;
  dob: Date;
}

export interface NewProductReqBody {
  name: string;
  category: string;
  price: number;
  stock: number;
}

export type SearchRequestQuery = {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
};

export type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export interface BaseQueryType {
  name?: {
    $regex: string;
    $options: string;
  };
  price?: { $lte: number };
  category?: string;
}

export type InvalidateCacheProps = {
  product?: boolean;
  order?: boolean;
  admin?: boolean;
};

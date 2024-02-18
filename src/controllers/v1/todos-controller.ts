import { NextFunction, Request, Response } from "express";
import { handleError } from "../../middleware/error";
import { STATUS_OK } from "../../config/config";
import { api } from "../../lib/http/axios";
import { endpoints } from "../../config/endpoints";

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await api.get(endpoints.jsonPlaceholder.todos.all);

    return res.status(STATUS_OK).json({
      message: "Data retrieved successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

const getTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const response = await api.get(endpoints.jsonPlaceholder.todos.one("1"));

    return res.status(STATUS_OK).json({
      message: "Data retrieved successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

const addTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const response = await api.post(endpoints.jsonPlaceholder.todos.one("1"));

    return res.status(STATUS_OK).json({
      message: "Data posted successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

const deleteTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const response = await api.delete(endpoints.jsonPlaceholder.todos.one(id));

    return res.status(STATUS_OK).json({
      message: "Data deleted successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

const patchTodo = async (req:Request, res:Response, next:NextFunction) =>{
  try {
    let id: string = req.params.id;
    const response = await api.patch(endpoints.jsonPlaceholder.todos.one(id));
    return res.status(STATUS_OK).json({
      message: "Data updated successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
}

const putTodo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let id: string = req.params.id;
    const response = await api.patch(endpoints.jsonPlaceholder.todos.one(id));
    return res.status(STATUS_OK).json({
      message: "Data updated successfully",
      data: response.data,
    });
  } catch (error: any) {
    return handleError(error, res);
  }
};

export default { getTodos, getTodo, deleteTodo, addTodo, putTodo , patchTodo};

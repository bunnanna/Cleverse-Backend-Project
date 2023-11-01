import { ErrorRequestHandler, Response } from "express";
import { HttpCodeError } from "../utils/error.class";
import { TErrorDTO } from "../dto";

export default class ErrorHandler {
	httpErrorHandler: ErrorRequestHandler = (
		err: HttpCodeError,
		req,
		res: Response<TErrorDTO>,
		next
	) => {
		console.log(`${err.statuscode || 400}\t${err.message}`);
		res
			.status(err.statuscode || 400)
			.json({ message: err.message })
			.end();
		next();
	};
}

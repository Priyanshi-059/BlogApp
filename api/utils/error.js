// this file is used to handle the errors 

export const errorHandler = (statusCode, message)=>{
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}
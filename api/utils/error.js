// function for handling the errors throughout the application
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode(statusCode);
    error.message(message);
    return error;
}
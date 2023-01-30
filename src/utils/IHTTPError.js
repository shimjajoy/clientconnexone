//This class holds the static error codes used in Error Interceptor
export class IHttpError {
    static BadRequest = 400;
    static Unauthorized = 401;
    static Forbidden = 403;
    static NotFound = 404;
    static TimeOut = 408;
    static Conflict = 409;
    static InternalServerError = 500;
    static tokenExpired = 406;
    static NoContent = 204;
    static UnknownError = 0;
    static gateWayTimeOut = 504;
}
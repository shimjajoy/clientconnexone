import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../utils/urls';
import { IHttpError } from "../utils/IHTTPError";
//creating anaxiosInstance of axios
const axiosInstance = axios.create({
    baseURL: BASE_URL,
});
const logFormat = 'background: maroon; color: white';
/**
 * handleError method defined to handle all kind of errors in the frontend using the error response status from the endpoints
 * @param error response from endoints which will be passed when invoking the function
 */
const handleError = (error: AxiosError) => {
    let errorMessage;
    switch (error?.request?.status) {
        case IHttpError.BadRequest:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c Bad Request 400 ', logFormat);
            break;
        case IHttpError.NotFound:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c Not Found 404 ', logFormat);
            break;
        case IHttpError.Unauthorized:
            errorMessage = "Something went wrong.Please try again";
            console.error('%c Unauthorized401', logFormat);
            // window.location.replace("http://localhost:3000"); // Navigate to base URL
            break;
        case IHttpError.gateWayTimeOut:
            sessionStorage.clear();
            console.error('%c gateWayTimeOut504', logFormat);
            break;
        case IHttpError.Forbidden:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c Forbidden 403 ', logFormat);
            break;
        case IHttpError.InternalServerError:
            errorMessage = "Server Error. Please try after some time";
            console.error('%c Server side Error 500 ', logFormat);
            break;
        case IHttpError.NoContent:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c NoContent 204 ', logFormat);
            break;
        case IHttpError.UnknownError:
            errorMessage = "Server Error. Please try after some time";
            console.error('%c UnknownError 0 ', logFormat);
            alert(errorMessage);
            window.location.reload();
            break;
        case IHttpError.Conflict:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c Conflict 409 ', logFormat);
            break;
        case IHttpError.tokenExpired:
            errorMessage = "Something went wrong. Please try again";
            console.error('%c Token Expired 406 ', logFormat);
            sessionStorage.clear();
            break;
        default:
            errorMessage = "Something went wrong. Please try again";
            break;
    }
}
//Request interceptor
axiosInstance.interceptors.request.use(
    config => {
        //TODO :Add Bearer string to indicate bearer token authentication
        //Add Headers or modify config before making request
        config.headers.Authorization = `${sessionStorage.getItem('accessToken')}`;
        return config;
    },
    //Handle HTTP Request errors
    error => 
        error?.request ? handleError(error) : console.error('Unknown Error Occured', logFormat)
);
//Response interceptor
axiosInstance.interceptors.response.use(
    // Handle successful response
    (response: AxiosResponse) => response,
    //Handle HTTP Response errors
    error => 
        error?.request ? handleError(error) : console.error('Unknown Error Occured', logFormat)
);
//Function to fetch data
export const fetchData = async (url: string) => {
    try {
        const response = await axiosInstance.get(BASE_URL + url);
        return response?.data;
    } catch (error) {
        throw error;
    }
};
//Function to post data
export const postData = async (url: string, data: any) => {
    try {
        const response = await axiosInstance.post(BASE_URL + url, data);
        return response?.data;
    } catch (error) {
        throw error;
    }
};



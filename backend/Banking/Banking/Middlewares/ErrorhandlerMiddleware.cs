using Banking.Domain.Commons.Exceptions;
using Banking.Domain.Commons.Models;
using System.Net;
using System.Text.Json;

namespace Banking.Api.Middlewares
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";
                var responseModel = new Response<string>
                {
                    Succeeded = false,
                    Message = error?.Message,
                };

                switch (error.InnerException)
                {
                    case ApiExceptions e:
                    case FilterFieldException ffe:
                    case FilterOperatorException foe:
                    case FilterSquemaException fse:
                    case FilterValueArrayException fva:
                    case SortTypeException st:
                    case SortFieldException sf:
                    case LoginException login:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        break;
                    case CreateException ce:
                    case RegisterException re:
                    case UpdateException ue:
                        response.StatusCode = (int)HttpStatusCode.Conflict;
                        break;

                    case ValidationExceptions ve:
                        // custom application error
                        response.StatusCode = (int)HttpStatusCode.BadRequest;
                        responseModel.Errors = ve.Errors;
                        break;

                    case KeyNotFoundException ke:
                        // not found error
                        response.StatusCode = (int)HttpStatusCode.NotFound;
                        break;
                    default:
                        // unhandled error
                        response.StatusCode = (int)HttpStatusCode.InternalServerError;
                        break;
                }

                var result = JsonSerializer.Serialize(responseModel);
                await response.WriteAsync(result);
            }
        }
    }
}

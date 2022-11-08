using System.Globalization;

namespace Banking.Domain.Commons.Exceptions
{
    public class ApiExceptions : Exception
    {
        //public ApiExceptions() : base () { }

        public ApiExceptions(string message) : base(message) { }

        public ApiExceptions(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }

    public class CreateException : Exception
    {
        public CreateException(string entity) : base($"There was a error creating this {entity}") { }

        public CreateException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }

    public class RegisterException : Exception
    {
        public RegisterException() : base($"Username already exists") { }

        public RegisterException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }

    public class LoginException : Exception
    {
        public LoginException() : base($"User not found") { }

        public LoginException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }

    public class UpdateException : Exception
    {
        public UpdateException(string entity) : base($"There was a error updating this {entity}") { }

        public UpdateException(string entity, bool multiple) : base($"There was a error updating these {entity}") { }

        public UpdateException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }
}

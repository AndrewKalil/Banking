using System.Globalization;

namespace Banking.Domain.Commons.Exceptions
{
    public class FilterOperatorException : Exception
    {
        public FilterOperatorException(string op) : base($"`{op}` is not a valid operator") { }

        public FilterOperatorException(string op, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, op, args)) { }
    }

    public class FilterFieldException : Exception
    {
        public FilterFieldException(string field) : base($"`{field}` is not a valid field in entity. Verify that it is in camel case") { }

        public FilterFieldException(string field, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, field, args)) { }
    }

    public class FilterSquemaException : Exception
    {
        public FilterSquemaException() : base("Query must follow this squema: fieldname operation type(value)") { }

        public FilterSquemaException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }

    public class FilterValueArrayException : Exception
    {
        public FilterValueArrayException() : base("Third parameter should be a non-empty list. e.g: array(string, string, string)") { }

        public FilterValueArrayException(string message, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, message, args)) { }
    }
}

using System.Globalization;

namespace Banking.Domain.Commons.Exceptions
{
    public class SortTypeException : Exception
    {
        public SortTypeException(string op) : base($"`{op}` is not a valid sort type") { }

        public SortTypeException(string op, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, op, args)) { }
    }

    public class SortFieldException : Exception
    {
        public SortFieldException(string field) : base($"`{field}` is not a valid field") { }

        public SortFieldException(string op, params object[] args) : base(String.Format(CultureInfo.CurrentCulture, op, args)) { }
    }
}

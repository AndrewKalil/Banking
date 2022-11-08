using FluentValidation.Results;

namespace Banking.Domain.Commons.Exceptions
{
    public class ValidationExceptions : Exception
    {
        public List<string> Errors { get; set; }
        public ValidationExceptions() : base("There has been one or more validation errors")
        {
            Errors = new List<string>();
        }

        public ValidationExceptions(IEnumerable<ValidationFailure> failures) : this()
        {
            foreach (var failure in failures)
            {
                Errors.Add(failure.ErrorMessage);
            }
        }
    }
}

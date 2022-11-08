using Banking.Domain.Commons.Models;
using System.Security.Cryptography;

namespace Banking.Domain.Commons
{
    public static class Utils
    {
        public static bool IsNullOrEmpty(object value)
        {
            if (value == null)
            {
                return true;
            }

            if (value is int && (int)value <= 0)
            {
                return true;
            }

            if (value is string && ((string)value == "" || (string)value == null))
            {
                return true;
            }

            //if (value is Guid && (Guid)(value) == Guid.Empty)
            //{
            //    return true;
            //}

            if (value is DateTime && (DateTime)(value) == DateTime.MinValue)
            {
                return true;
            }

            //if (value is byte[])
            //{
            //    return true;
            //}

            return false;
        }

        public static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            if (password == null)
            {
                return true;
            }
            var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            return computedHash.SequenceEqual(passwordHash);
        }

        public static FilterComponent ParseFilterString(string str)
        {
            var separated = str.Split(" ");
            if (separated.Length == 0)
            {
                throw new ArgumentException("Invalid format");
            }
            var typeVal = separated.Length > 3 ? String.Join("", separated.Take(new Range(2, separated.Length))) : separated[2];

            return new FilterComponent
            {
                property = separated[0].Trim().ToLower(),
                op = separated[1].Trim().ToLower(),
                type = InterpretTypeValue(typeVal)[0].Trim().ToLower(),
                value = InterpretTypeValue(typeVal)[1].Trim().ToLower(),
            };
        }

        public static string[] InterpretTypeValue(string typeval)
        {
            int start = typeval.IndexOf("(") + 1;
            int end = typeval.IndexOf(")", start);
            string result = typeval.Substring(start, end - start);
            return new string[]
            {
                typeval.Substring(0,start - 1),
                result
            };
        }

        public static SortComponent ParseSortString(string sort)
        {
            try
            {
                var propertyOrder = sort.Split(" ");
                if (propertyOrder.Length != 2)
                {
                    throw new Exception("Invalid format. Must be: 'property order'");
                }
                return new SortComponent
                {
                    property = propertyOrder[0],
                    order = propertyOrder[1],
                };
            }
            catch (Exception)
            {

                throw new Exception("Invalid format. Must be: 'property order'");
            }
        }
    }
}

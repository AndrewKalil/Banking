using Microsoft.EntityFrameworkCore;

namespace Banking.Domain.Entities
{
    public static class AccountExtensions
    {
        public static IQueryable<Account> WithAssets(this IQueryable<Account> account)
        {
            var toReturn = account.Include(c => c.Assets);
            return toReturn;
        }
    }
}

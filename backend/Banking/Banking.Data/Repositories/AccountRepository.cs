using Banking.Data.Interfaces;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;
using Banking.Domain.Services;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Banking.Data.Repositories
{
    public class AccountRepository: Repository<Account>, IAccountRepository
    {
        public AccountRepository(DataContext context) : base(context)
        {
        }
        public async Task<IEnumerable<Account>> GetAllWithDetails(Query query = null)
        {
            var queryService = new QueryService<Account>();
            var accounts = dbSet.WithAssets();
            if (query != null)
            {
                if (query.filters != null && query.filters.Count > 0)
                {
                    accounts = queryService.ApplyFilters(accounts, query.filters);
                }
                if (query.sort != null && query.sort != String.Empty)
                {
                    accounts = queryService.ApplySort(accounts, query.sort);
                }
            }
            return await accounts.ToListAsync();
        }

        public async Task<Account> GetWithDetails(int id)
        {
            return await dbSet.WithAssets().FirstOrDefaultAsync(asset => asset.Id == id);
        }
    }
}

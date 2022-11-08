using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Data.Interfaces
{
    public interface IAccountRepository : IRepository<Account>
    {
        Task<IEnumerable<Account>> GetAllWithDetails(Query query = null);
        Task<Account> GetWithDetails(int id);
    }
}

using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Data.Interfaces
{
    public interface IAssetRepository: IRepository<Asset>
    {
        Task<IEnumerable<Asset>> GetAllWithDetails(Query query = null);
        Task<Asset> GetWithDetails(int id);
    }
}

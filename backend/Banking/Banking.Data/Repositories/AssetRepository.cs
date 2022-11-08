using Banking.Data.Interfaces;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;
using Banking.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories
{
    public class AssetRepository : Repository<Asset>, IAssetRepository
    {
        public AssetRepository(DataContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Asset>> GetAllWithDetails(Query query = null)
        {
            var queryService = new QueryService<Asset>();
            var assetsToReturn = dbSet.AsDetailedAsset();
            if (query != null)
            {
                if (query.filters != null && query.filters.Count > 0)
                {
                    assetsToReturn = queryService.ApplyFilters(assetsToReturn, query.filters);
                }
                if (query.sort != null && query.sort != String.Empty)
                {
                    assetsToReturn = queryService.ApplySort(assetsToReturn, query.sort);
                }
            }
            return await assetsToReturn.ToListAsync();
        }

        public async Task<Asset> GetWithDetails(int id)
        {
            return await dbSet.AsDetailedAsset().FirstOrDefaultAsync(asset => asset.Id == id);
        }
    }
}

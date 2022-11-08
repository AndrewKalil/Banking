using Banking.Data.Interfaces;
using Banking.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(DataContext context) : base(context)
        {
        }

        public async Task<Category> GetWithAssets(int id)
        {

            var category = await dbSet.Include(c => c.Assets).FirstOrDefaultAsync(cat => cat.Id == id);
            return category;
        }
    }
}

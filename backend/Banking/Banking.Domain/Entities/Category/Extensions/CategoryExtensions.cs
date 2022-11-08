using Microsoft.EntityFrameworkCore;

namespace Banking.Domain.Entities
{
    public static class CategoryExtensions
    {
        public static IQueryable<Category> WithAssets(this IQueryable<Category> category)
        {
            return category.Include(c => 
                c.Assets.Where(a => a.Id == c.Id).Select(asset => new Asset
                {
                    Id = asset.Id,
                    Name = asset.Name,
                    Amount = asset.Amount,
                    ExpenseDate = asset.ExpenseDate,
                }));
        }
    }
}

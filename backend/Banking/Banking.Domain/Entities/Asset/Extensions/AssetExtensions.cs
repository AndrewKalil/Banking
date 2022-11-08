using Banking.Domain.Entities.Dtos;

namespace Banking.Domain.Entities
{
    public static class AssetExtensions
    {
        public static IQueryable<Asset> AsDetailedAsset(this IQueryable<Asset> asset)
        {
            return asset.Select(a => new Asset()
            {
                Id = a.Id,
                Name = a.Name,
                AccountId = a.AccountId,
                Account = a.Account,
                Amount = a.Amount,
                Category = a.Category,
                CategoryId = a.CategoryId,
                CreatedDate = a.CreatedDate,
                Description = a.Description,
                IsExpense = a.IsExpense,
                UpdatedDate = a.UpdatedDate,
                ExpenseDate = a.ExpenseDate
            });
        }

        public static int GetBalance(this IEnumerable<Asset> assets, int? credit = 0)
        {
            var total = assets.Sum(a =>
            {
                var amount = a.Amount;
                if (a.IsExpense != null && (bool)a.IsExpense)
                {
                    amount = amount * -1;
                }
                return amount;
            });
            if (credit != null && credit > 0)
            {
                return (int)credit + total;
            }
            return total;
        }
    }
}

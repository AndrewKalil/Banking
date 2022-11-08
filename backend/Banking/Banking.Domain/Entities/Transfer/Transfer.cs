using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Banking.Domain.Entities
{
    public class Transfer : BaseClass
    {
        [MinLength(2), MaxLength(2)]
        // Must br [From, To]
        public IEnumerable<Account>? _accounts;
        public virtual IEnumerable<Account>? Accounts 
        {
            get => _accounts != null ? _accounts.Select(account => new Account
            {
                Id = account.Id,
                Name = account.Name,
            }): null; 
            set => _accounts = value; 
        }
        public DateTime TransactionDate { get; set; }
        public int Amount { get; set; }
        public int? CategoryId { get; set; }
        private Category? _category;
        public virtual Category? Category
        {
            get => _category != null ? new Category
            {
                Name = _category.Name,
                Description = _category.Description,
            } : null;
            set => _category = value;
        }

        public IEnumerable<Asset>? _assets;
        public virtual IEnumerable<Asset>? Assets 
        {
            get => _assets != null ? _assets.Select(asset => new Asset
            {
                Id = asset.Id,
                Name = asset.Name,
                Amount = asset.Amount,
                IsExpense = asset.IsExpense,
                ExpenseDate = asset.ExpenseDate,
            }) : null;
            set => _assets = value;
        }
    }
}

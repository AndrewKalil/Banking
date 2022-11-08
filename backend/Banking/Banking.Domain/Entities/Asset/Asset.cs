using System.ComponentModel.DataAnnotations;

namespace Banking.Domain.Entities
{
    public class Asset: BaseClass
    {

        // Handle get and set of Account
        public int? AccountId { get; set; }
        private Account? _account;
        public virtual Account? Account
        {
            get => GetAccount();
            set => _account = value;
        }

        // Handle get and set of Category
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
        public int Amount { get; set; }
        public bool? IsExpense { get; set; }
        public bool? IsTransfer { get; set; }
        public int? TransferId { get; set; }
        private Transfer? _transfer;
        public virtual Transfer? Transfer
        {
            get => _transfer != null ? new Transfer
            {
                Name = _transfer.Name,
                Description = _transfer.Description,
            } : null;
            set => _transfer = value;
        }
        [Required]
        public DateTime ExpenseDate { get; set; }

        private Account? GetAccount()
        {
            if (_account != null)
            {
                return new Account
                {
                    Name = _account.Name,
                    Description = _account.Description,
                    Balance = _account.Balance,
                };
            }
            return null;
        }
    }
}

namespace Banking.Domain.Entities
{
    public class Account: BaseClass
    {
        private int _balance;
        public int Balance
        {
            get
            {
                //return Assets != null ? Assets.GetBalance() : 0;
                return _balance;
            }
            set
            {
                _balance = value;
            }
        }
        public bool? IsSavings { get; set; }
        public bool? IsCredit { get; set; }
        public int? CreditAmount { get; set; }
        public string UIcolor { get; set; } = "#e2e8f0";

        private IEnumerable<Asset>? _assets;
        public virtual IEnumerable<Asset>? Assets
        {
            get
            {
                return _assets != null ? _assets.Select(a => new Asset
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Amount = a.Amount,
                    ExpenseDate = a.ExpenseDate,
                    CategoryId = a.CategoryId,
                    IsExpense = a.IsExpense,
                }) : null;
            }
            set
            {
                _assets = value;
            }
        }

        private IEnumerable<Transfer>? _transfers;
        public virtual IEnumerable<Transfer>? Transfers
        {
            get
            {
                return _transfers != null ? _transfers.Select(a => new Transfer
                {
                    Id = a.Id,
                    Name = a.Name,
                    Description = a.Description,
                    Amount = a.Amount,
                    TransactionDate = a.TransactionDate,
                }) : null;
            }
            set
            {
                _transfers = value;
            }
        }
    }
}

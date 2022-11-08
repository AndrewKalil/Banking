namespace Banking.Domain.Entities
{
    public class Category: BaseClass
    {
        private IEnumerable<Asset>? _assets;
        public IEnumerable<Asset>? Assets 
        {
            get
            {
                return _assets != null ? _assets.Select(a => new Asset
                {
                    Id = a.Id,
                    Name = a.Name,
                    Amount = a.Amount,
                    ExpenseDate = a.ExpenseDate,
                }) : null;
            }
            set
            {
                _assets = value;
            } 
        }
    }
}

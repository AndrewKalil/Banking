using Banking.Domain.Entities.Dtos;

namespace Banking.Domain.Entities
{
    public static class TransferExtensions
    {
        public static Asset[] MapTransfer(this Transfer transfer, int transferId)
        {
            var assetFrom = new Asset()
            {
                Id = 0,
                Amount = transfer.Amount,
                CategoryId = transfer.CategoryId != null ? transfer.CategoryId : null,
                IsTransfer = true,
                TransferId = transferId,
                Description = transfer.Description,
                ExpenseDate = transfer.TransactionDate,
                Name = transfer.Name,
                AccountId = transfer.Accounts != null ? transfer.Accounts.First().Id : null,
                IsExpense = true

            };
            var assetTo = new Asset()
            {
                Id = 0,
                Amount = transfer.Amount,
                CategoryId = transfer.CategoryId != null ? transfer.CategoryId : null,
                IsTransfer = true,
                TransferId = transferId,
                Description = transfer.Description,
                ExpenseDate = transfer.TransactionDate,
                Name = transfer.Name,
                AccountId = transfer.Accounts != null ? transfer.Accounts.Last().Id : null,
                IsExpense = false,
            };
            return new List<Asset>()
            {
                assetFrom, assetTo
            }.ToArray();
        }

        public static Transfer MapToTransfer(this TransferDto transferDto, IEnumerable<Account> accounts)
        {
            var transfer = new Transfer()
            {
                Id = 0,
                Amount = transferDto.Amount,
                Name = transferDto.Name,
                Description = transferDto.Description,
                TransactionDate = transferDto.TransactionDate,
                CategoryId = transferDto.CategoryId != null ? transferDto.CategoryId : null,
                Accounts = new Account[]
                {
                    accounts.FirstOrDefault(x => x.Id == transferDto.AccountsIds.First()),
                    accounts.FirstOrDefault(x => x.Id == transferDto.AccountsIds.Last())
                }.AsEnumerable()
            };
            return transfer;
        }
    }
}

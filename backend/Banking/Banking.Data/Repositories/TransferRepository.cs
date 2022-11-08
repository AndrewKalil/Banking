using Banking.Data.Interfaces;
using Banking.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories
{
    public class TransferRepository : Repository<Transfer>, ITransferRepository
    {
        public TransferRepository(DataContext context) : base(context)
        {
        }

        public async Task<Transfer> GetWithAssets(int id)
        {

            var transfer = await dbSet
                //.Include(c => new Transfer
                //{
                //    Id = id,
                //    AccountFrom = c.AccountFrom,
                //    AccountFromId = c.AccountFromId,
                //    AccountTo = c.AccountTo,
                //    AccountToId = c.AccountToId,
                //    Amount = c.Amount,
                //})
                .FirstOrDefaultAsync(tr => tr.Id == id);
            return transfer;
        }
    }
}

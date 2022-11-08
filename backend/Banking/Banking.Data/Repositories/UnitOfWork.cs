using Banking.Data.Interfaces;

namespace Banking.Data.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        public ICategoryRepository CategoryRepository { get; }
        public IAssetRepository AssetRepository { get; }
        public IAccountRepository AccountRepository { get; }
        public ITransferRepository TransferRepository { get; }

        public UnitOfWork(
            DataContext context,
            ICategoryRepository categoryRepository,
            IAssetRepository assetRepository,
            IAccountRepository accountRepository,
            ITransferRepository transferRepository)
        {
            _context = context;
            CategoryRepository = categoryRepository;
            AssetRepository = assetRepository;
            AccountRepository = accountRepository;
            TransferRepository = transferRepository;
            TransferRepository = transferRepository;

         }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                _context.Dispose();
            }
        }
    }
}

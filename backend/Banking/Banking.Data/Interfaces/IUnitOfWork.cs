namespace Banking.Data.Interfaces
{
    public interface IUnitOfWork: IDisposable
    {
        ICategoryRepository CategoryRepository { get; }
        IAssetRepository AssetRepository { get; }
        IAccountRepository AccountRepository { get; }
        ITransferRepository TransferRepository { get; }
        int Complete();
    }
}

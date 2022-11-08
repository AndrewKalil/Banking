using Banking.Domain.Entities;

namespace Banking.Data.Interfaces
{
    public interface ICategoryRepository: IRepository<Category>
    {
        Task<Category> GetWithAssets(int id);
    }
}

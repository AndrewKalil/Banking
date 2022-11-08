using Banking.Domain.Commons.Models;

namespace Banking.Data.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAll(Query query = null);
        Task<T> Get(int id);
        Task<T> Post(T entity);
        Task PostMany(T[] entities);
        Task<T> Update(T entity);
        void UpdateMany(T[] entities);
        T Delete(T enity);
        void DeleteMany(List<int> entities);
    }
}

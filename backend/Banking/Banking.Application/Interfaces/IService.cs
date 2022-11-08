using Banking.Domain.Commons.Models;

namespace Banking.Application.Interfaces
{
    public interface IService<T> where T : class
    {
        Task<IEnumerable<T>> GetAsync(Query query);
        Task<T> GetAsync(int id, Query query = null);
        Task<T> PostAsync(Query query, T entity);
        Task PostMany(T[] entities);
        Task<T> UpdateAsync(Query query, int id, T entity);
        void UpdateMany(T[] enities);
        Task<T> DeleteAsync(int id);
        Task<bool> DeleteMany(List<int> ids);
    }
}

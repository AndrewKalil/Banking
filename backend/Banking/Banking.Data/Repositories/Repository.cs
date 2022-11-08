using Banking.Data.Interfaces;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;
using Banking.Domain.Services;
using Microsoft.EntityFrameworkCore;

namespace Banking.Data.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseClass
    {
        internal DataContext _context;
        internal DbSet<T> dbSet;

        public Repository(DataContext context)
        {
            _context = context;
            dbSet = context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAll(Query query = null)
        {
            var queryService = new QueryService<T>();
            IQueryable<T> queryable = dbSet;
            if (query != null)
            {
                if (query.filters != null && query.filters.Count > 0)
                {
                    queryable = queryService.ApplyFilters(dbSet, query.filters);
                }
                if (query.sort != null && query.sort != String.Empty)
                {
                    queryable = queryService.ApplySort(queryable, query.sort);
                }
            } 
                
            return await queryable.ToListAsync();
        }

        public async Task<T> Get(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task<T> Post(T entity)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdatedDate = DateTime.UtcNow;
            var newEntity = await dbSet.AddAsync(entity);
            return newEntity.Entity;
        }

        public async Task PostMany(T[] entities)
        {
            foreach (var entity in entities)
            {
                entity.CreatedDate = DateTime.UtcNow;
                entity.UpdatedDate = DateTime.UtcNow;
            }
            await dbSet.AddRangeAsync(entities);
        }

        public async Task<T> Update(T entity)
        {
            entity.UpdatedDate = DateTime.UtcNow;
            var updatedEnity = dbSet.Update(entity);
            return updatedEnity.Entity;
        }

        public void UpdateMany(T[] entities)
        {
            foreach (var entity in entities)
            {
                entity.UpdatedDate = DateTime.UtcNow;
            }
            dbSet.UpdateRange(entities);
        }

        public T Delete(T entity)
        {
            var deletedEntity = dbSet.Remove(entity);
            return deletedEntity.Entity;
        }

        public void DeleteMany(List<int> entities)
        {
            var toDelete = dbSet.Where(entry => entities.Contains(entry.Id)).ToList();
            if (entities.Count != toDelete.Count)
            {
                throw new Exception("One or more ids are invalid");
            }
            dbSet.RemoveRange(toDelete);
        }
    }
}

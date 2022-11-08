using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Data.Interfaces;
using Banking.Domain.Commons.Exceptions;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Application.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Category>> GetAsync(Query query)
        {
            try
            {
                var listToReturn = await _unitOfWork.CategoryRepository.GetAll();
                return listToReturn;
            }
            catch (Exception e)
            {
                throw e;

            }
        }

        public async Task<Category> GetAsync(int id, Query query = null)
        {
            try
            {
                Category objectToReturn;
                if (query != null && query.detail)
                {
                    objectToReturn = await _unitOfWork.CategoryRepository.GetWithAssets(id);
                } else
                {
                    objectToReturn = await _unitOfWork.CategoryRepository.Get(id);
                }
                if (objectToReturn == null)
                {
                    throw new KeyNotFoundException();
                }
                return objectToReturn;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public async Task<Category> PostAsync(Query query, Category entity)
        {
            try
            {
                var newEntity = await _unitOfWork.CategoryRepository.Post(entity);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.CategoryRepository.GetWithAssets(newEntity.Id);
                }
                else
                {
                    return await _unitOfWork.CategoryRepository.Get(newEntity.Id);
                }
            }
            catch (Exception)
            {
                throw new CreateException("entity");
            }
        }

        public Task PostMany(Category[] entities)
        {
            throw new NotImplementedException();
        }

        public async Task<Category> UpdateAsync(Query query, int id, Category entity)
        {
            try
            {
                var objectToUpdate = await _unitOfWork.CategoryRepository.Get(id);
                var objectMapped = _mapper.Map(entity, objectToUpdate);
                var updatedEntity = _unitOfWork.CategoryRepository.Update(objectMapped);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.CategoryRepository.GetWithAssets(updatedEntity.Result.Id);
                }
                else
                {
                    return await _unitOfWork.CategoryRepository.Get(updatedEntity.Result.Id);
                }
            }
            catch (Exception)
            {

                throw new UpdateException("entity");
            }
        }

        public void UpdateMany(Category[] enities)
        {
            throw new NotImplementedException();
        }

        public async Task<Category> DeleteAsync(int id)
        {
            try
            {
                var objectToDelete = await _unitOfWork.CategoryRepository.Get(id);
                var deletedEntity = _unitOfWork.CategoryRepository.Delete(objectToDelete);
                _unitOfWork.Complete();
                return deletedEntity;
            }
            catch (Exception)
            {

                throw new KeyNotFoundException();
            }
        }

        public async Task<bool> DeleteMany(List<int> ids)
        {
            try
            {
                _unitOfWork.CategoryRepository.DeleteMany(ids);
                _unitOfWork.Complete();
            }
            catch (Exception e)
            {
                throw e;
            }
            var query = new Query()
            {
                filters = new List<string> { $"id in list({String.Join(",", ids)})" }
            };
            var categories = await this.GetAsync(query);
            if (categories.Count() == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}

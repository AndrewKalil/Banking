using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Data.Interfaces;
using Banking.Domain.Commons.Exceptions;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Application.Services
{
    public class AssetService: IAssetService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;

        public AssetService(IUnitOfWork unitOfWork, IMapper mapper, IAccountService accountService)
        {
            _unitOfWork = unitOfWork;
            _accountService = accountService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Asset>> GetAsync(Query query)
        {
            try
            {
                if (query.detail)
                {
                    return await _unitOfWork.AssetRepository.GetAllWithDetails(query);
                } else
                {
                    return await _unitOfWork.AssetRepository.GetAll(query);
                }
            }
            catch (Exception e)
            {
                throw e;

            }
        }

        public async Task<Asset> GetAsync(int id, Query query)
        {
            try
            {
                Asset objectToReturn; 
                if (query.detail)
                {
                    objectToReturn = await _unitOfWork.AssetRepository.GetWithDetails(id);
                } else
                {
                    objectToReturn = await _unitOfWork.AssetRepository.Get(id);
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

        public async Task<Asset> PostAsync(Query query, Asset entity)
        {
            try
            {
                if (entity.CategoryId <= 0)
                {
                    entity.CategoryId = null;
                }
                var created = await _unitOfWork.AssetRepository.Post(entity);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.AssetRepository.GetWithDetails(created.Id);
                } else
                {
                    return await _unitOfWork.AssetRepository.Get(created.Id);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                _accountService.updateAccounts();
            }
        }

        public Task PostMany(Asset[] entities)
        {
            try
            {
                return _unitOfWork.AssetRepository.PostMany(entities);
            }
            catch (Exception)
            {

                throw;
            }
            finally
            {
                _accountService.updateAccounts();
            }
        }

        public async Task<Asset> UpdateAsync(Query query, int id, Asset entity)
        {
            try
            {
                var objectToUpdate = await _unitOfWork.AssetRepository.Get(id);
                var objectMapped = _mapper.Map(entity, objectToUpdate);
                var updatedEntity = _unitOfWork.AssetRepository.Update(objectMapped);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.AssetRepository.GetWithDetails(updatedEntity.Result.Id);
                }
                else
                {
                    return await _unitOfWork.AssetRepository.Get(updatedEntity.Result.Id);
                }
            }
            catch (Exception)
            {

                throw new UpdateException("entity");
            }
            finally
            {
                _accountService.updateAccounts();
            }
        }

        public void UpdateMany(Asset[] enities)
        {
            throw new NotImplementedException();
        }

        public async Task<Asset> DeleteAsync(int id)
        {
            try
            {
                Asset deletedEntity;
                var objectToDelete = await _unitOfWork.AssetRepository.Get(id);
                if (objectToDelete.IsTransfer != null 
                    && objectToDelete.IsTransfer == true 
                    && objectToDelete.TransferId != null)
                {
                    var transferToDelete = await _unitOfWork.TransferRepository.Get((int)objectToDelete.TransferId);
                    var deletedTransaction = _unitOfWork.TransferRepository.Delete(transferToDelete);
                    deletedEntity = new Asset { Id = id };
                }
                else
                {
                    deletedEntity  = _unitOfWork.AssetRepository.Delete(objectToDelete);
                }
                _unitOfWork.Complete();
                return deletedEntity;
            }
            catch (Exception)
            {

                throw new KeyNotFoundException();
            }
            finally
            {
                _accountService.updateAccounts();
            }
        }

        public async Task<bool> DeleteMany(List<int> ids)
        {
            try
            {
                _unitOfWork.AssetRepository.DeleteMany(ids);
                _unitOfWork.Complete();
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                _accountService.updateAccounts();
            }
            var query = new Query()
            {
                filters = new List<string> { $"id in list({String.Join(",", ids)})"}
            };
            var assets = await this.GetAsync(query);
            if (assets.Count() == 0)
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

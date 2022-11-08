using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Data.Interfaces;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Application.Services
{
    public class TransferService : ITransferService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IAccountService _accountService;
        private readonly IAssetService _assetService;

        public TransferService(IUnitOfWork unitOfWork, 
            IMapper mapper, 
            IAccountService accountService, 
            IAssetService assetService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _accountService = accountService;
            _assetService = assetService;
        }

        public async Task<IEnumerable<Transfer>> GetAsync(Query query)
        {
            try
            {
                if (query.detail)
                {
                    return await _unitOfWork.TransferRepository.GetAll(query);
                }
                else
                {
                    return await _unitOfWork.TransferRepository.GetAll(query);
                }
            }
            catch (Exception e)
            {
                throw e;

            }
        }

        public async Task<Transfer> GetAsync(int id, Query query = null)
        {
            try
            {
                Transfer objectToReturn;
                objectToReturn = await _unitOfWork.TransferRepository.Get(id);
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

        public Task<Transfer> PostAsync(Query query, Transfer entity)
        {
            try
            {
                var transaction = _unitOfWork.TransferRepository.Post(entity);
                _unitOfWork.Complete();
                Asset[] assets = entity.MapTransfer(transaction.Result.Id);
                if (assets != null && assets.Length == 2)
                {
                    _assetService.PostMany(assets);
                }
                else
                {
                    throw new Exception("Invalid Account Ids");
                }
                _unitOfWork.Complete();

                return transaction;
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public Task PostMany(Transfer[] entities)
        {
            throw new NotImplementedException();
        }

        public Task<Transfer> UpdateAsync(Query query, int id, Transfer entity)
        {
            throw new NotImplementedException();
        }

        public void UpdateMany(Transfer[] enities)
        {
            throw new NotImplementedException();
        }

        public async Task<Transfer> DeleteAsync(int id)
        {
            try
            {
                var objectToDelete = await _unitOfWork.TransferRepository.Get(id);
                var deletedEntity = _unitOfWork.TransferRepository.Delete(objectToDelete);
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

        public Task<bool> DeleteMany(List<int> ids)
        {
            throw new NotImplementedException();
        }
    }
}

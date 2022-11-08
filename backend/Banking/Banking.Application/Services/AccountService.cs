using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Data.Interfaces;
using Banking.Domain.Commons.Exceptions;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;

namespace Banking.Application.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AccountService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<IEnumerable<Account>> GetAsync(Query query)
        {
            try
            {
               return await _unitOfWork.AccountRepository.GetAll(query);
            }
            catch (Exception e)
            {
                throw e;

            }
        }

        public async Task<Account> GetAsync(int id, Query query = null)
        {
            try
            {
                Account objectToReturn;
                objectToReturn = await _unitOfWork.AccountRepository.GetWithDetails(id);
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

        public async Task<Account> PostAsync(Query query, Account entity)
        {
            try
            {
                if (entity.IsCredit != null && (bool)entity.IsCredit)
                {
                    entity.IsSavings = null;
                }
                if (entity.IsSavings != null && (bool)entity.IsSavings)
                {
                    entity.IsCredit = null;
                    entity.CreditAmount = null;
                }
                var created = await _unitOfWork.AccountRepository.Post(entity);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.AccountRepository.GetWithDetails(created.Id);
                }
                else
                {
                    return await _unitOfWork.AccountRepository.Get(created.Id);
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public Task PostMany(Account[] entities)
        {
            throw new NotImplementedException();
        }

        public async Task<Account> UpdateAsync(Query query, int id, Account entity)
        {
            try
            {

                var objectToUpdate = await _unitOfWork.AccountRepository.Get(id);
                var objectMapped = _mapper.Map(entity, objectToUpdate);
                if (objectMapped.IsCredit != null && (bool)objectMapped.IsCredit)
                {
                    objectMapped.IsSavings = null;
                }
                if (objectMapped.IsSavings != null && (bool)objectMapped.IsSavings)
                {
                    objectMapped.IsCredit = null;
                    objectMapped.CreditAmount = null;
                }
                var updatedEntity = _unitOfWork.AccountRepository.Update(objectMapped);
                _unitOfWork.Complete();
                if (query.detail)
                {
                    return await _unitOfWork.AccountRepository.GetWithDetails(updatedEntity.Result.Id);
                }
                else
                {
                    return await _unitOfWork.AccountRepository.Get(updatedEntity.Result.Id);
                }
            }
            catch (Exception)
            {

                throw new UpdateException("entity");
            }
        }

        public void UpdateMany(Account[] enities)
        {
            throw new NotImplementedException();
        }
        
        public void updateAccounts()
        {
            try
            {
                var accounts = _unitOfWork.AccountRepository.GetAllWithDetails().Result;
                foreach (var account in accounts)
                {
                    int possibleCredit = 0;
                    if ((account.IsCredit != null && (bool)account.IsCredit) && account.CreditAmount > 0)
                    {
                        possibleCredit = (int)account.CreditAmount;
                    }
                    account.Balance = account.Assets.AsEnumerable().GetBalance(possibleCredit);
                }
                _unitOfWork.AccountRepository.UpdateMany(accounts.ToArray());
                _unitOfWork.Complete();
            }
            catch (Exception e)
            {

                throw e;
            }

        }
       
        public async Task<Account> DeleteAsync(int id)
        {
            try
            {
                var objectToDelete = await _unitOfWork.AccountRepository.Get(id);
                var deletedEntity = _unitOfWork.AccountRepository.Delete(objectToDelete);
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
                _unitOfWork.AccountRepository.DeleteMany(ids);
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
            var Accounts = await this.GetAsync(query);
            if (Accounts.Count() == 0)
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

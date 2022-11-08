using Banking.Domain.Entities;

namespace Banking.Application.Interfaces
{
    public interface IAccountService: IService<Account>
    {
        void updateAccounts();
    }
}

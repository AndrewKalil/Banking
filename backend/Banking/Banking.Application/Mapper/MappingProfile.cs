using AutoMapper;
using Banking.Domain.Entities.Dtos;
using Banking.Domain.Entities;
using Banking.Domain.Commons;

namespace Banking.Application.Mapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<AssetDto, Asset>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<Asset, Asset>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<CategoryDto, Category>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<Category, Category>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<AccountDto, Account>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<Account, Account>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<TransferDto, Transfer>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));
            CreateMap<Transfer, Transfer>()
                .ForAllMembers(opts => opts.Condition((src, dest, srcMemeber) => !Utils.IsNullOrEmpty(srcMemeber)));

        }
    }
}

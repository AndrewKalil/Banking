using Banking.Domain.Commons;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;
using System.Data.SqlTypes;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Banking.Domain.Services
{
    public class QueryService<T> where T : BaseClass
    {
        #region Filters
        public IQueryable<T> ApplyFilters(IQueryable<T> obj, List<string> filters)
        {
            if (filters.Count() == 0)
            {
                return obj;
            }
            var filterObjects = GetFilters(filters);
            foreach (var filter in filterObjects)
            {
                obj = (IQueryable<T>)InterpretFilter(obj, filter);
            }
            return obj;
        }
        
        private List<FilterComponent> GetFilters(List<string> filters)
        {
            var filterStrings = filters;
            var filterObjects = new List<FilterComponent>();
            foreach (var item in filterStrings)
            {
                filterObjects.Add(Utils.ParseFilterString(item));
            }
            return filterObjects;
        }

        private IQueryable<T> InterpretFilter(IQueryable<T> obj, FilterComponent filter)
        {
            switch (filter.property)
            {
                case "id":
                    return HandleIdFilter(obj, filter);
                case "name":
                    return HandleNameFilter(obj, filter);
                case "description":
                    return HandleDescriptionFilter(obj, filter);
                case "createddate":
                    return HandleCreatedDateFilter(obj, filter);
                case "updateddate":
                    return HandleUpdatedDateFilter(obj, filter);
                case "expensedate":
                    return HandleAssetExpenseDateFilter(obj, filter);
                case "categoryid":
                    return HandleAssetCategoryIdFilter(obj, filter);
                case "amount":
                    return HandleAssetAmountFilter(obj, filter);
                case "isexpense":
                    return HandleAssetIsExpenseFilter(obj, filter);
                case "accountid":
                    return HandleAssetAccountIdFilter(obj, filter);
                default:
                    throw new Exception("Invalid property");
            }
        }

        private IQueryable<T> HandleCreatedDateFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                if (filter.type.Equals("dates") && filter.op == "between")
                {
                    var value = filter.value.Split(",");
                    if (value.Length != 2)
                    {
                        throw new Exception("Value must be string of separated dates in format 'yyyymmdd'");
                    }
                    var date1 = (DateTime)SqlDateTime.Parse(value[0]);
                    var date2 = (DateTime)SqlDateTime.Parse(value[1]);
                    return obj.Where(x => date1 <= x.CreatedDate && date2 >= x.CreatedDate);
                }
                else if (filter.type == "date")
                {
                    var date = (DateTime)SqlDateTime.Parse(filter.value);
                    switch (filter.op)
                    {
                        case "lte":
                        case "<=":
                            return obj.Where(x => x.CreatedDate <= date);
                        case "gte":
                        case ">=":
                            return obj.Where(x => x.CreatedDate >= date);
                        case "<":
                        case "lt":
                            return obj.Where(x => x.CreatedDate < date);
                        case ">":
                        case "gt":
                            return obj.Where(x => x.CreatedDate > date);

                        default:
                            throw new Exception("Invalid operator");
                    }
                }
                else
                {
                    throw new Exception("Invalid type. Must be 'dates()' or 'date()'");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleUpdatedDateFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                if (filter.type.Equals("dates") && filter.op == "between")
                {
                    var value = filter.value.Split(",");
                    if (value.Length != 2)
                    {
                        throw new Exception("Value must be string of separated dates in format 'yyyymmdd'");
                    }
                    var date1 = (DateTime)SqlDateTime.Parse(value[0]);
                    var date2 = (DateTime)SqlDateTime.Parse(value[1]);
                    return obj.Where(x => date1 <= x.UpdatedDate && date2 >= x.UpdatedDate);
                }
                else if (filter.type == "date")
                {
                    var date = (DateTime)SqlDateTime.Parse(filter.value);
                    switch (filter.op)
                    {
                        case "lte":
                        case "<=":
                            return obj.Where(x => x.UpdatedDate <= date);
                        case "gte":
                        case ">=":
                            return obj.Where(x => x.UpdatedDate >= date);
                        case "<":
                        case "lt":
                            return obj.Where(x => x.UpdatedDate < date);
                        case ">":
                        case "gt":
                            return obj.Where(x => x.UpdatedDate > date);

                        default:
                            throw new Exception("Invalid operator");
                    }
                }
                else
                {
                    throw new Exception("Invalid type. Must be 'dates()' or 'date()'");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleNameFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                var value = (string)filter.value;
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return obj.Where(x => x.Name == value);
                    case "!=":
                    case "neq":
                        return obj.Where(x => x.Name != value);
                    case "contains":
                        return obj.Where(x => x.Name.Trim().ToLower().Contains(value.Trim().ToLower()));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list" || filter.type == "ids")
                        {
                            return obj.Where(x => list.Contains(x.Name));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of ids or strings");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleDescriptionFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                var value = (string)filter.value;
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return obj.Where(x => x.Description == value);
                    case "!=":
                    case "neq":
                        return obj.Where(x => x.Description != value);
                    case "contains":
                        return obj.Where(x => x.Description.Trim().ToLower().Contains(value.Trim().ToLower()));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list")
                        {
                            return obj.Where(x => list.Contains(x.Description));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of strings");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleIdFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return obj.Where(x => x.Id == int.Parse(filter.value));
                    case "!=":
                    case "neq":
                        return obj.Where(x => x.Id != int.Parse(filter.value));
                    case "lte":
                    case "<=":
                        return obj.Where(x => x.Id <= int.Parse(filter.value));
                    case "gte":
                    case ">=":
                        return obj.Where(x => x.Id >= int.Parse(filter.value));
                    case "<":
                    case "lt":
                        return obj.Where(x => x.Id < int.Parse(filter.value));
                    case ">":
                    case "gt":
                        return obj.Where(x => x.Id > int.Parse(filter.value));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list")
                        {
                            return obj.Where(x => list.Contains(x.Id.ToString()));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of strings");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleAssetCategoryIdFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId == int.Parse(filter.value));
                    case "!=":
                    case "neq":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId != int.Parse(filter.value));
                    case "lte":
                    case "<=":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId <= int.Parse(filter.value));
                    case "gte":
                    case ">=":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId >= int.Parse(filter.value));
                    case "<":
                    case "lt":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId < int.Parse(filter.value));
                    case ">":
                    case "gt":
                        return (IQueryable<T>)assets.Where(x => x.CategoryId > int.Parse(filter.value));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list")
                        {
                            return (IQueryable<T>)assets.Where(x => list.Contains(x.CategoryId.ToString()));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of strings or ids");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        
        private IQueryable<T> HandleAssetAccountIdFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return (IQueryable<T>)assets.Where(x => x.AccountId == int.Parse(filter.value));
                    case "!=":
                    case "neq":
                        return (IQueryable<T>)assets.Where(x => x.AccountId != int.Parse(filter.value));
                    case "lte":
                    case "<=":
                        return (IQueryable<T>)assets.Where(x => x.AccountId <= int.Parse(filter.value));
                    case "gte":
                    case ">=":
                        return (IQueryable<T>)assets.Where(x => x.AccountId >= int.Parse(filter.value));
                    case "<":
                    case "lt":
                        return (IQueryable<T>)assets.Where(x => x.AccountId < int.Parse(filter.value));
                    case ">":
                    case "gt":
                        return (IQueryable<T>)assets.Where(x => x.AccountId > int.Parse(filter.value));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list")
                        {
                            return (IQueryable<T>)assets.Where(x => list.Contains(x.AccountId.ToString()));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of strings or ids");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleAssetExpenseDateFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (filter.type.Equals("dates") && filter.op == "between")
                {
                    var value = filter.value.Split(",");
                    if (value.Length != 2)
                    {
                        throw new Exception("Value must be string of separated dates in format 'yyyymmdd'");
                    }
                    var date1 = (DateTime)SqlDateTime.Parse(value[0]);
                    var date2 = (DateTime)SqlDateTime.Parse(value[1]);
                    return (IQueryable<T>)assets.Where(x => date1 <= x.ExpenseDate && date2 >= x.ExpenseDate);
                }
                if (filter.type.Equals("date"))
                {
                    var date = (DateTime)SqlDateTime.Parse(filter.value);
                    switch (filter.op)
                    {
                        case "lte":
                        case "<=":
                            return (IQueryable<T>)assets.Where(x => x.ExpenseDate <= date);
                        case "gte":
                        case ">=":
                            return (IQueryable<T>)assets.Where(x => x.ExpenseDate >= date);
                        case "<":
                        case "lt":
                            return (IQueryable<T>)assets.Where(x => x.ExpenseDate < date);
                        case ">":
                        case "gt":
                            return (IQueryable<T>)assets.Where(x => x.ExpenseDate > date);
                        default:
                            throw new Exception("Invalid operator");
                    }
                }
                else
                {
                    throw new Exception("Invalid type. Must be 'dates()' or 'date()'");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleAssetAmountFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                switch (filter.op)
                {
                    case "=":
                    case "eq":
                        return (IQueryable<T>)assets.Where(x => x.Amount == int.Parse(filter.value));
                    case "!=":
                    case "neq":
                        return (IQueryable<T>)assets.Where(x => x.Amount != int.Parse(filter.value));
                    case "lte":
                    case "<=":
                        return (IQueryable<T>)assets.Where(x => x.Amount <= int.Parse(filter.value));
                    case "gte":
                    case ">=":
                        return (IQueryable<T>)assets.Where(x => x.Amount >= int.Parse(filter.value));
                    case "<":
                    case "lt":
                        return (IQueryable<T>)assets.Where(x => x.Amount < int.Parse(filter.value));
                    case ">":
                    case "gt":
                        return (IQueryable<T>)assets.Where(x => x.Amount > int.Parse(filter.value));
                    case "in":
                        var list = filter.value.Trim().Split(",");
                        if (filter.type == "list")
                        {
                            return (IQueryable<T>)assets.Where(x => list.Contains(x.Amount.ToString()));
                        }
                        else
                        {
                            throw new Exception("Invalid types, must be list of integers");
                        }

                    default:
                        throw new Exception("Invalid operation");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        private IQueryable<T> HandleAssetIsExpenseFilter(IQueryable<T> obj, FilterComponent filter)
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                bool value;
                if (filter.value == "true")
                {
                    value = true;
                } 
                else if (filter.value == "false")
                {
                    value = false;
                }
                else
                {
                    throw new ArgumentException("value must be 'true' or 'false'");
                }
                if (filter.op == "is")
                {
                    if (value)
                    {
                        return (IQueryable<T>)assets.Where(x => x.IsExpense == true);
                    } else
                    {
                        return (IQueryable<T>)assets.Where(x => x.IsExpense == false || x.IsExpense == null);
                    }
                }
                else
                {
                    throw new InvalidOperationException("This property only takes 'is' as an operator. eg, property is bool(false)");
                }
            }
            catch (Exception e)
            {

                throw e;
            }
        }
        #endregion

        #region Sort
        public IQueryable<T> ApplySort(IQueryable<T> obj, string sort)
        {
            if (sort == null || sort == "")
            {
                return obj;
            }
            var sortComponent = Utils.ParseSortString(sort);
            return InterpretSort(obj, sortComponent);
        }

        public IQueryable<T> InterpretSort(IQueryable<T> obj, SortComponent sort)
        {
            switch (sort.property)
            {
                case "id":
                    return HandleIdSort(obj, sort.order);
                case "name":
                    return HandleNameSort(obj, sort.order);
                case "description":
                    return HandleDescriptionSort(obj, sort.order);
                case "updatedDate":
                    return HandleUpdatedDateSort(obj, sort.order);
                case "createdDate":
                    return HandleCreatedDateSort(obj, sort.order);
                case "amount":
                    return HandleAssetAmountSort(obj, sort.order);
                case "isExpense":
                    return HandleAssetIsExpenseSort(obj, sort.order);
                case "account":
                    return HandleAssetAccountSort(obj, sort.order);
                case "category":
                    return HandleAssetCategorySort(obj, sort.order);
                case "expenseDate":
                    return HandleAssetExpenseDateSort(obj, sort.order);
                default:
                    throw new Exception("Invalid property");
            }
        }

        private IQueryable<T> HandleIdSort(IQueryable<T> obj, string order = "desc")
        {
            if (order == "desc")
            {
                return obj.OrderByDescending(x => x.Id);
            }
            return obj.OrderBy(x => x.Id);

        }

        private IQueryable<T> HandleNameSort(IQueryable<T> obj, string order = "desc")
        {
            if (order == "desc")
            {
                return obj.OrderByDescending(x => x.Name);
            }
            return obj.OrderBy(x => x.Name);

        }

        private IQueryable<T> HandleDescriptionSort(IQueryable<T> obj, string order = "desc")
        {
            if (order == "desc")
            {
                return obj.OrderByDescending(x => x.Description);
            }
            return obj.OrderBy(x => x.Description);

        }

        private IQueryable<T> HandleUpdatedDateSort(IQueryable<T> obj, string order = "desc")
        {
            if (order == "desc")
            {
                return obj.OrderByDescending(x => x.UpdatedDate);
            }
            return obj.OrderBy(x => x.UpdatedDate);

        }

        private IQueryable<T> HandleCreatedDateSort(IQueryable<T> obj, string order = "desc")
        {
            if (order == "desc")
            {
                return obj.OrderByDescending(x => x.CreatedDate);
            }
            return obj.OrderBy(x => x.CreatedDate);
        }

        private IQueryable<T> HandleAssetAmountSort(IQueryable<T> obj, string order = "desc")
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (order == "desc")
                {
                    return (IQueryable<T>)assets.OrderByDescending(x => x.Amount);
                }
                return (IQueryable<T>)assets.OrderBy(x => x.Amount);
            }
            catch (Exception)
            {

                throw new Exception("Not an asset property");
            }
        }

        private IQueryable<T> HandleAssetAccountSort(IQueryable<T> obj, string order = "desc")
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (order == "desc")
                {
                    return (IQueryable<T>)assets.OrderByDescending(x => x.Account.Name);
                }
                return (IQueryable<T>)assets.OrderBy(x => x.Account.Name);
            }
            catch (Exception)
            {

                throw new Exception("Not an asset property");
            }
        }

        private IQueryable<T> HandleAssetCategorySort(IQueryable<T> obj, string order = "desc")
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (order == "desc")
                {
                    return (IQueryable<T>)assets.OrderByDescending(x => x.Category.Name);
                }
                return (IQueryable<T>)assets.OrderBy(x => x.Category.Name);
            }
            catch (Exception)
            {

                throw new Exception("Not an asset property");
            }
        }

        private IQueryable<T> HandleAssetIsExpenseSort(IQueryable<T> obj, string order = "desc")
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (order == "desc")
                {
                    return (IQueryable<T>)assets.OrderByDescending(x => x.IsExpense);
                }
                return (IQueryable<T>)assets.OrderBy(x => x.IsExpense);
            }
            catch (Exception)
            {

                throw new Exception("Not an asset property");
            }
        }

        private IQueryable<T> HandleAssetExpenseDateSort(IQueryable<T> obj, string order = "desc")
        {
            try
            {
                IQueryable<Asset> assets = (IQueryable<Asset>)obj;
                if (order == "desc")
                {
                    return (IQueryable<T>)assets.OrderByDescending(x => x.ExpenseDate);
                }
                return (IQueryable<T>)assets.OrderBy(x => x.ExpenseDate);
            }
            catch (Exception)
            {

                throw new Exception("Not an asset property");
            }
        }
        #endregion
    }
}

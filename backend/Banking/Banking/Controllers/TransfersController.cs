using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Domain.Commons.Models;
using Banking.Domain.Entities;
using Banking.Domain.Entities.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Banking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransfersController : ControllerBase
    {
        private readonly ITransferService _service;
        private readonly IAccountService _accountService;
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public TransfersController(ITransferService service, 
            IAccountService accountService, 
            ICategoryService categoryService, 
            IMapper mapper)
        {
            _service = service;
            _accountService = accountService;
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<Account>> Get([FromQuery] Query query)
        {
            var objects = _service.GetAsync(query).Result;
            return Ok(objects);
        }

        [HttpGet("{id}")]
        public ActionResult<Account> Get(int id)
        {
            var obj = _service.GetAsync(id).Result;
            return Ok(obj);
        }

        [HttpPost]
        public ActionResult<Transfer> Post([FromQuery] Query query, TransferDto obj)
        {
            query.filters = new List<string> { $"id in list({String.Join(",", obj.AccountsIds)})" };
            query.detail = true;
            var accounts = _accountService.GetAsync(query).Result;
            if (accounts != null && accounts.Count() == 2)
            {
                var transfer = obj.MapToTransfer(accounts);
                var result = _service.PostAsync(null, transfer).Result;
                return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
            }
            return BadRequest();

        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var result = _service.DeleteAsync(id).Result;
            return Ok(result.Id);
        }
    }
}

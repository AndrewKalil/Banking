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
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _service;
        private readonly IMapper _mapper;

        public AccountsController(IAccountService service, IMapper mapper)
        {
            _service = service;
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
        public ActionResult<Account> Post([FromQuery] Query query, AccountDto obj)
        {
            var objMappped = _mapper.Map(obj, new Account());
            var result = _service.PostAsync(query, objMappped).Result;
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);

        }

        [HttpPatch("{id}")]
        public ActionResult<Account> Patch([FromQuery] Query query, int id, AccountDto request)
        {
            var objMappped = _mapper.Map(request, new Account());
            var result = _service.UpdateAsync(query, id, objMappped).Result;
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var result = _service.DeleteAsync(id).Result;
            return Ok(result.Id);
        }

        [HttpDelete]
        public ActionResult DeleteMany([FromBody] List<int> ids)
        {
            if (_service.DeleteMany(ids).Result)
            {
                return Ok(ids);
            }
            else
            {
                throw new Exception("No Accounts found");
            }
        }
    }
}

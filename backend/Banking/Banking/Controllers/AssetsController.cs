using AutoMapper;
using Banking.Application.Interfaces;
using Banking.Domain.Entities.Dtos;
using Banking.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using Banking.Domain.Commons.Models;

namespace Banking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly IAssetService _service;
        private readonly IMapper _mapper;

        public AssetsController(IAssetService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<Asset>> Get([FromQuery] Query query)
        {
            var objects = _service.GetAsync(query).Result;
            return Ok(objects);
        }

        [HttpGet("{id}")]
        public ActionResult<Asset> Get([FromQuery] Query query, int id)
        {
            var obj = _service.GetAsync(id, query).Result;
            return Ok(obj);
        }

        [HttpPost]
        public ActionResult<Asset> Post([FromQuery] Query query, AssetDto obj)
        {
            var objMappped = _mapper.Map(obj, new Asset());
            var result = _service.PostAsync(query, objMappped).Result;
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        [HttpPatch("{id}")]
        public ActionResult<Asset> Patch([FromQuery] Query query, int id, AssetDto request)
        {
            var objMappped = _mapper.Map(request, new Asset());
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
                throw new Exception("No Assets found");
            }
        }
    }
}

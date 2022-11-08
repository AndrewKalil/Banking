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
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;
        private readonly IMapper _mapper;

        public CategoriesController(ICategoryService service, IMapper mapper)
        {
            _service = service;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<List<Category>> Get([FromQuery] Query query)
        {
            var objects = _service.GetAsync(query).Result;
            return Ok(objects);
        }

        [HttpGet("{id}")]
        public ActionResult<Category> Get([FromQuery] Query query, int id)
        {
            var obj = _service.GetAsync(id, query).Result;
            return Ok(obj);
        }

        [HttpPost]
        public ActionResult<Category> Post([FromQuery] Query query, CategoryDto obj)
        {
            var objMappped = _mapper.Map(obj, new Category());
            var result = _service.PostAsync(query, objMappped).Result;
            return CreatedAtAction(nameof(Get), new { id = result.Id }, result);

        }

        [HttpPatch("{id}")]
        public ActionResult<Category> Patch([FromQuery] Query query,int id, CategoryDto request)
        {
            var objMappped = _mapper.Map(request, new Category());
            var result = _service.UpdateAsync(query, id, objMappped).Result;
            return Ok(result);
        }

        //[HttpPatch]
        //public ActionResult UpdateMany(UpdateManyDto updateRequest)
        //{
        //    var result = _assetService.UpdateMany(updateRequest.FieldUpdates, updateRequest.Ids).Result;
        //    return Ok(result);
        //}

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var result = _service.DeleteAsync(id).Result;
            return Ok(result.Id);
        }
    }
}

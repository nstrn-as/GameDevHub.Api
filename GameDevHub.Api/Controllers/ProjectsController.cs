using GameDevHub.Api.DTOs;
using GameDevHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameDevHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectService _service;
        
        public ProjectsController(ProjectService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var projects = _service.GetAll();
            return Ok(projects.Select(_service.ToResponse));
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _service.GetById(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(_service.ToResponse(project));
        }

        [HttpPost]
        public IActionResult Create(CreateProjectRequest request)
        {
            var project = _service.Create(request);

            return CreatedAtAction(
                nameof(GetById), 
                new { id = project.Id }, 
                _service.ToResponse(project));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted  = _service.Delete(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

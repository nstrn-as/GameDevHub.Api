using GameDevHub.Api.DTOs;
using GameDevHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameDevHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly ProjectService _projectService;
        
        public ProjectsController(ProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var projects = _projectService.GetAll();
            var response = projects.Select(_projectService.ToResponse).ToList();
            return Ok(response);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var project = _projectService.GedById(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(_projectService.ToResponse(project));
        }

        [HttpPost]
        public IActionResult Create(CreateProjectRequest request)
        {
            var project = _projectService.Create(request);
            return Created($"/api/projects/{project.Id}", _projectService.ToResponse(project));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var deleted  = _projectService.Delete(id);

            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

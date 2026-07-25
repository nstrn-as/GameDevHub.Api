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
            return Ok(_projectService.GetAll());
        }

        [HttpPost]
        public IActionResult Create(CreateProjectRequest request)
        {
            var project = _projectService.Create(request);
            return Created($"/api/projects/{project.Id}", project);
        }
    }
}

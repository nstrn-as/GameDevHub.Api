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
        private readonly TaskService _taskService;

        public ProjectsController(ProjectService service, TaskService taskService)
        {
            _service = service;
            _taskService = taskService;
        }

        [HttpGet]
        [HttpGet]
        public IActionResult GetAll([FromQuery] ProjectQueryRequest request)
        {
            var projects = _service.GetAll(request);

            return Ok(projects);
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

        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateProjectRequest request)
        {
            var updated = _service.Update(id, request);

            if (!updated)
                return NotFound();

            return NoContent();
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

        [HttpGet("{projectId}/tasks")]
        public IActionResult GetTasks(int projectId)
        {
            var tasks = _taskService.GetByProjectId(projectId);

            return Ok(tasks);
        }

        [HttpPost("{projectId}/tasks")]
        public IActionResult CreateTask(int projectId,CreateTaskRequest request)
        {
            var task = _taskService.Create(projectId, request);

            if (task == null)
            {
                return NotFound();
            }

            return Created($"/api/tasks/{task.Id}", task);
        }
    }
}

using GameDevHub.Api.DTOs;
using GameDevHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameDevHub.Api.Controllers;

[ApiController]
[Route("api/projects/{projectId}/tasks")]
public class TasksController : ControllerBase
{
    private readonly TaskService _service;

    public TasksController(TaskService service)
    {
        _service = service;
    }

    // GET: api/projects/5/tasks
    [HttpGet]
    public async Task<IActionResult> GetByProjectId(int projectId)
    {
        var tasks = await _service.GetByProjectIdAsync(projectId);

        return Ok(tasks);
    }

    // POST: api/projects/5/tasks
    [HttpPost]
    public async Task<IActionResult> Create(
        int projectId,
        CreateTaskRequest request)
    {
        var task = await _service.CreateAsync(
            projectId,
            request);

        if (task == null)
        {
            return NotFound("Project not found.");
        }

        return Created(
            $"/api/projects/{projectId}/tasks/{task.Id}",
            task);
    }

    // GET: api/projects/5/tasks/10
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(
        int projectId,
        int id)
    {
        var task = await _service.GetByIdAsync(id);

        if (task == null || task.ProjectId != projectId)
        {
            return NotFound();
        }

        return Ok(task);
    }

    // PUT: api/projects/5/tasks/10
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int projectId,
        int id,
        UpdateTaskRequest request)
    {
        var task = await _service.GetByIdAsync(id);

        if (task == null || task.ProjectId != projectId)
        {
            return NotFound();
        }

        var updated = await _service.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE: api/projects/5/tasks/10
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(
        int projectId,
        int id)
    {
        var task = await _service.GetByIdAsync(id);

        if (task == null || task.ProjectId != projectId)
        {
            return NotFound();
        }

        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
using GameDevHub.Api.DTOs;
using GameDevHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameDevHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly ProjectService _service;

    public ProjectsController(ProjectService service)
    {
        _service = service;
    }

    // GET: api/projects
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] ProjectQueryRequest request)
    {
        var projects = await _service.GetAllAsync(request);

        return Ok(projects);
    }

    // GET: api/projects/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var project = await _service.GetByIdAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        return Ok(project);
    }

    // POST: api/projects
    [HttpPost]
    public async Task<IActionResult> Create(
        CreateProjectRequest request)
    {
        var project = await _service.CreateAsync(request);

        return Created(
            $"/api/projects/{project.Id}",
            project);
    }

    // PUT: api/projects/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        UpdateProjectRequest request)
    {
        var updated = await _service.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // DELETE: api/projects/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _service.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
using GameDevHub.Api.Data;
using GameDevHub.Api.DTOs;
using GameDevHub.Api.Models;

namespace GameDevHub.Api.Services;

public class ProjectService
{
    private readonly AppDbContext _context;

    public ProjectService(AppDbContext context)
    {
        _context = context;
    }

    public Project Create(CreateProjectRequest request)
    {
        var project = new Project
        {
            Title = request.Title,
            Description = request.Description,
            Engine = request.Engine,
            Genre = request.Genre,
            Status = ProjectStatus.Planning,
            CreatedDate = DateTime.Now,
            LastModified = DateTime.Now
        };

        _context.Projects.Add(project);

        _context.SaveChanges();

        return project;
    }

    public IEnumerable<Project> GetAll()
    {
        return _context.Projects.ToList();
    }

    public Project? GetById(int id)
    {
        return _context.Projects.FirstOrDefault(p => p.Id == id);
    }

    public bool Delete(int id)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == id);

        if (project == null)
        {
            return false;
        }
        
        _context.Projects.Remove(project);
        _context.SaveChanges();

        return true;
    }

    public ProjectResponse ToResponse(Project project)
    {
        return new ProjectResponse
        {
            Id = project.Id,
            Title = project.Title,
            Description = project.Description,
            Engine = project.Engine,
            Genre = project.Genre
        };
    }
}
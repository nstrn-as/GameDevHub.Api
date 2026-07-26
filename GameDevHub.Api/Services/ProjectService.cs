using GameDevHub.Api.DTOs;
using GameDevHub.Api.Models;

namespace GameDevHub.Api.Services;

public class ProjectService
{
    private readonly List<Project> _projects = [];

    public Project Create(CreateProjectRequest request)
    {
        var project = new Project
        {
            Id = _projects.Count + 1,
            Title = request.Title,
            Description = request.Description,
            Engine = request.Engine,
            Genre = request.Genre,
            Status = ProjectStatus.Planning,
            CreatedDate = DateTime.Now,
            LastModified = DateTime.Now
        };

        _projects.Add(project);

        return project;
    }

    public List<Project> GetAll()
    {
        return _projects;
    }

    public Project? GedById(int id)
    {
        return _projects.FirstOrDefault(p => p.Id == id);
    }

    public bool Delete(int id)
    {
        var project = _projects.FirstOrDefault(p => p.Id == id);

        if (project == null)
        {
            return false;
        }

        _projects.Remove(project);

        return true;
    }
}
using GameDevHub.Api.Data;
using GameDevHub.Api.DTOs;
using GameDevHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameDevHub.Api.Services;

public class ProjectService
{
    private readonly AppDbContext _context;

    public ProjectService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProjectResponse>> GetAllAsync(
        ProjectQueryRequest request)
    {
        IQueryable<Project> query = _context.Projects;

        // Search
        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            query = query.Where(p =>
                p.Title.Contains(request.Search) ||
                p.Description.Contains(request.Search));
        }

        // Filter by engine
        if (!string.IsNullOrWhiteSpace(request.Engine))
        {
            query = query.Where(p => p.Engine == request.Engine);
        }

        // Filter by status
        if (request.Status.HasValue)
        {
            query = query.Where(p => p.Status == request.Status.Value);
        }

        // Sorting
        query = request.Sort?.ToLower() switch
        {
            "title" => request.Descending
                ? query.OrderByDescending(p => p.Title)
                : query.OrderBy(p => p.Title),

            "createddate" => request.Descending
                ? query.OrderByDescending(p => p.CreatedDate)
                : query.OrderBy(p => p.CreatedDate),

            "lastmodified" => request.Descending
                ? query.OrderByDescending(p => p.LastModified)
                : query.OrderBy(p => p.LastModified),

            _ => query.OrderBy(p => p.Id)
        };

        // Pagination
        var projects = await query
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        return projects.Select(ToResponse);
    }

    public async Task<ProjectResponse?> GetByIdAsync(int id)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
        {
            return null;
        }

        return ToResponse(project);
    }

    public async Task<ProjectResponse> CreateAsync(
        CreateProjectRequest request)
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

        await _context.SaveChangesAsync();

        return ToResponse(project);
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateProjectRequest request)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
        {
            return false;
        }

        project.Title = request.Title;
        project.Description = request.Description;
        project.Engine = request.Engine;
        project.Genre = request.Genre;
        project.LastModified = DateTime.Now;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var project = await _context.Projects
            .FirstOrDefaultAsync(p => p.Id == id);

        if (project == null)
        {
            return false;
        }

        _context.Projects.Remove(project);

        await _context.SaveChangesAsync();

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
            Genre = project.Genre,
            Status = project.Status,
            CreatedDate = project.CreatedDate,
            LastModified = project.LastModified
        };
    }
}
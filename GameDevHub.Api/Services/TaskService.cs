using GameDevHub.Api.Data;
using GameDevHub.Api.DTOs;
using GameDevHub.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace GameDevHub.Api.Services;

public class TaskService
{
    private readonly AppDbContext _context;

    public TaskService(AppDbContext context)
    {
        _context = context;
    }

    public TaskResponse? Create(int projectId, CreateTaskRequest request)
    {
        var project = _context.Projects.FirstOrDefault(p => p.Id == projectId);

        if (project == null)
        {
            return null;
        }

        var task = new TaskItem
        {
            ProjectId = projectId,
            Title = request.Title,
            Description = request.Description,
            IsCompleted = false,
            CreatedDate = DateTime.Now,
            LastModified = DateTime.Now
        };

        _context.Tasks.Add(task);
        _context.SaveChanges();

        return ToResponse(task);
    }

    public IEnumerable<TaskResponse> GetByProjectId(int projectId)
    {
        return _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .Select(ToResponse)
            .ToList();
    }

    public TaskResponse? GetById(int id)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return null;
        }

        return ToResponse(task);
    }

    public bool Update(int id, UpdateTaskRequest request)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        task.Title = request.Title;
        task.Description = request.Description;
        task.IsCompleted = request.IsCompleted;
        task.LastModified = DateTime.Now;

        _context.SaveChanges();

        return true;
    }

    public bool Delete(int id)
    {
        var task = _context.Tasks.FirstOrDefault(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        _context.Tasks.Remove(task);
        _context.SaveChanges();

        return true;
    }

    private static TaskResponse ToResponse(TaskItem task)
    {
        return new TaskResponse
        {
            Id = task.Id,
            ProjectId = task.ProjectId,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            CreatedDate = task.CreatedDate,
            LastModified = task.LastModified
        };
    }
}
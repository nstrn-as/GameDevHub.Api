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

    public async Task<IEnumerable<TaskItem>> GetByProjectIdAsync(int projectId)
    {
        return await _context.Tasks
            .Where(t => t.ProjectId == projectId)
            .ToListAsync();
    }

    public async Task<TaskItem?> GetByIdAsync(int id)
    {
        return await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id);
    }

    public async Task<TaskItem?> CreateAsync(
        int projectId,
        CreateTaskRequest request)
    {
        // Make sure the project exists
        var projectExists = await _context.Projects
            .AnyAsync(p => p.Id == projectId);

        if (!projectExists)
        {
            return null;
        }

        var task = new TaskItem
        {
            ProjectId = projectId,
            Title = request.Title,
            Description = request.Description,
            Status = TasksStatus.Todo,
            CreatedDate = DateTime.Now,
            LastModified = DateTime.Now
        };

        _context.Tasks.Add(task);

        await _context.SaveChangesAsync();

        return task;
    }

    public async Task<bool> UpdateAsync(
        int id,
        UpdateTaskRequest request)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        task.Title = request.Title;
        task.Description = request.Description;
        task.Status = request.Status;
        task.LastModified = DateTime.Now;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var task = await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id);

        if (task == null)
        {
            return false;
        }

        _context.Tasks.Remove(task);

        await _context.SaveChangesAsync();

        return true;
    }
}
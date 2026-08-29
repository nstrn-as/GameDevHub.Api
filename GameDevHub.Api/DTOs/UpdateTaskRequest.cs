using GameDevHub.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace GameDevHub.Api.DTOs;

public class UpdateTaskRequest
{
    [Required]
    [StringLength(100, MinimumLength = 3)]
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public TasksStatus Status { get; set; }
}
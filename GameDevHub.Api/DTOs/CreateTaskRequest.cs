using System.ComponentModel.DataAnnotations;
using GameDevHub.Api.Models;

namespace GameDevHub.Api.DTOs
{
    public class CreateTaskRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        public DateTime? DueDate { get; set; }
    }
}
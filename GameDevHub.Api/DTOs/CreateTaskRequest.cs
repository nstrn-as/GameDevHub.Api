using GameDevHub.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace GameDevHub.Api.DTOs
{
    public class CreateTaskRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public TasksStatus Status { get; set; } = TasksStatus.Todo;
    }
}

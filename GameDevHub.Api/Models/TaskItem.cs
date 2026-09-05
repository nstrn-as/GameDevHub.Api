namespace GameDevHub.Api.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public int ProjectId { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public TasksStatus Status { get; set; }
        public TaskPriority Priority { get; set; } = TaskPriority.Medium;
        public DateTime? DueDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
        public Project? Project { get; set; }
    }
}
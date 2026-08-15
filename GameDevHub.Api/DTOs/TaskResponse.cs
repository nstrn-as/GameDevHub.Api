namespace GameDevHub.Api.DTOs;

public class TaskResponse
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    public string Title { get; set; } = "";
    public string Description { get; set; } = "";
    public bool IsCompleted { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime LastModified { get; set; }
}
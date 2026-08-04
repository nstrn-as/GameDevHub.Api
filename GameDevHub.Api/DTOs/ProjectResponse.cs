using GameDevHub.Api.Models;

namespace GameDevHub.Api.DTOs
{
    public class ProjectResponse
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Engine { get; set; } = "";
        public string Genre { get; set; } = "";
        public ProjectStatus Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
    }
}

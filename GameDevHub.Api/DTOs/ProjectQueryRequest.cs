using GameDevHub.Api.Models;

namespace GameDevHub.Api.DTOs
{
    public class ProjectQueryRequest
    {
        public string? Search {  get; set; }
        public string? Engine { get; set; }
        public ProjectStatus? Status { get; set; }
        public string? Sort { get; set; }
        public bool Descending { get; set; } = false;
        public int Page { get; set; } = 1;
        public int PageSize { get; set; } = 10;
    }
}

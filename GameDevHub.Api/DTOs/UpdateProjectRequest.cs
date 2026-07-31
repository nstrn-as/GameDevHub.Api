using System.ComponentModel.DataAnnotations;

namespace GameDevHub.Api.DTOs
{
    public class UpdateProjectRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        [Required]
        public string Engine { get; set; } = "";
        [Required]
        public string Genre { get; set; } = "";
    }
}

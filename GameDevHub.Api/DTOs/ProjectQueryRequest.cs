using GameDevHub.Api.Models;
using System.ComponentModel.DataAnnotations;

namespace GameDevHub.Api.DTOs;

public class ProjectQueryRequest
{
    public string? Search { get; set; }
    public string? Engine { get; set; }
    public ProjectStatus? Status { get; set; }
    public string? Sort { get; set; }
    public bool Descending { get; set; } = false;
    [Range(1, int.MaxValue)]
    public int Page { get; set; } = 1;
    [Range(1, 100)]
    public int PageSize { get; set; } = 10;
}
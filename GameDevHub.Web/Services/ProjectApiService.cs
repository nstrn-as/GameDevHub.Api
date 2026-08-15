using System.Net.Http.Json;
using GameDevHub.Web.Models;

namespace GameDevHub.Web.Services
{
    public class ProjectApiService
    {
        private readonly HttpClient _http;

        public ProjectApiService(HttpClient http)
        {
            _http = http;
        }

        public async Task<List<ProjectResponse>> GetProjectsAsync()
        {
            return await _http.GetFromJsonAsync<List<ProjectResponse>>("api/projects")
                ?? new List<ProjectResponse>();
        }
    }
}

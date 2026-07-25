using GameDevHub.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace GameDevHub.Api.Controllers
{
    [ApiController]
    [Route("api/[controller")]
    public class ProjectsController: ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll(ProjectService service)
        {
            return Ok(service.GetAll());
        }
    }
}


using GameDevHub.Api.DTOs;
using GameDevHub.Api.Services;

namespace GameDevHub.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddSingleton<ProjectService>();
            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();
            app.MapPost("/projects",
            (ProjectService service,
            CreateProjectRequest request) =>
            {
                var project = service.Create(request);

                return Results.Created($"/projects/{project.Id}", project);
            });

            app.Run();
        }
    }
}

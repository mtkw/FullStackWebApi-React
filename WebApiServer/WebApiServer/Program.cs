using DataAccess.Data;
using Microsoft.EntityFrameworkCore;
using WebApiServer.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


//Add CORS
builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});


// app.UseHttpsRedirection();

// app.UseAuthorization();

app.MapControllers();

DbInitializer.InitDb(app);

app.Run();

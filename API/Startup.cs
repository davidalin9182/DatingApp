using API.Data;
using Microsoft.EntityFrameworkCore;

namespace API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        // Constructor receives IConfiguration (appsettings.json etc.)
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // Register services with the DI container here
        public void ConfigureServices(IServiceCollection services)
        {
            // Add MVC / controllers
            services.AddControllers();
            services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });

           // Add Swagger
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // Example: Add CORS policy
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAll", builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
                });
            });

            // Example: Add DbContext, Identity, Authentication, etc.
            // services.AddDbContext<MyDbContext>(options => ...);
            // services.AddAuthentication(...);
            // services.AddScoped<IMyService, MyService>();
        }

        // Configure the HTTP request pipeline here
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                // Swagger UI in development
                 app.UseSwagger();
                 app.UseSwaggerUI(c => 
                 {
                     c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                 });
            }
            /// else
            /// {
            ///     app.UseExceptionHandler("/Home/Error");
            ///     app.UseHsts();
            /// }

            app.UseHttpsRedirection();
            ///app.UseStaticFiles();

            app.UseRouting();

            // If using authentication/authorization
            // app.UseAuthentication();
            // app.UseAuthorization();

            // Use CORS if registered
            ///app.UseCors("AllowAll");

            // Typical endpoints mapping for controllers
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();

                // or map Razor Pages / default route if using MVC
                // endpoints.MapControllerRoute(
                //     name: "default",
                //     pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}

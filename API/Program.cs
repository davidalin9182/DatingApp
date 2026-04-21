using System.Security.Cryptography.X509Certificates;
using API.Data;
using Microsoft.EntityFrameworkCore;
namespace API
{
    public class Program
    {
      /*   public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        } */
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;
            try
            {
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync(); // create database if it doesn't exist and apply any pending migrations
                await Seed.SeedUsers(context); // seed database with initial data 
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error occurred during seeding the database");
            }
            await host.RunAsync();
        }
        // // This is the classic host builder used before the minimal hosting model.
        // public static IHostBuilder CreateHostBuilder(string[] args) =>
        //     Host.CreateDefaultBuilder(args)
        //         .ConfigureWebHostDefaults(webBuilder =>
        //         {
        //             // Use Startup class to configure services and pipeline
        //             webBuilder.UseStartup<Startup>();
        //         });
        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.ConfigureKestrel(serverOptions =>
                    {
                        serverOptions.ConfigureHttpsDefaults(httpsOptions =>
                        {
                            httpsOptions.ServerCertificate = new X509Certificate2("../client/ssl/certificate.pfx", "");
                        });
                    });
                    webBuilder.UseStartup<Startup>();
            });
    }
}
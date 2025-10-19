using System.Security.Cryptography.X509Certificates;

namespace API
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
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
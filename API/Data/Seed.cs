using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (context.Users.Any()) return;

            var usersData = System.IO.File.ReadAllText("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(usersData);  
            foreach (var user in users)
            {
                using var hmac = new System.Security.Cryptography.HMACSHA512();
                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("password9182"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
            }
            await context.SaveChangesAsync();

        }
    }
}
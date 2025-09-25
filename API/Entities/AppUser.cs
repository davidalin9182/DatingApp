using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; } // needs to be Id or ID for EntityFramework core to recognize it as primary key
        public string UserName { get; set; } // Username property is case sensitive for asp.net core identity
        
    }
}
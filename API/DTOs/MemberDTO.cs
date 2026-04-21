using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberDTO
    {
        public int Id { get; set; } // needs to be Id or ID for EntityFramework core to recognize it as primary key
        public string UserName { get; set; } // Username property is case sensitive for asp.net core identity
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; } 
        public DateTime LastActive { get; set; } 
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<PhotoDTO> Photos { get; set; }

   
    }
}
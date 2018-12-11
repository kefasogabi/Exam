using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Exam.Models
{
    public class User 
    {
        
        public int Id { get; set; }
         [Required]
        public string Loginid { get; set; } 

         [Required]
        public string Email { get; set; }
        
        public string Phone { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
      
        public int? Score { get; set; }  
        public int? TimeSpent { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

      
    }
}
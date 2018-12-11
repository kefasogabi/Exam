using System.ComponentModel.DataAnnotations;

namespace Exam.Models
{
    public class Admin
    {
      
        public int Id { get; set; }
         [Required]
        public string Loginid { get; set; } 

         [Required]
        public string Email { get; set; }
        
        public string Phone { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public string Role { get; set; }
      
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

    }
}
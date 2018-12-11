using System.ComponentModel.DataAnnotations;

namespace Exam.Dtos
{
    public class UserDto
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
        public string Password { get; set; }
    }
}
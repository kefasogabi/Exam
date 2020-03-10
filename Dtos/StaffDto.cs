using System.ComponentModel.DataAnnotations;

namespace Exam.Dtos
{
    public class StaffDto
    {
        public int Id { get; set; }
        [Required]
        public string Loginid { get; set; } 

        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? Score { get; set; }  
        public int? TimeSpent { get; set; }
        public int SexId { get; set; }
        public SexDto Sex { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
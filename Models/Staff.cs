using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace Exam.Models
{
    public class Staff 
    {
        
        public int Id { get; set; }
         [Required]
        public string Loginid { get; set; }
         [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? Score { get; set; }
        public int? TimeSpent { get; set; }
        public string Username { get; set; }
        public int SexId { get; set; }
        [ForeignKey("SexId")]
        public Sex  Sex { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public bool IsEmailVerified { get; set; }
        public System.Guid ActivationCode { get; set; }

      
    }
}
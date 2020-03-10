using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Exam.Models
{
    public class Account
    {
        public class LoginViewModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            public string Password { get; set; }

        }

        public class RegisterViewModel
        {
            public string Id { get; set; }
            [Required]
            [EmailAddress]
            public string Email { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Address { get; set; }
            public string DateOfBirth { get; set; }
            public string Role { get; set; }
            public int? SexId { get; set; }
            [ForeignKey("SexId")]
            public Sex  Sex { get; set; }
            public bool IsEmailVerified { get; set; }
            public Guid ActivationCode { get; set; }
            [Required]
            public string Password { get; set; }
         

           
        }

        public class ChangePasswordViewModel
        {
            // public string Id { get; set; }
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }
    }
}
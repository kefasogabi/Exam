using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exam.Models
{
        public class ApplicationUser : IdentityUser
        {
                public string FirstName { get; set; }
                public string LastName { get; set; }
                public string Address { get; set; }
                public string DateOfBirth { get; set; }
                public bool IsEmailVerified { get; set; }
                public Guid ActivationCode { get; set; }
                public int? SexId { get; set; }
                [ForeignKey("SexId")]
                public Sex  Sex { get; set; }
        }
   
  
        public class ExamDbContext : IdentityDbContext<ApplicationUser>
        {
                public ExamDbContext()
                {

                }
       
                public ExamDbContext(DbContextOptions<ExamDbContext> options)
                : base(options)
                {

                }

                public DbSet<Question> Questions { get; set; }
                public DbSet<Staff> staffs { get; set; }
                public DbSet<Sex> Sex { get; set; }
                
               


                protected override void OnModelCreating(ModelBuilder modelBuilder)
                {

                      base.OnModelCreating(modelBuilder);
                      modelBuilder.Entity<ApplicationUser>().ToTable("Users");

                        modelBuilder.Entity<IdentityRole>().ToTable("Roles");

                        modelBuilder.Entity<IdentityUserRole<string>>().ToTable("UserRoles");

                        modelBuilder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");

                        modelBuilder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");

                        modelBuilder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");

                        modelBuilder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
                        
                      

                      
                }
        }
    
}
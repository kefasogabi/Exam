using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Exam.Models
{
   
  
        public class ExamDbContext : DbContext
        {
       
        public ExamDbContext(DbContextOptions<ExamDbContext> options)
                : base(options)
            {
            }

                public DbSet<Question> Questions { get; set; }
                public DbSet<User> Users { get; set; }
                
                public DbSet<Admin> Admin { get; set; }


                protected override void OnModelCreating(ModelBuilder modelBuilder)
                {

                      
                      
                      

                      
                }
        }
    
}
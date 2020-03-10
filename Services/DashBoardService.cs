using System.Linq;
using Exam.Interface;
using Exam.Models;
using Microsoft.AspNetCore.Identity;

namespace Exam.Services
{
    public class DashBoardService : IDashBoardService
    {
        private readonly ExamDbContext context;
        private readonly UserManager<ApplicationUser> userManager;
        public DashBoardService(ExamDbContext context, UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
            this.context = context;

        }


        public int TotalMaleStaffs()
        {
            var male = context.staffs.Where(c => c.Sex.Name == "Male").Count();
            return male;
        }

        public int TotalFemaleStaffs()
        {
            var female = context.staffs.Where(c => c.Sex.Name == "Female").Count();
            return female;
        }

        public int AllStaff()
        {
            var staffs = context.staffs.Count();
            return staffs;
        }

        public int AllAdmin()
        {
            var admin = userManager.Users.Count();
            return admin;
        }

        public int[] AdminGenders()
        {
            var male = userManager.Users.Where(c => c.Sex.Name == "Male").Count();
            var female = userManager.Users.Where(c => c.Sex.Name == "Female").Count();

            var all = new int[] {male, female};
            return all;
        }

        

    }
}
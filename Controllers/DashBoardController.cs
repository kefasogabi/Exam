using Exam.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Controllers
{
     [Authorize]
    public class DashBoardController : Controller
    {
        private readonly IDashBoardService dashBoardService;
        public DashBoardController(IDashBoardService dashBoardService)
        {
            this.dashBoardService = dashBoardService;

        }

        [HttpGet("/api/maleStaffs")]
        public IActionResult GetMaleStaffs()
        {
            var male = dashBoardService.TotalMaleStaffs();
            return Ok(male);
        }

        [HttpGet("/api/femaleStaffs")]
        public IActionResult GetFemaleStaffs()
        {
            var female = dashBoardService.TotalFemaleStaffs();
            return Ok(female);
        }

        [HttpGet("/api/allStaffs")]
        public IActionResult GetAllStaffs()
        {
            var all = dashBoardService.AllStaff();
            return Ok(all);
        }

        [HttpGet("/api/allAdmins")]
        public IActionResult GetAllAdmins()
        {
            var all = dashBoardService.AllAdmin();
            return Ok(all);
        }

        [HttpGet("/api/adminGenders")]
        public IActionResult AdminGenders()
        {
            var genders = dashBoardService.AdminGenders();
            return Ok(genders);
        }



    }
}
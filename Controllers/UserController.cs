using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Exam.Dtos;
using Exam.Helper;
using Exam.Interface;
using Exam.Models;
using Exam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Exam.Controllers
{
    
    [Route("[controller]")]
    public class UserController : Controller
    {
          private IStaffService _userService;
        private IMapper _mapper;
        private readonly IEmailSender emailsender;
        private readonly AppSettings _appSettings;
        private readonly ClaimsPrincipal caller;

        public UserController(
            IStaffService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings,
            IHttpContextAccessor httpContextAccessor,
            IEmailSender emailsender)
        {
            _userService = userService;
            _mapper = mapper;
            caller = httpContextAccessor.HttpContext.User;
            this.emailsender = emailsender;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("/api/Login")]
        public IActionResult Authenticate([FromBody]StaffDto StaffDto)
        {
            var staff = _userService.Authenticate(StaffDto.Loginid, StaffDto.Password);

            if (staff == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, staff.Id.ToString()),
                     new Claim(ClaimTypes.GivenName, staff.Username.ToString()),
                      new Claim(ClaimTypes.Email, staff.Email.ToString()),
                      new Claim(ClaimTypes.NameIdentifier, staff.Loginid.ToString()),
                  

                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                Issuer = "https://localhost:5001/",
		        Audience = "https://localhost:5001/",
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new { token = tokenString });
        }

        [AllowAnonymous]
        [HttpPost("/api/send")]
        public async Task<IActionResult> SendMail([FromForm]MailRequest request)
        {
            try
            {
                await emailsender.SendEmailAsync(request);
                return Ok("Mail Sent");
            }
            catch (Exception ex)
            {
                throw ex;
            }
                
        }

         [AllowAnonymous]
        [HttpPost("/api/Register")]
        public IActionResult Register([FromBody]StaffDto staffDto)
        {
            // map dto to entity
            var staff = _mapper.Map<Staff>(staffDto);

            try 
            {
                // save 
                _userService.Create(staff, staffDto.Password);
                return Ok(staff);
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
               throw ex;
            }
        }

        
        [HttpGet]
        public IActionResult GetAll()
        {
            var staffs =  _userService.GetAll();
            var staffDtos = _mapper.Map<IList<StaffDto>>(staffs);
            return Ok(staffDtos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var staff = await _userService.GetByIdAsync(id);
            var staffDto = _mapper.Map<StaffDto>(staff);
            return Ok(staffDto);
        }

        [HttpGet("/api/getProfile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
            
           var staff = await _userService.GetByIdAsync(Convert.ToInt32(userId.Value));
           var staffDto = _mapper.Map<StaffDto>(staff);
            
            return Ok(staffDto );
        }

        [HttpGet("/api/GetStaff/{loginId}")]
        public async Task<IActionResult> GetStaff(string loginId)
        {
            var staff = await _userService.GetStaff(loginId);
            if(staff == null)
                return NotFound("User Not Found");
            var staffDto = _mapper.Map<StaffDto>(staff);
            return Ok(staffDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]StaffDto staffDto)
        {
            // map dto to entity and set id
            var staff = _mapper.Map<Staff>(staffDto);
            staff.Id = id;

            try 
            {
                // save 
                _userService.Update(staff, staffDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("/api/SubmitScore")]
        public IActionResult SubmitScore( [FromBody] ResultDto resultDto)
        {
            var staff = _mapper.Map<Result>(resultDto);
             var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
            staff.Id = Convert.ToInt32(userId.Value);
            
            try 
            {
                // save 
                _userService.SubmitScore(staff);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

         [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }

    }
}
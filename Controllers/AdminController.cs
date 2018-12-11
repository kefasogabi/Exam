using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using Exam.Dtos;
using Exam.Helper;
using Exam.Models;
using Exam.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;

namespace Exam.Controllers
{
    [Authorize]
    [Route("[controller]")]
    public class AdminController : Controller
    {
        private  IAdminService _adminService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public AdminController(
            IAdminService adminService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _adminService = adminService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


         [AllowAnonymous]
        [HttpPost("/api/admin/Login")]
        public IActionResult Authenticate([FromBody]AdminDto adminDto)
        {
            var admin = _adminService.Authenticate(adminDto.Loginid, adminDto.Password);

            if (admin == null)
                return Unauthorized();

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] 
                {
                    new Claim(ClaimTypes.Name, admin.Id.ToString()),
                     new Claim(ClaimTypes.GivenName, admin.Username.ToString()),
                      new Claim(ClaimTypes.Email, admin.Email.ToString()),
                      new Claim(ClaimTypes.NameIdentifier, admin.Loginid.ToString()),
                      new Claim(ClaimTypes.Role, "Admin"),

                  

                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new {
                Id = admin.Id,
                Username = admin.Username,
                 Loginid = admin.Loginid,
                 Email = admin.Email,
                 City = admin.City,
                 Phone = admin.Phone,
                 Address = admin.Address,
                 Role = admin.Role,
                Token = tokenString,
               
            });
        }

         [AllowAnonymous]
        [HttpPost("/api/admin/Register")]
        public IActionResult Register([FromBody]AdminDto adminDto)
        {
            // map dto to entity
            var admin = _mapper.Map<Admin>(adminDto);

            try 
            {
                // save 
                _adminService.Create(admin, adminDto.Password);
                return Ok();
            } 
            catch(AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

       
    }
}
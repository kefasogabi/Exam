using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Exam.Helper;
using Exam.Interface;
using Exam.Models;
using Exam.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authorization;
using static Exam.Models.Account;

namespace Exam.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly SignInManager<ApplicationUser> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IHostingEnvironment host;
        private readonly IEmailSender emailSender;
        private readonly ClaimsPrincipal caller;
        private readonly AppSettings appSettings;
        public AccountController(
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager,
            IOptions<AppSettings> appSettings,
            RoleManager<IdentityRole> roleManager,
            IHostingEnvironment host,
            IHttpContextAccessor httpContextAccessor,
            IEmailSender emailSender
        )
        {

            this.userManager = userManager;
            this.signInManager = signInManager;
            this.roleManager = roleManager;
            this.host = host;
            this.emailSender = emailSender;
            caller = httpContextAccessor.HttpContext.User;
            this.appSettings = appSettings.Value;
        }

            [HttpPost]
            public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
            {
               
               bool x = await roleManager.RoleExistsAsync("Admin");
                if (!x)
                {
                    var role = new IdentityRole();
                    role.Name = "Admin";
                    await roleManager.CreateAsync(role);
                }

               if(userManager.Users.Any(y => y.Email == model.Email))
                    return BadRequest("Email " + model.Email + " is already taken");

                    var user = new ApplicationUser {
                        UserName = model.Email,
                        Email = model.Email,
                        FirstName = model.FirstName,
                        SexId = model.SexId,
                        LastName = model.LastName,
                        Address = model.Address,
                        DateOfBirth = model.DateOfBirth,
                        IsEmailVerified = false,
                        ActivationCode = Guid.NewGuid()
                            
                        };

                    IdentityResult result = await userManager.CreateAsync(user, model.Password);
                //    await emailSender.SendEmailAsync(model.Email, user.ActivationCode.ToString());
                  await userManager.AddToRoleAsync(user, "Admin" );

                    if(!result.Succeeded){
                        var err = "Uknown Error occured when processing Your Request";
                        return BadRequest(err);
                    }
                    
                   return Ok(model);
               
            }


            [AllowAnonymous]
            [HttpPost]
            public async Task<IActionResult> Login([FromBody] LoginViewModel model)
            {

                var user = await userManager.FindByNameAsync(model.Email);
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);

                if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
                {
                    //Get role assigned to the user
                    var role = await userManager.GetRolesAsync(user);
                    IdentityOptions _options = new IdentityOptions();
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim(ClaimTypes.Name,user.Id.ToString()),
                            new Claim(ClaimTypes.GivenName,user.FirstName.ToString()),
                            new Claim(ClaimTypes.NameIdentifier,user.LastName.ToString()),
                            new Claim(_options.ClaimsIdentity.RoleClaimType,role.FirstOrDefault())
                        }),
                        Expires = DateTime.UtcNow.AddDays(7),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
                        Issuer = "https://localhost:5001/",
		                Audience = "https://localhost:5001/",
                    };
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var tokenString = tokenHandler.WriteToken(token);
                    return Ok(new{ 
                        token = tokenString,
                        role = role.FirstOrDefault()
                                 });

                }
                else
                    return BadRequest(new { message = "Username or password is incorrect." });
            }

            [HttpGet]
            public async Task<IActionResult> GetAll()
            {
                var users = await userManager.Users.ToListAsync();
                
                return Ok(users);
            } 


            [HttpGet("{id}")]
            public async Task<IActionResult> GetById(string id)
            {
                
                var user = await userManager.Users.SingleOrDefaultAsync(c => c.Id == id);
                                                    
                if(user == null)
                {
                    return NotFound();
                }

                return Ok(user);
            }

            [HttpGet]
            public async Task<IActionResult>  Profile()
            {
                
                    var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);

                    var user = await userManager.Users.SingleOrDefaultAsync( c => c.Id == userId.Value);

                    return Ok(user);
                
            }


            [HttpPut("{id}")]
            public async Task<IActionResult> Update([FromBody] RegisterViewModel model )
            {
               
                var user = await userManager.FindByIdAsync(model.Id);

                if(user == null)
                {
                     return NotFound();
                }
               

                if(model.Email != user.Email )
                {
                    // email has changed so check if the new email is already taken
                    if(userManager.Users.Any(c => c.Email == model.Email))
                    {
                        return BadRequest("Email " + model.Email + " is already taken");
                    }
                }
                
                // update user property
                user.Email = model.Email;
                user.UserName = model.Email;
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Address = model.Address;
                user.DateOfBirth = model.DateOfBirth;

               await userManager.UpdateAsync(user);
              
                return Ok();
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> Delete(string id)
            {
                var user = await userManager.Users.SingleOrDefaultAsync(c => c.Id == id);

                if(user == null)
                {
                    return NotFound();
                }

                    await userManager.DeleteAsync(user);

                return Ok();
            }

            [HttpPost]
            public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
            {
                if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }
                    
                    
                    var userId = caller.Claims.Single(c => c.Type == ClaimTypes.Name);
                    var user = await userManager.Users.SingleOrDefaultAsync( c => c.Id == userId.Value);
                    
                    if (user == null)
                    {
                        BadRequest("User Not Found");
                    }

                    var changePasswordResult = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (!changePasswordResult.Succeeded)
                    {
                        var err = "Uknown Error occured when processing Your Request";
                        return BadRequest(err);
                    }
                    await signInManager.SignInAsync(user, isPersistent: false);
                    
                return Ok(model);
            }





    }


    
}
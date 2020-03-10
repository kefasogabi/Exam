using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exam.Helper;
using Exam.Interface;
using Exam.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Services
{

    public class StaffService : IStaffService
    {

        private readonly ExamDbContext context;


        private readonly IEmailSender emailsender;

        public StaffService(ExamDbContext context, IEmailSender emailsender)
        {
            this.emailsender = emailsender;

            this.context = context;

        }

        public Staff Authenticate(string loginid, string password)
        {
            if (string.IsNullOrEmpty(loginid) || string.IsNullOrEmpty(password))
                return null;

            var staff = context.staffs.SingleOrDefault(x => x.Loginid == loginid);

            // check if username exists
            if (staff == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, staff.PasswordHash, staff.PasswordSalt))
                return null;

            // authentication successful
            return staff;
        }

        public IEnumerable<Staff> GetAll()
        {
            return context.staffs;
        }

        public Staff GetById(int id)
        {
            return context.staffs.Find(id);
        }

        public Staff Create(Staff staff, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (context.staffs.Any(x => x.Loginid == staff.Loginid))
                throw new AppException("LoginId " + staff.Loginid + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            staff.IsEmailVerified = false;
            staff.ActivationCode = Guid.NewGuid();
            staff.PasswordHash = passwordHash;
            staff.PasswordSalt = passwordSalt;
            context.staffs.Add(staff);
            context.SaveChanges();

            // await emailsender.SendEmailAsync(staff.Email, staff.ActivationCode.ToString());

            return staff;
        }





        public void Update(Staff staffParam, string password = null)
        {
            var staff = context.staffs.Find(staffParam.Id);

            if (staff == null)
                throw new AppException("User not found");

            if (staffParam.Loginid != staff.Loginid)
            {
                // username has changed so check if the new username is already taken
                if (context.staffs.Any(x => x.Loginid == staffParam.Loginid))
                    throw new AppException("LoginId " + staffParam.Loginid + " is already taken");
            }

            // update user properties
            staff.Loginid = staffParam.Loginid;
            staff.Email = staffParam.Email;
            staff.Username = staffParam.Username;
            staff.Phone = staffParam.Phone;
            staff.TimeSpent = staffParam.TimeSpent;
            staff.Score = staffParam.Score;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                staff.PasswordHash = passwordHash;
                staff.PasswordSalt = passwordSalt;
            }

            context.staffs.Update(staff);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            var staff = context.staffs.SingleOrDefault(c => c.Id == id);
            if (staff != null)
            {
                context.staffs.Remove(staff);
                context.SaveChanges();
            }
        }

        public async Task<Staff> GetStaff(string loginId)
        {
            var staff = await context.staffs.Include(s => s.Sex)
                                            .SingleOrDefaultAsync(c => c.Loginid == loginId);
            return staff;
        }



        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

    }
}
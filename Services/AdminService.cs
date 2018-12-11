using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Exam.Helper;
using Exam.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace Exam.Services
{
    public interface IAdminService
    {
         
        Admin Authenticate(string loginid, string password);
        Admin GetById(int id);
        Admin Create(Admin admin, string password);
        void Update(Admin admin, string password = null);
        void Delete(int id);
    }

    public class AdminService : IAdminService
    {
         private readonly ExamDbContext context;

      

        public AdminService(ExamDbContext context )
        {
          
            this.context = context;

        }

        public Admin Authenticate(string loginid, string password)
        {
            if (string.IsNullOrEmpty(loginid) || string.IsNullOrEmpty(password))
                return null;

            var admin = context.Admin.SingleOrDefault(x => x.Loginid == loginid);

            // check if username exists
            if (admin == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, admin.PasswordHash, admin.PasswordSalt))
                return null;

            // authentication successful
            return admin;
        }

        public IEnumerable<Admin> GetAll()
        {
            return context.Admin;
        }

        public Admin GetById(int id)
        {
            return context.Admin.Find(id);
        }

        public Admin Create(Admin admin, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (context.Admin.Any(x => x.Loginid == admin.Loginid))
                throw new AppException("LoginId " + admin.Loginid + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            admin.PasswordHash = passwordHash;
            admin.PasswordSalt = passwordSalt;

            context.Admin.Add(admin);
            context.SaveChanges();

            return admin;
        }

        

        

        public void Update(Admin adminParam, string password = null)
        {
            var admin = context.Admin.Find(adminParam.Id);

            if (admin == null)
                throw new AppException("User not found");

            if (adminParam.Loginid != admin.Loginid)
            {
                // username has changed so check if the new username is already taken
                if (context.Admin.Any(x => x.Loginid == adminParam.Loginid))
                    throw new AppException("LoginId " + adminParam.Loginid + " is already taken");
            }

            // update user properties
            admin.Loginid = adminParam.Loginid;
            admin.Email = adminParam.Email;
            admin.Username = adminParam.Username;
            admin.Address = adminParam.Address;
            admin.Phone = adminParam.Phone;
            admin.City = adminParam.City;
           

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                admin.PasswordHash = passwordHash;
                admin.PasswordSalt = passwordSalt;
            }

            context.Admin.Update(admin);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            var admin = context.Admin.SingleOrDefault(c => c.Id == id);
            if (admin != null)
            {
                context.Admin.Remove(admin);
                context.SaveChanges();
            }
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
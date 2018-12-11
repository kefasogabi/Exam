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


    public interface IUserService
    {
        User Authenticate(string loginid, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }
    public class UserService : IUserService
    {

        private readonly ExamDbContext context;

      

        public UserService(ExamDbContext context )
        {
          
            this.context = context;

        }

        public User Authenticate(string loginid, string password)
        {
            if (string.IsNullOrEmpty(loginid) || string.IsNullOrEmpty(password))
                return null;

            var user = context.Users.SingleOrDefault(x => x.Loginid == loginid);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return context.Users;
        }

        public User GetById(int id)
        {
            return context.Users.Find(id);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (context.Users.Any(x => x.Loginid == user.Loginid))
                throw new AppException("LoginId " + user.Loginid + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            context.Users.Add(user);
            context.SaveChanges();

            return user;
        }

        

        

        public void Update(User userParam, string password = null)
        {
            var user = context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.Loginid != user.Loginid)
            {
                // username has changed so check if the new username is already taken
                if (context.Users.Any(x => x.Loginid == userParam.Loginid))
                    throw new AppException("LoginId " + userParam.Loginid + " is already taken");
            }

            // update user properties
            user.Loginid = userParam.Loginid;
            user.Email = userParam.Email;
            user.Username = userParam.Username;
            user.Address = userParam.Address;
            user.Phone = userParam.Phone;
            user.City = userParam.City;
            user.TimeSpent = userParam.TimeSpent;
            user.Score = userParam.Score;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            context.Users.Update(user);
            context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = context.Users.SingleOrDefault(c => c.Id == id);
            if (user != null)
            {
                context.Users.Remove(user);
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
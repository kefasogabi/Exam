using System.Collections.Generic;
using System.Threading.Tasks;
using Exam.Models;

namespace Exam.Interface
{
    public interface IStaffService
    {
        Staff Authenticate(string loginid, string password);
        IEnumerable<Staff> GetAll();
        Task<Staff> GetByIdAsync(int id);
        Staff Create(Staff user, string password);
        void Update(Staff user, string password = null);
        void Delete(int id);
        Task<Staff> GetStaff(string loginid);
        void SubmitScore(Result staffParam);
    }
}
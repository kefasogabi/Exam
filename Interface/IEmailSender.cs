using System.Threading.Tasks;

namespace Exam.Interface
{
    public interface IEmailSender
    {
          Task SendEmailAsync(string email, string activationcode);
    }
}
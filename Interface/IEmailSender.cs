using System.Threading.Tasks;
using Exam.Models;

namespace Exam.Interface
{
    public interface IEmailSender
    {
          Task SendEmailAsync(MailRequest mailRequest);
    }
}
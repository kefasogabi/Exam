using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Exam.Helper;
using Microsoft.AspNetCore.Http;
using Exam.Interface;
using Microsoft.Extensions.Options;

namespace Exam.Services
{
    
    public class EmailSender : IEmailSender
    {
        private readonly EmailSettings _emailSettings;
        private readonly IHttpContextAccessor httpContextAccessor;

        public EmailSender(IOptions<EmailSettings> emailSettings, IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
            _emailSettings = emailSettings.Value;
        }
        public Task SendEmailAsync(string email, string activationcode)
        {
            try{
                // Credentials
            var credentials = new NetworkCredential(_emailSettings.Sender, _emailSettings.Password);
            
             var VerifyUrl = "/User/VerifyAccount/" + activationcode;

            var uriBuilder = new UriBuilder
            {
                Scheme = httpContextAccessor.HttpContext.Request.Scheme,
                Host = httpContextAccessor.HttpContext.Request.Host.ToString(),
                Path = $"/user/VerifyAccount/{activationcode}"
            };

            var link = uriBuilder.Uri.AbsoluteUri;

            string subject = " Your account have been successfully created";
            string body = "<br/><br/> we are excited to tell you that your account have been " +
                "successfully created. please click on the link below to verify your account" +
                "<br/><br/><a href='" + link+"'>"+link+"</a>";
           
           // Mail message
            var mail = new MailMessage()
            {
                From = new MailAddress(_emailSettings.Sender, _emailSettings.SenderName),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mail.To.Add(new MailAddress(email));

            // Smtp client
            var client = new SmtpClient()
            {
                Port = _emailSettings.MailPort,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Host = _emailSettings.MailServer,
                EnableSsl = true,
                Credentials = credentials
            };

            // Send it...         
            client.Send(mail);

            }
            catch(Exception ex)
            {
                throw new InvalidOperationException(ex.Message);
            }
            
            return Task.CompletedTask;
        }

        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            throw new NotImplementedException();
        }
    }
}
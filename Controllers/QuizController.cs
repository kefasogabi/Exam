using System;
using System.Linq;
using System.Threading.Tasks;
using Exam.Dtos;
using Exam.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    [Authorize]
    public class QuizController : Controller
    {
        private readonly ExamDbContext context;

        public QuizController(ExamDbContext  context)
        {
            this.context = context;
        }

       
       
        [HttpGet("/api/Questions")]
        public IActionResult GetQuestions(){

            var Qns =  context.Questions.Select(x => new { Id =x.Id, Qn = x.Qn, x.Option1, x.Option2, x.Option3, x.Option4 })
            .OrderBy(y => Guid.NewGuid())
            .Take(10)
            .ToArray();

            var  updated =   Qns.AsEnumerable()
            .Select(x => new
            {
                Id = x.Id,
                Qn = x.Qn,
                Options = new string[]{x.Option1, x.Option2, x.Option3, x.Option4}
            }).ToList();

            return Ok(updated);

        }

        [Authorize(Roles = "Admin")]
        [HttpGet("/api/Question")]
        public IActionResult Question()
        {
            var question = context.Questions.ToList();
            return Ok(question);
        }

         [Authorize(Roles = "Admin")]
        [HttpGet("/api/Question/{id}")]
        public IActionResult GetQuestion([FromRoute]int id)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var question = context.Questions.SingleOrDefault(c => c.Id == id);

            if(question == null)
            {
                return NotFound();
            }
            

            return Ok(question);
        }

      
        [HttpPost("/api/answers")]
        public  IActionResult GetAnswers([FromBody] int[] qIDs)
        {
            var result =  context.Questions
            .AsEnumerable()
            .Where(y => qIDs.Contains(y.Id))
            .OrderBy(x => {return Array.IndexOf(qIDs, x.Id); })
            .Select(z => z.Answer)
            .ToArray();

            return Ok(result);
        }

         [Authorize(Roles = "Admin")]
        [HttpPut("/api/question/{id}")]
        public IActionResult EditQwestion( int id, [FromBody]Question question)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if( id != question.Id)
            {
                return NotFound();
            }

            context.Entry(question).State = EntityState.Modified;

            context.SaveChanges();

            return Ok(question);

        }

        [Authorize(Roles = "Admin")]
        [HttpPost("/api/Questions")]
        public async Task<IActionResult> PostQuestion( [FromBody] Question questions )
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            context.Questions.Add(questions);

            await context.SaveChangesAsync();

            return Ok(questions);

        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("/api/Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            var question = await context.Questions.SingleOrDefaultAsync(q => q.Id == id);

            if(question == null)
            {
                return NotFound();
            }

            context.Questions.Remove(question);
            await context.SaveChangesAsync();

            return Ok(question);

        }

       

        
    }
}
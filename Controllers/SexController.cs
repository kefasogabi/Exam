using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Exam.Dtos;
using Exam.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Exam.Controllers
{
    public class SexController : Controller
    {
        private readonly ExamDbContext context;
        private readonly IMapper mapper;
        public SexController(ExamDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;

        }

        [AllowAnonymous]
        [HttpGet("/api/sex")]
        public async Task<IEnumerable<SexDto>> GetSex()
        {
            var sex = await context.Sex.ToListAsync();
            return mapper.Map<List<Sex>, List<SexDto>>(sex);
        }
    }
}
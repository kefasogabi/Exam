using AutoMapper;
using Exam.Dtos;
using Exam.Models;

namespace Exam.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
             CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Admin, AdminDto>();
            CreateMap<AdminDto, Admin>();
        }
    }
}
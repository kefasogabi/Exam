using AutoMapper;
using Exam.Dtos;
using Exam.Models;

namespace Exam.Helper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Staff, StaffDto>();
            CreateMap<StaffDto, Staff>();

            CreateMap<Sex, SexDto>();
            CreateMap<SexDto, Sex>();
            
        }
    }
}
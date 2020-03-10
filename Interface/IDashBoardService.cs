namespace Exam.Interface
{
    public interface IDashBoardService
    {
        int TotalMaleStaffs();
        int TotalFemaleStaffs();
        int AllStaff();
        int AllAdmin();
        int[] AdminGenders();
    }
}
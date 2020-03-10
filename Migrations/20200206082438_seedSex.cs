using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class seedSex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("SET IDENTITY_INSERT Sex ON");
            
            migrationBuilder.Sql("INSERT INTO Sex (Id, Name) VALUES (1, 'Male') ");
            migrationBuilder.Sql("INSERT INTO Sex (Id, Name) VALUES (2, 'Female') ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

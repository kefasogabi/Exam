using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class seedRoles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("SET IDENTITY_INSERT Roles ON");
            migrationBuilder.Sql("INSERT INTO Roles (Id, Name) VALUES (1, 'Admin') ");
            migrationBuilder.Sql("INSERT INTO Roles (Id, Name) VALUES (2, 'User') ");
           
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
             migrationBuilder.Sql("DELETE FROM Roles");
        }
    }
}

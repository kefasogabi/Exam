using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class newChangesToStaffModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                table: "staffs");

            migrationBuilder.DropColumn(
                name: "City",
                table: "staffs");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                table: "staffs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "City",
                table: "staffs",
                nullable: true);
        }
    }
}

using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class sex : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SexId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SexId",
                table: "staffs",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Sex",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sex", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_SexId",
                table: "Users",
                column: "SexId");

            migrationBuilder.CreateIndex(
                name: "IX_staffs_SexId",
                table: "staffs",
                column: "SexId");

            migrationBuilder.AddForeignKey(
                name: "FK_staffs_Sex_SexId",
                table: "staffs",
                column: "SexId",
                principalTable: "Sex",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Sex_SexId",
                table: "Users",
                column: "SexId",
                principalTable: "Sex",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_staffs_Sex_SexId",
                table: "staffs");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Sex_SexId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Sex");

            migrationBuilder.DropIndex(
                name: "IX_Users_SexId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_staffs_SexId",
                table: "staffs");

            migrationBuilder.DropColumn(
                name: "SexId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "SexId",
                table: "staffs");
        }
    }
}

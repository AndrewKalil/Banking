using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Banking.Migrations
{
    public partial class Migration202208311842 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Transfers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transfers_CategoryId",
                table: "Transfers",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transfers_Categories_CategoryId",
                table: "Transfers",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transfers_Categories_CategoryId",
                table: "Transfers");

            migrationBuilder.DropIndex(
                name: "IX_Transfers_CategoryId",
                table: "Transfers");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Transfers");
        }
    }
}

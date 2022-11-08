using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Banking.Migrations
{
    public partial class Migration202208311106 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Transfers_TransferId",
                table: "Assets");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Transfers_TransferId",
                table: "Assets",
                column: "TransferId",
                principalTable: "Transfers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Assets_Transfers_TransferId",
                table: "Assets");

            migrationBuilder.AddForeignKey(
                name: "FK_Assets_Transfers_TransferId",
                table: "Assets",
                column: "TransferId",
                principalTable: "Transfers",
                principalColumn: "Id");
        }
    }
}

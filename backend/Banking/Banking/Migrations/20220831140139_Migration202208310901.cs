using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Banking.Migrations
{
    public partial class Migration202208310901 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Transfers_TransferId",
                table: "Accounts");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_TransferId",
                table: "Accounts");

            migrationBuilder.DropColumn(
                name: "TransferId",
                table: "Accounts");

            migrationBuilder.CreateTable(
                name: "AccountTransfer",
                columns: table => new
                {
                    AccountsId = table.Column<int>(type: "int", nullable: false),
                    TransfersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountTransfer", x => new { x.AccountsId, x.TransfersId });
                    table.ForeignKey(
                        name: "FK_AccountTransfer_Accounts_AccountsId",
                        column: x => x.AccountsId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccountTransfer_Transfers_TransfersId",
                        column: x => x.TransfersId,
                        principalTable: "Transfers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccountTransfer_TransfersId",
                table: "AccountTransfer",
                column: "TransfersId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountTransfer");

            migrationBuilder.AddColumn<int>(
                name: "TransferId",
                table: "Accounts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_TransferId",
                table: "Accounts",
                column: "TransferId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Transfers_TransferId",
                table: "Accounts",
                column: "TransferId",
                principalTable: "Transfers",
                principalColumn: "Id");
        }
    }
}

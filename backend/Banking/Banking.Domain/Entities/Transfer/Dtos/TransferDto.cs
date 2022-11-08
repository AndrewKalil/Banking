using System.ComponentModel.DataAnnotations;

namespace Banking.Domain.Entities.Dtos
{
    public class TransferDto
    {
        public string Name { get; set; } = String.Empty;
        public string Description { get; set; } = String.Empty;
        [Required]
        public int[] AccountsIds { get; set; } = new int[0];
        public int? CategoryId { get; set; }
        public DateTime TransactionDate { get; set; }
        public int Amount { get; set; }
    }
}

namespace Banking.Domain.Entities.Dtos
{
    public class AssetDto
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int? CategoryId { get; set; }
        public int? AccountId { get; set; }
        public int? Amount { get; set; }
        public bool? IsExpense { get; set; }
        public DateTime? ExpenseDate { get; set; }
    }
}

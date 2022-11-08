namespace Banking.Domain.Entities.Dtos
{
    public class AccountDto
    {
        public string? Name { get; set; }
        public bool? IsSavings { get; set; }
        public bool? IsCredit { get; set; }
        public int? CreditAmount { get; set; }
        public string? UIcolor { get; set; } 
    }
}

using System.Reflection;

namespace Banking.Domain.Entities
{
    public abstract class BaseClass
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
}

namespace Banking.Domain.Commons.Models
{
    public class Query
    {
        public List<string> filters { get; set; } = new List<string>();
        public bool detail { get; set; } = false;
        public string sort { get; set; } = String.Empty;
    }

    public class FilterComponent
    {
        public string property { get; set; }
        public string op { get; set; }
        public string type { get; set; }
        public string value { get; set; }
    }

    public class SortComponent
    {
        public string property { get; set; }
        public string order { get; set; }
    }
}

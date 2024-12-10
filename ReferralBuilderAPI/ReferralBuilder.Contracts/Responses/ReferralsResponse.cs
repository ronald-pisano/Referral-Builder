namespace ReferralBuilder.Contracts.Responses
{
    public class ReferralsResponse
    {
        public required IEnumerable<ReferralResponse> Items { get; init; } = Enumerable.Empty<ReferralResponse>();
        public required int Page {  get; init; }
        public required int PageSize { get; init; }
        public required int Total { get; init; }
        public bool HasNextPage => Total > (Page * PageSize);
    }
}

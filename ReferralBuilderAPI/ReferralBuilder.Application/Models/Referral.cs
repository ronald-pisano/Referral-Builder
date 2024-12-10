namespace ReferralBuilder.Application.Models
{
    public class Referral
    {
        public int? Id { get; init; }
        public required string GivenName { get; init; }
        public required string Surname { get; init; }
        public required string Email { get; init; }
        public required string Phone { get; init; }
        public string? Avatar { get; init; }
        public string HomeNameOrNumber { get; init; } = string.Empty;
        public string Street { get; init; } = string.Empty;
        public string Suburb { get; init; } = string.Empty;
        public string State { get; init; } = string.Empty;
        public string Postcode { get; init; } = string.Empty;
        public string Country { get; init; } = string.Empty;
    }
}

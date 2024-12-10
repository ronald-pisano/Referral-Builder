using ReferralBuilder.Contracts.PartialModels;

namespace ReferralBuilder.Contracts.Responses
{
    public class ReferralResponse
    {
        public required int Id { get; set; }
        public required string GivenName { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }

        public string? Avatar { get; set; }
        public Address Address { get; set; } = new();

    }
}

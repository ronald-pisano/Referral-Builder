using ReferralBuilder.Contracts.PartialModels;

namespace ReferralBuilder.Contracts.Requests
{

    public class UpdateReferralRequest
    {
        public required string GivenName { get; set; }
        public required string Surname { get; set; }
        public required string Email { get; set; }
        public required string Phone { get; set; }

        public string? Avatar { get; set; }
        public Address Address { get; set; } = new();

    }
}

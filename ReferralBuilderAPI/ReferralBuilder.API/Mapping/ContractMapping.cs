using Microsoft.AspNetCore.Mvc.RazorPages;
using ReferralBuilder.Application.Models;
using ReferralBuilder.Contracts.PartialModels;
using ReferralBuilder.Contracts.Requests;
using ReferralBuilder.Contracts.Responses;

namespace ReferralBuilder.API.Mapping
{
    public static class ContractMapping
    {
        public static Referral MapToReferral(this CreateReferralRequest request)
        {
            return new Referral()
            {
                Id = null,
                GivenName = request.GivenName,
                Surname = request.Surname,
                Email = request.Email,
                Phone = request.Phone,
                Avatar = request.Avatar,
                HomeNameOrNumber = request.Address.HomeNameOrNumber,
                Street = request.Address.Street,
                Suburb = request.Address.Suburb,
                State = request.Address.State,
                Postcode = request.Address.Postcode,
                Country = request.Address.Country
            };
        }

        public static Referral MapToReferral(this UpdateReferralRequest request, int id)
        {
            return new Referral()
            {
                Id = id,
                GivenName = request.GivenName,
                Surname = request.Surname,
                Email = request.Email,
                Phone = request.Phone,
                Avatar = request.Avatar,
                HomeNameOrNumber = request.Address.HomeNameOrNumber,
                Street = request.Address.Street,
                Suburb = request.Address.Suburb,
                State = request.Address.State,
                Postcode = request.Address.Postcode,
                Country = request.Address.Country
            };
        }



        public static ReferralResponse MapToResponse(this Referral referral, int? referralId = null)
        {
            return new ReferralResponse()
            {
                Id = referralId != null ? referralId.Value : referral.Id!.Value,
                GivenName = referral.GivenName,
                Surname = referral.Surname,
                Email = referral.Email,
                Phone = referral.Phone,
                Avatar = referral.Avatar,
                Address = new Address()
                {
                    HomeNameOrNumber = referral.HomeNameOrNumber,
                    Street = referral.Street,
                    Suburb = referral.Suburb,
                    State = referral.State,
                    Postcode = referral.Postcode,
                    Country = referral.Country
                }
            };
        }

        public static ReferralsResponse MapToResponse(this IEnumerable<Referral> referrals, int page, int pageSize, int totalCount)
        {
            return new ReferralsResponse
            {
                Items = referrals.Select(s => s.MapToResponse()),
                Page = page,
                PageSize = pageSize,
                Total = totalCount
            };

        }

    }
}

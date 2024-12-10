using Microsoft.AspNetCore.Mvc;
using ReferralBuilder.API.Mapping;
using ReferralBuilder.Application.Services;
using ReferralBuilder.Contracts.Requests;

namespace ReferralBuilder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReferralsController : ControllerBase
    {
        private readonly IReferralService _referralService;

        public ReferralsController(IReferralService referralService)
        {
            _referralService = referralService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateReferralRequest request)
        {
            var referral = request.MapToReferral();
            var referralId = await _referralService.CreateAsync(referral);
            var referralResponse = referral.MapToResponse(referralId);
            return CreatedAtAction("Get", new { id = referralId }, referralResponse);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] int? pageSize, [FromQuery] int? page, CancellationToken cancellationToken)
        {
            pageSize = pageSize == null ? 10 : pageSize;
            page = page == null ? 1 : page;
            var referrals = await _referralService.GetAllAsync(page.Value, pageSize.Value, cancellationToken: cancellationToken);
            var referralsCount = await _referralService.GetCount(cancellationToken);
            var referralsResponse = referrals.MapToResponse(page.Value, pageSize.Value, referralsCount);
            return Ok(referralsResponse);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id, CancellationToken cancellationToken)
        {
            var referral = await _referralService.GetByIdAsync(id, cancellationToken);
            if (referral is null)
            {
                return NotFound();
            }

            var response = referral.MapToResponse();
            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateReferralRequest request, CancellationToken cancellationToken)
        {
            var referral = request.MapToReferral(id);
            var updatedReferral = await _referralService.UpdateAsync(referral, cancellationToken);
            if (updatedReferral is null)
            {
                return NotFound();
            }

            var response = updatedReferral.MapToResponse();
            return Ok(referral);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id, CancellationToken cancellationToken)
        {
            var deleted = await _referralService.DeleteByIdAsync(id, cancellationToken);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}

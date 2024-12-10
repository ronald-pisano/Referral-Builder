using Newtonsoft.Json.Linq;
using ReferralBuilder.Application.Models;
using ReferralBuilder.Application.Repositories;
using System.Threading;

namespace ReferralBuilder.Application.Services
{
    public class ReferralService : IReferralService
    {
        private readonly IReferralRepository _referralRepository;

        public ReferralService(IReferralRepository referralRepository)
        {
            _referralRepository = referralRepository;
        }

        public async Task<int> CreateAsync(Referral referral, CancellationToken cancellationToken = default)
        {
            return await _referralRepository.CreateAsync(referral, cancellationToken);
        }

        public async Task<bool> DeleteByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _referralRepository.DeleteByIdAsync(id, cancellationToken);
        }

        public async Task<bool> ExistsByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _referralRepository.ExistsByIdAsync(id, cancellationToken);
        }

        public async Task<IEnumerable<Referral>> GetAllAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
        {
            return await _referralRepository.GetAllAsync(page, pageSize, cancellationToken);
        }

        public async Task<Referral?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _referralRepository.GetByIdAsync(id, cancellationToken);
        }

        public async Task<int> GetCount(CancellationToken cancellationToken = default)
        {
            return await _referralRepository.GetCount(cancellationToken);
        }

        public async Task<Referral?> UpdateAsync(Referral referral, CancellationToken cancellationToken = default)
        {
            var movieExists = await _referralRepository.ExistsByIdAsync(referral.Id!.Value, cancellationToken);
            if (!movieExists)
            {
                return null;
            }

            await _referralRepository.UpdateAsync(referral, cancellationToken);

            return referral;
        }
    }
}

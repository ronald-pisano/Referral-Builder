using ReferralBuilder.Application.Models;

namespace ReferralBuilder.Application.Services
{
    public interface IReferralService
    {
        Task<int> CreateAsync(Referral referral, CancellationToken cancellationToken = default);
        Task<IEnumerable<Referral>> GetAllAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<Referral?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<Referral?> UpdateAsync(Referral referral, CancellationToken cancellationToken = default);
        Task<bool> DeleteByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<bool> ExistsByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<int> GetCount(CancellationToken cancellationToken = default);
    }
}

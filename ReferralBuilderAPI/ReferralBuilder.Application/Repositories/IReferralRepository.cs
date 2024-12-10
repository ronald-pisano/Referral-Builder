using ReferralBuilder.Application.Models;

namespace ReferralBuilder.Application.Repositories
{
    public interface IReferralRepository
    {
        Task<int> CreateAsync(Referral referral, CancellationToken cancellationToken = default);
        Task<IEnumerable<Referral>> GetAllAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default);
        Task<Referral?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<bool> UpdateAsync(Referral referral, CancellationToken cancellationToken = default);
        Task<bool> DeleteByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<bool> ExistsByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<int> GetCount(CancellationToken cancellationToken = default);
    }
}

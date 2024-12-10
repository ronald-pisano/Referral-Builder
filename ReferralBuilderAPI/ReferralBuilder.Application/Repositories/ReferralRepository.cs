using Dapper;
using Newtonsoft.Json.Linq;
using ReferralBuilder.Application.Database;
using ReferralBuilder.Application.Models;
namespace ReferralBuilder.Application.Repositories;

public class ReferralRepository : IReferralRepository
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public ReferralRepository(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task<int> CreateAsync(Referral referral, CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);
        using var transaction = connection.BeginTransaction();

        var result = await connection.QuerySingleAsync<int>(new CommandDefinition("""
                insert into referrals (givenName, surname, email, phone, avatar, homeNameOrNumber, street,
                suburb, state, postcode, country) 
                values (@GivenName, @Surname, @Email, @Phone, @Avatar, @HomeNameOrNumber, @Street, @Suburb, @State, @Postcode, @Country)
                returning id;
                """, referral, cancellationToken: cancellationToken));

        transaction.Commit();
        return result;
    }

    public async Task<IEnumerable<Referral>> GetAllAsync(int page = 1, int pageSize = 10, CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);

        var result = await connection.QueryAsync(new CommandDefinition($"""
                select r.*
                from referrals r
                limit @pageSize
                offset @pageOffset
                """, new
        {
            pageSize,
            pageOffset = (page - 1) * pageSize
        }, cancellationToken: cancellationToken));

        return result.Select(x => new Referral
        {
            Id = x.id,
            GivenName = x.givenname,
            Surname = x.surname,
            Email = x.email,
            Phone = x.phone,
            Avatar = x.avatar,
            HomeNameOrNumber = x.homenameornumber,
            Street = x.street,
            Suburb = x.suburb,
            State = x.state,
            Postcode = x.postcode,
            Country = x.country
        });
    }

    public async Task<Referral?> GetByIdAsync(int id, CancellationToken token = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(token);
        var movie = await connection.QuerySingleOrDefaultAsync<Referral>(
            new CommandDefinition("""
            select r.*
            from referrals r
            where id = @id
            """, new { id }, cancellationToken: token));

        if (movie is null)
        {
            return null;
        }

        return movie;
    }

    public async Task<bool> UpdateAsync(Referral referral, CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);
        using var transaction = connection.BeginTransaction();

        var result = await connection.ExecuteAsync(new CommandDefinition("""
                update referrals set givenName = @GivenName, surname = @Surname,email = @Email, phone = @Phone, avatar = @Avatar,
                homeNameOrNumber = @HomeNameOrNumber, street = @Street, suburb = @Suburb, state = @State, postcode = @Postcode, country = @Country 
                where id = @Id
                """, referral, cancellationToken: cancellationToken));

        transaction.Commit();
        return result > 0;
    }

    public async Task<bool> DeleteByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);
        using var transaction = connection.BeginTransaction();

        var result = await connection.ExecuteAsync(new CommandDefinition("""
            delete from referrals where id = @id
            """, new { id }, cancellationToken: cancellationToken));

        transaction.Commit();
        return result > 0;
    }

    public async Task<bool> ExistsByIdAsync(int id, CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);
        return await connection.ExecuteScalarAsync<bool>(new CommandDefinition("""
            select count(1) from referrals where id = @id
            """, new { id }, cancellationToken: cancellationToken));
    }

    public async Task<int> GetCount(CancellationToken cancellationToken = default)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync(cancellationToken);
        return await connection.QuerySingleAsync<int>(new CommandDefinition("select count(id) from referrals", cancellationToken: cancellationToken));
    }
}

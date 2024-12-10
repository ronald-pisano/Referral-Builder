using Dapper;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Transactions;

namespace ReferralBuilder.Application.Database;

public class DbInitializer
{
    private readonly IDbConnectionFactory _dbConnectionFactory;

    public DbInitializer(IDbConnectionFactory dbConnectionFactory)
    {
        _dbConnectionFactory = dbConnectionFactory;
    }

    public async Task InitializeAsync(bool addData = false)
    {
        using var connection = await _dbConnectionFactory.CreateConnectionAsync();

        var exists = await connection.ExecuteAsync("""
            create table if not exists referrals (
            id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            givenName VARCHAR(255) NOT NULL,
            surname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(50) NOT NULL,
            avatar TEXT,
            homeNameOrNumber VARCHAR(255),
            street VARCHAR(255),
            suburb VARCHAR(255),
            state VARCHAR(255),
            postcode VARCHAR(255),
            country VARCHAR(255)
        );
        """);
    }
}

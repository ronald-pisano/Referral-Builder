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

        await connection.ExecuteAsync("""
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

        if (addData)
        {
            await connection.ExecuteAsync("""
                INSERT INTO referrals (
                    givenName,
                    surname,
                    email,
                    phone,
                    avatar,
                    homeNameOrNumber,
                    street,
                    suburb,
                    state,
                    postcode,
                    country
                )
                VALUES
                    ('John', 'Johnson', 'jh@email121.com', '0453-283-283', NULL, '12', 'High Street', 'Sydney', 'NSW', '2000', 'Australia'),
                    ('Matthew', 'Lombard', 'mat197501@gmail.com', '0453-283-283', NULL, '45', 'Main Road', 'Melbourne', 'VIC', '3000', 'Australia'),
                    ('Joe', 'Dickson', 'joe@dickson.com', '0453-283-283', NULL, '89', 'Elm Street', 'Brisbane', 'QLD', '4000', 'Australia'),
                    ('Scarlet', 'Johnson', 'scarlet@johnson.com', '0453-283-283', NULL, '101', 'King Street', 'Adelaide', 'SA', '5000', 'Australia'),
                    ('Peter', 'Rhonda', 'peter101@yahoo.com', '0453-283-283', NULL, '76', 'Queen Street', 'Perth', 'WA', '6000', 'Australia');                
                """);
        }
    }
}

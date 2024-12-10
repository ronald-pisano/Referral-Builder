using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using ReferralBuilder.Application.Database;
using ReferralBuilder.Application.Repositories;
using ReferralBuilder.Application.Services;

namespace ReferralBuilder.Application;

public static class ApplicationServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddSingleton<IReferralService, ReferralService>();
        services.AddSingleton<IReferralRepository, ReferralRepository>();
        services.AddValidatorsFromAssemblyContaining<IApplicationMarker>(ServiceLifetime.Singleton);
        return services;
    }

    public static IServiceCollection AddDatabase(this IServiceCollection services,
        string connectionString)
    {
        services.AddSingleton<IDbConnectionFactory>(_ =>
            new NpgsqlConnectionFactory(connectionString));
        services.AddSingleton<DbInitializer>();
        return services;
    }
}

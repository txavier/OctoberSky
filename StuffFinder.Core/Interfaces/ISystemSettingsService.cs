using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ISystemSettingsService
    {
        StuffFinder.Core.Models.ViewModels.SettingsViewModel GetSystemSettings();

        string GetAssemblyVersion();

        string GetFileAssemblyVersion();

        string GetProductVersion();
    }
}

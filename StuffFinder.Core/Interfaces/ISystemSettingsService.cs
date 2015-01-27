using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ISystemSettingsService
    {
        StuffFinder.Core.Models.ViewModels.SettingsViewModel GetSystemSettings();
    }
}

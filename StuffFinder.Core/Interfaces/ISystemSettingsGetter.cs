using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ISystemSettingsGetter
    {
        StuffFinder.Core.Models.ViewModels.SettingsViewModel GetSystemSettings();
    }
}

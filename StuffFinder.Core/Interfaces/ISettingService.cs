using System;
namespace StuffFinder.Core.Interfaces
{
    public interface ISettingService : AutoClutch.Auto.Service.Interfaces.IService<StuffFinder.Core.Models.setting>
    {
        StuffFinder.Core.Models.setting GetSettingBySettingKey(string settingKey);

        string GetSettingValueBySettingKey(string settingKey);
    }
}

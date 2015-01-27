using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class SystemSettingsService : ISystemSettingsService
    {
        private readonly ISystemSettingsGetter _systemSettingsGetter;

        public SystemSettingsService(ISystemSettingsGetter systemSettingsGetter)
        {
            _systemSettingsGetter = systemSettingsGetter;
        }

        public SettingsViewModel GetSystemSettings()
        {
            var result = _systemSettingsGetter.GetSystemSettings();

            return result;
        }
    }
}

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
        
        private readonly IVersionGetter _versionGetter;

        public SystemSettingsService(ISystemSettingsGetter systemSettingsGetter, IVersionGetter versionGetter)
        {
            _systemSettingsGetter = systemSettingsGetter;

            _versionGetter = versionGetter;
        }

        public SettingsViewModel GetSystemSettings()
        {
            var result = _systemSettingsGetter.GetSystemSettings();

            return result;
        }

        public string GetAssemblyVersion()
        {
            var result = _versionGetter.GetAssemblyVersion();

            return result;
        }

        public string GetFileAssemblyVersion()
        {
            var result = _versionGetter.GetFileAssemblyVersion();

            return result;
        }
    }
}

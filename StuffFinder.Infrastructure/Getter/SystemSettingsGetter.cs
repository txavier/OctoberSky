using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Infrastructure.Getter
{
    public class SystemSettingsGetter : ISystemSettingsGetter
    {
        public SettingsViewModel GetSystemSettings()
        {
            var result = new SettingsViewModel();

            return result;
        }
    }
}

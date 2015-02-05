using AutoClutch.Auto.Repo.Interfaces;
using AutoClutch.Auto.Service.Interfaces;
using AutoClutch.Auto.Service.Services;
using StuffFinder.Core.Interfaces;
using StuffFinder.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Core.Services
{
    public class SettingService: Service<setting>, ISettingService
    {
        private readonly IRepository<setting> _settingRepository;

        public SettingService(IRepository<setting> settingRepository)
            :base(settingRepository)
        {
            _settingRepository = settingRepository;
        }

        public setting GetSettingBySettingKey(string settingKey)
        {
            var result = Get(filter: i => i.settingKey == settingKey).SingleOrDefault();

            return result;
        }

        public string GetSettingValueBySettingKey(string settingKey)
        {
            var result = GetSettingBySettingKey(settingKey);

            var value = result.settingValue;

            return value;
        }
    }
}

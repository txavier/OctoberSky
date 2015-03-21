using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IStatisticsService
    {
        int GetNewFindingsInPastWeekCount();
        int GetNewMe2sInPastWeekCount();
        int GetNewThingsInPastWeekCount();
        int GetTotalUsersCount();
    }
}

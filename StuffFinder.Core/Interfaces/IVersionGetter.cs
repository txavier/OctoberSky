using System;

namespace StuffFinder.Core.Interfaces
{
    public interface IVersionGetter
    {
        string GetAssemblyVersion();
        string GetFileAssemblyVersion();
    }
}

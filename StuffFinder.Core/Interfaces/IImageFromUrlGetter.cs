using System;
namespace StuffFinder.Core.Interfaces
{
    public interface IImageFromUrlGetter
    {
        byte[] GetImageFromUrl(string url);
    }
}

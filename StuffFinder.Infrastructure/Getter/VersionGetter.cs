using StuffFinder.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace StuffFinder.Infrastructure.Getter
{
    public class VersionGetter : IVersionGetter
    {
        public string GetAssemblyVersion()
        {
            Assembly asm = Assembly.GetExecutingAssembly();

            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(asm.Location);
            
            return String.Format("{0}.{1}", fvi.ProductMajorPart, fvi.ProductMinorPart);
        }

        public string GetFileAssemblyVersion()
        {
            Assembly asm = Assembly.GetExecutingAssembly();

            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(asm.Location);

            return String.Format("{0}.{1}", fvi.FileMajorPart, fvi.FileMinorPart);
        }
    }
}

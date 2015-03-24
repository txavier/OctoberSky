using System.Web;
using System.Web.Optimization;

namespace StuffFinder
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            //bundles.Add(new ScriptBundle("~/bundles/scripts").Include(
            //            "~/Scripts/scripts.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
            //            "~/Scripts/modernizr-*"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.js",
            //          "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/ngToast").Include(
                "~/Scripts/vendor/ngToast/ngToast.js"));

            bundles.Add(new StyleBundle("~/Content/ngToast").Include(
                "~/Content/ngToast.css",
                "~/Content/ngToast-animations.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/styles.css"));

            bundles.Add(new ScriptBundle("~/bundles/angular").IncludeDirectory(
                "~/app", "*Controller.js", true));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = true;
        }
    }
}

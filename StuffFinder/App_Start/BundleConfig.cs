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

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.min.js",
                      "~/Scripts/respond.js"));

            //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
            //          "~/Scripts/bootstrap.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/ngToast").Include(
                "~/Scripts/vendor/ngToast/ngToast.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/app/home/homeController.js",
                "~/app/things/thingsController.js",
                "~/app/start/startController.js",
                "~/app/finding/foundItController.js",
                "~/app/sidebar/sidebarController.js",
                "~/app/whereIsIt/whereIsItController.js",
                "~/app/things/thingController.js",
                "~/app/admin/jumbotronYoutubeVideoSettingsController.js",
                "~/app/search/searchController.js",
                "~/app/things/editThingController.js",
                "~/app/finding/editFindingController.js",
                "~/app/finding/foundThingAndLocationController.js",
                "~/app/feedback/feedbackController.js",
                "~/app/users/userProfileController.js",
                "~/app/services/dataService.js",
                "~/app/things/thingsService.js",
                "~/app/services/votesService.js",
                "~/app/services/me2Service.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/nya-bs-select").Include(
                "~/Scripts/vendor/nya-bootstrap-select/dist/js/nya-bs-select.min.js"));

            //bundles.Add(new StyleBundle("~/Content/ngToast").Include(
            //    "~/Content/ngToast.css",
            //    "~/Content/ngToast-animations.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.min.css",
                      "~/Content/styles.css"));

            bundles.Add(new StyleBundle("~/Content/site").Include(
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/thirdParty").Include(
                "~/Content/ngToast.css",
                "~/Content/ngToast-animations.css",
                "~/Content/nya-bs-select.min.css",
                "~/Content/loading-bar.css",
                "~/Content/textAngular.css",
                "~/Content/social-buttons.css"
                ));

            //bundles.Add(new StyleBundle("~/Content/nya").Include(
            //    "~/Content/nya-bs-select.min.css"));

            //bundles.Add(new StyleBundle("~/Content/loadingBar").Include(
            //    "~/Content/loading-bar.css"));

            //bundles.Add(new StyleBundle("~/Content/textAngular").Include(
            //    "~/Content/textAngular.css"));

            //bundles.Add(new StyleBundle("~/Content/socialButtons").Include(
            //    "~/Content/social-buttons.css"));

            // Set EnableOptimizations to false for debugging. For more information,
            // visit http://go.microsoft.com/fwlink/?LinkId=301862
            BundleTable.EnableOptimizations = false;
        }
    }
}
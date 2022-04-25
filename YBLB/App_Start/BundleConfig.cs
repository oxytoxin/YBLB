using System.Web;
using System.Web.Optimization;

namespace YBLB
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

       

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                       //"~/Scripts/bootstrap.js",
                       "~/Script/jquery-3.4.1.min.js",
                       "~/Content/JS/LayoutMain.js",
                       "~/Content/JS/jquery-qrcode.js",
                       "~/Content/JS/mdb.min.js",
                      "~/Content/fontawesome-free-6.0.0-web/js/all.js",
                       "~/Content/DataTables/datatables.js",
                       "~/Content/DataTables/datatables.min.js",
                       "~/Content/JS/Components/components.js",
                       "~/Content/JS/Commuter/commuters.js",
                       "~/Content/JS/Booking/booking.js",
                       "~/Content/JS/Dispatch/dispatch.js",
                       "~/Content/JS/Home/home.js",
                       "~/Content/JS/Usermanagement/usermanagement.js",
                       "~/Content/JS/Credentials/credentials.js",
                      "~/Content/JSPDF/html2canvas.js",
                      "~/Content/JSPDF/jspdf.min.js",
                      "~/Content/JS/html5-qrcode.min.js",
                      "~/Content/JS/Conductor/conductor.js"
                      ));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      //"~/Content/bootstrap.css",
                      //"~/Content/site.css",
                      "~/Content/DataTables/DataTables-1.11.4/css/dataTables.bootstrap.css",
                      "~/Content/DataTables/DataTables-1.11.4/css/dataTables.bootstrap4.css",
                      "~/Content/DataTables/DataTables-1.11.4/css/dataTables.bootstrap.min.css",
                       "~/Content/DataTables/datatables.css",
                       "~/Content/DataTables/datatables.min.css",
                       "~/Content/CSS/admin.css",
                      "~/Content/CSS/mdb.min.css"
                      ));

        }
    }
}

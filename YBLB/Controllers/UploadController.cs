using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web;
using System.IO;

namespace YBLB.Controllers
{
    public class UploadController : ApiController
    {
        [HttpPost]
        public void filesupload()
        {
            string foldercreate = HttpContext.Current.Server.MapPath("~/Upload/");
            if (!Directory.Exists(foldercreate))
            {
                Directory.CreateDirectory(foldercreate);
            }

            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                var filesupload = HttpContext.Current.Request.Files["Uploadfiles"];
                if (filesupload != null)
                {
                    var savefiles = Path.Combine(HttpContext.Current.Server.MapPath("~/Upload/"), filesupload.FileName);
                    filesupload.SaveAs(savefiles);
                }
            }
        }
    }
}

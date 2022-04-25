using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Credentials;

namespace YBLB.Controllers.Auth
{
    public class AuthController : Controller
    {
        CredentialsBL cbl = new CredentialsBL();

        // GET: Auth
        public ActionResult Login()
        {
            return View();
        }

        public JsonResult GetGeneral(CredentialsMO credentials)
        {
            var list = JsonConvert.SerializeObject(cbl.GetGenerald(credentials));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}

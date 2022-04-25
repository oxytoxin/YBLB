using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Credentials;

namespace YBLB.Controllers.Credentials
{
    public class CredentialsController : Controller
    {
        CredentialsBL credentialsBL = new CredentialsBL();

        // GET: Credentials
        public ActionResult Login()
        {
            return View();
        }



    }
}

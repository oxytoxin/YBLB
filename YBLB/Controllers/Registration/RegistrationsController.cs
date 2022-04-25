using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Credentials;

namespace YBLB.Controllers.Registration
{
    public class RegistrationsController : Controller
    {

      

        // GET: Registrations
        public ActionResult Registration()
        {
            return View();
        }



    }
}

using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Dispatch;

namespace YBLB.Controllers.Dispatch
{
    public class DispatchController : Controller
    {

        DispatchBL dispatchBL = new DispatchBL();

        // GET: Dispatch
        public ActionResult Dispatch()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddDispatch(YBLB.Models.Dispatch.DispatchMO.Dispatch dispatch)
        {
            return Json(dispatchBL.AddDispatch(dispatch), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDispatchSchedule()
        {
            var list = JsonConvert.SerializeObject(dispatchBL.GetDispatchSchedul());
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}

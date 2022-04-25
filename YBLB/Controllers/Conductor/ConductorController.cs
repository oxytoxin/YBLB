using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Conductor;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.Controllers.Conductor
{
    public class ConductorController : Controller
    {
        // GET: Conductor

        ConductorBL conductor = new ConductorBL();

        public ActionResult Index()
        {
            return View();
        }

        public JsonResult ScanTicket(ScanPayment scanPayment)
        {
            var list = JsonConvert.SerializeObject(conductor.ScanTicket(scanPayment));
            return Json(list, JsonRequestBehavior.AllowGet);
        }     
        
        public JsonResult AcceptTicket(ScanPayment scanPayment)
        {
            var list = JsonConvert.SerializeObject(conductor.AcceptTicket(scanPayment));
            return Json(list, JsonRequestBehavior.AllowGet);
        }       
        
        public JsonResult AcceptTicketList(ScanPayment scanPayment)
        {
            var list = JsonConvert.SerializeObject(conductor.AcceptTicketList(scanPayment));
            return Json(list, JsonRequestBehavior.AllowGet);
        }       
        
        public JsonResult GetAnnouncement()
        {
            var list = JsonConvert.SerializeObject(conductor.GetAnnouncement());
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult AddReaction(Reactions reactions)
        {
            var list = JsonConvert.SerializeObject(conductor.AddReaction(reactions));
            return Json(list, JsonRequestBehavior.AllowGet);
        }      
        
        public JsonResult Reactions(Reactions reactions)
        {
            var list = JsonConvert.SerializeObject(conductor.Reactions(reactions));
            return Json(list, JsonRequestBehavior.AllowGet);
        }


    }
}

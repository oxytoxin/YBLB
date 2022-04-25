using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using YBLB.BusinessLogic.Components;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Credentials;
using static YBLB.Models.Components.ComponentsMO;

namespace YBLB.Controllers.Components
{
    public class ComponentsController : Controller
    {
        ComponentsBL componentsBL = new ComponentsBL();
        CredentialsBL credentialsBL = new CredentialsBL();
        // GET: Components
        public ActionResult Components()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddUbus(BusUnit _busUnit)
        {
            return Json(componentsBL.AddUnit(_busUnit), JsonRequestBehavior.AllowGet); 
        }

      
        public JsonResult GetUbus()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetUbus());
            return Json(list , JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetUserlvl()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetUserlvl());
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        
        public JsonResult UserReg(CredentialsMO credentials)
        {
            var list = JsonConvert.SerializeObject(credentialsBL.UserReg(credentials));
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult UpdateDetailsUsers(CredentialsMO credentials)
        {
            var list = JsonConvert.SerializeObject(credentialsBL.UpdateDetailsUsers(credentials));
            return Json(list, JsonRequestBehavior.AllowGet);
        }       
        
        public JsonResult UpdateCredUsers(CredentialsMO credentials)
        {
            var list = JsonConvert.SerializeObject(credentialsBL.UpdateCredUsers(credentials));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UserLogin(CredentialsMO credentials)
        {
            var list = JsonConvert.SerializeObject(credentialsBL.UserLogin(credentials));
            return Json(list, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public JsonResult AddTerminal(Terminals _terminals)
        {
            return Json(componentsBL.AddTerminal(_terminals), JsonRequestBehavior.AllowGet); 
        }

        public JsonResult GetTerminals()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetTerminals());
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult GetAllusers()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetAllusers());
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddFare(Fare _fare)
        {
            return Json(componentsBL.AddFare(_fare), JsonRequestBehavior.AllowGet); 
        }

        public JsonResult GetFare()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetFare()); 
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult AddBusClass(BusClass _busClass)
        {
            return Json(componentsBL.AddBusClass(_busClass), JsonRequestBehavior.AllowGet); 
        }          
        
        [HttpPost]
        public JsonResult UpdateFareStatus(Fare fare)
        {
            return Json(componentsBL.UpdateFareStatus(fare), JsonRequestBehavior.AllowGet); 
        }         
        
        [HttpPost]
        public JsonResult UpdateFareDetails(Fare fare)
        {
            return Json(componentsBL.UpdateFareDetails(fare), JsonRequestBehavior.AllowGet); 
        }       
        
        [HttpPost]
        public JsonResult UpdateBusClass(BusClass _busClass)
        {
            return Json(componentsBL.UpdateBusClass(_busClass), JsonRequestBehavior.AllowGet); 
        }

        public JsonResult GetBusClass()
        {
            var list = JsonConvert.SerializeObject(componentsBL.GetBusClass()); 
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}

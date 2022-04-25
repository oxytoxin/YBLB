using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Commuters;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Home;

namespace YBLB.Controllers.Commuter
{
    public class GetterID { 
        public int id { get; set; }
    }

    public class CommutersController : Controller
    {
        CommutersBL Commuters = new CommutersBL();
        CredentialsBL credentialsBL = new CredentialsBL();
        // GET: Commuters
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetTermRoute()
        {
            var list = JsonConvert.SerializeObject(Commuters.GetTermRoute());
            return Json(list, JsonRequestBehavior.AllowGet);
        }      
        
        public JsonResult GetAnnouncement()
        {
            var list = JsonConvert.SerializeObject(Commuters.GetAnnouncement());
            return Json(list, JsonRequestBehavior.AllowGet);
        }   
        
        public JsonResult GetPaymentList(GetterID getter)
        {
            int id = getter.id;
            var list = JsonConvert.SerializeObject(Commuters.GetPaymentList(id));
            return Json(list, JsonRequestBehavior.AllowGet);
        }         
        
        public JsonResult GetNotifHead(GetterID getter)
        {
            int id = getter.id;
            var list = JsonConvert.SerializeObject(Commuters.GetNotifHead(id));
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult AddQueries(QueriesMO queriesMO)
        {
           var list = JsonConvert.SerializeObject(Commuters.AddQueries(queriesMO));
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult ValidateQry(QueriesMO queriesMO)
        {
           var list = JsonConvert.SerializeObject(Commuters.ValidateQry(queriesMO));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file , VerifyMO verifyMO)
        {
            var test = verifyMO;
            var tt = file;
            var ctype = file.ContentType;
            try
            {
                if (file.ContentLength > 0)
                {

                    if (ctype == "image/jpeg" || ctype == "image/png" || ctype == "image/jpg")
                    {
                        var filename = string.Concat(Guid.NewGuid(), Path.GetExtension(file.FileName));
                        string filepath = Path.Combine(Server.MapPath("~/GcashPaymentAndOther"), filename);

                        verifyMO.imgPath = filename; 
                        var validate = Commuters.GetPaymentAddVerifyList(verifyMO);
                        if (validate.Status == "400")
                        {
                            ViewBag.Message = "Error Type not valid!";
                        }
                        else
                        {

                            file.SaveAs(filepath);
                            ViewBag.Message = "Success!";
                        }
                    }
                    else
                    {
                        ViewBag.Message = "Error Type not valid!";
                    }


                }

                return View();
            }
            catch
            {
                ViewBag.Message = "Error!";
                return View();
            }

        }


        [HttpPost]
        public ActionResult UpdateDP(HttpPostedFileBase file, VerifyMO verifyMO)
        {

            var tt = file;

            try
            {
                var ctype = file.ContentType;

                if (file.ContentLength > 0)
                {

                    if (ctype == "image/jpeg" || ctype == "image/png" || ctype == "image/jpg")
                    {
                        var filename = string.Concat(Guid.NewGuid(), Path.GetExtension(file.FileName));
                        string filepath = Path.Combine(Server.MapPath("~/FilesUpload"), filename);

                        verifyMO.I_UIMG = filename;
                        var validate = credentialsBL.UpdateDP2(verifyMO);
                        if (validate.Status == "400")
                        {
                            ViewBag.Message = "Error Type not valid!";
                        }
                        else
                        {

                            file.SaveAs(filepath);
                            ViewBag.Message = "Success!";
                        }
                    }
                    else
                    {
                        ViewBag.Message = "Error Type not valid!";
                    }


                }

                return View("~/Views/Commuters/Index.cshtml");
            }
            catch
            {
                ViewBag.Message = "Error!";
                return View("~/Views/Commuters/Index.cshtml");
            }

        }


    }
}

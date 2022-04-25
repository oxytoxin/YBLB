using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Home;
using YBLB.Models.Home;

namespace YBLB.Controllers
{
    public class HomeController : Controller
    {
        HomeBL homeBL = new HomeBL();

        public ActionResult Index()
        {
            return View();
        }


        public JsonResult GetAnnouncement()
        {
            var list = JsonConvert.SerializeObject(homeBL.GetAnnouncement());
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult Getqryheader()
        {
            var list = JsonConvert.SerializeObject(homeBL.Getqryheader());
            return Json(list, JsonRequestBehavior.AllowGet);
        }         
        
        public JsonResult GetAllReg()
        {
            var list = JsonConvert.SerializeObject(homeBL.GetAllReg());
            return Json(list, JsonRequestBehavior.AllowGet);
        }         
        
        public JsonResult Getqryheaderarchived()
        {
            var list = JsonConvert.SerializeObject(homeBL.Getqryheaderarchived());
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult Getqrybody(QueriesBody queriesBody)
        {
            var list = JsonConvert.SerializeObject(homeBL.Getqrybody(queriesBody));
            return Json(list, JsonRequestBehavior.AllowGet);
        }          
        
        public JsonResult GetAnnSearch(QueriesBody queriesBody)
        {
            var list = JsonConvert.SerializeObject(homeBL.GetAnnSearch(queriesBody));
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult Archive(QueriesBody queriesBody)
        {
            var list = JsonConvert.SerializeObject(homeBL.Archive(queriesBody));
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult GetqrybodyInbox(QueriesBody queriesBody)
        {
            var list = JsonConvert.SerializeObject(homeBL.GetqrybodyInbox(queriesBody));
            return Json(list, JsonRequestBehavior.AllowGet);
        }



        [HttpPost]
        public ActionResult Index(HttpPostedFileBase file , HomeMO home)
        {
            
            var tt = file;
            var ctype = file.ContentType;
            try
            {
                if (file.ContentLength > 0)
                {

                    if (ctype == "image/jpeg" || ctype == "image/png" || ctype == "image/jpg")
                    {
                        var filename = string.Concat(Guid.NewGuid(), Path.GetExtension(file.FileName));
                        string filepath = Path.Combine(Server.MapPath("~/FilesUpload"), filename);

                        home.Path = filename;
                        var validate = homeBL.AddAnnouncement(home);
                        if (validate.Status == "400")
                        {
                            ViewBag.Message = "Error Type not valid!";
                        }
                        else {

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


    }
}
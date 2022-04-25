using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Credentials;
using YBLB.Models.Credentials;
using YBLB.Models.Usermanagement;

namespace YBLB.Controllers.UserManagement
{
    public class UsermanagementController : Controller
    {
        CredentialsBL credentialsBL = new CredentialsBL();

        // GET: Usermanagement
        public ActionResult UserManagement()
        {
            return View();
        }        
        

        [HttpPost]
        public ActionResult UserManagement(HttpPostedFileBase file, CredentialsMO credentials)
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

                        credentials.I_UIMG = filename;
                        var validate = credentialsBL.UserReg2(credentials);
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
        public ActionResult UpdateDP(HttpPostedFileBase file, CredentialsMO credentials)
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

                        credentials.I_UIMG = filename;
                        var validate = credentialsBL.UpdateDP(credentials);
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

                return View("~/Views/UserManagement/UserManagement.cshtml"); 
            }
            catch
            {
                ViewBag.Message = "Error!";
                return View("~/Views/UserManagement/UserManagement.cshtml");
            }

        }


    }
}

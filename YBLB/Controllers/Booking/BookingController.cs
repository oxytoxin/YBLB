using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using YBLB.BusinessLogic.Booking;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.Controllers.Booking
{
    public class BookingController : Controller
    {
        BookingBL bookingBL = new BookingBL();
        // GET:   
        public ActionResult booking()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddBooking(ApplyBooking _applyBooking)
        {
            return Json(bookingBL.AddBooking(_applyBooking), JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult UpdatePayment(ApplyBooking _applyBooking)
        {
            return Json(bookingBL.UpdatePayment(_applyBooking), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetDispatchRoute(Bookings bookings)
        {
            var list = JsonConvert.SerializeObject(bookingBL.GetDispatchRoute(bookings));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetBookFare(Bookings bookings)
        {
            var list = JsonConvert.SerializeObject(bookingBL.GetBookFare(bookings));
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult GetPaymentList()
        {
            var list = JsonConvert.SerializeObject(bookingBL.GetPaymentList());
            return Json(list, JsonRequestBehavior.AllowGet);
        }        
        
        public JsonResult GetTermRoute(ApplyBooking applyBooking)
        {
            var list = JsonConvert.SerializeObject(bookingBL.GetTermRoute(applyBooking));
            return Json(list, JsonRequestBehavior.AllowGet);
        }       
        
        public JsonResult UpdateBooking(ApplyBooking applyBooking)
        {
            var list = JsonConvert.SerializeObject(bookingBL.UpdateBooking(applyBooking));
            return Json(list, JsonRequestBehavior.AllowGet);
        }

    }
}

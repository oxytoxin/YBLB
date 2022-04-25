using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.Models;
using YBLB.DataAccess.Booking;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.BusinessLogic.Booking
{
    public class BookingBL
    {

        ResponseModel responseModel;
        BookingDA bookingDA = new BookingDA();
        

        public ResponseModel UpdatePayment(ApplyBooking _applyBooking)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.AffectedData = bookingDA.UpdatePayment(_applyBooking);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }


        public ResponseModel AddBooking(ApplyBooking _applyBooking)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.AffectedData = bookingDA.AddBooking(_applyBooking);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }


        public ResponseModel GetDispatchRoute(Bookings bookings)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = bookingDA.GetDispatchRoute(bookings);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetBookFare(Bookings bookings)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = bookingDA.GetBookFare(bookings);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }
        

        public ResponseModel GetPaymentList()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = bookingDA.GetPaymentList();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }  
        
        public ResponseModel GetTermRoute(ApplyBooking applyBooking)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = bookingDA.GetTermRoute(applyBooking);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel UpdateBooking(ApplyBooking applyBooking)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = bookingDA.UpdateBooking(applyBooking);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }
    }
}
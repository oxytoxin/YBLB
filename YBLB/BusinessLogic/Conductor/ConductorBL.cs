using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Conductor;
using YBLB.Models;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.BusinessLogic.Conductor
{
    public class ConductorBL
    {
        ResponseModel responseModel;
        ConductorDA conductor = new ConductorDA();

        public ResponseModel ScanTicket(ScanPayment scanPayment)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.ScanTicket(scanPayment);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel AcceptTicket(ScanPayment scanPayment)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.AcceptTicket(scanPayment);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel AcceptTicketList(ScanPayment scanPayment)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.AcceptTicketList(scanPayment);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel GetAnnouncement( )
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.GetAnnouncement();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }      
        
        public ResponseModel AddReaction(Reactions reactions)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.AddReaction(reactions);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel Reactions(Reactions reactions)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = conductor.Reactions(reactions);
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
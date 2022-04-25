using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Commuters;
using YBLB.Models;
using YBLB.Models.Home;

namespace YBLB.BusinessLogic.Commuters
{
    public class CommutersBL
    {
        ResponseModel responseModel;
        CommutersDA Commuters = new CommutersDA();
        public ResponseModel GetTermRoute()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.GetTermRoute();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }    
        
        public ResponseModel GetAnnouncement()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.GetAnnouncement();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }  
        
        public ResponseModel GetPaymentList(int id)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.GetPaymentList(id);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel GetNotifHead(int id)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.GetNotifHead(id);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel AddQueries(QueriesMO queriesMO)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.AddQueries(queriesMO);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel ValidateQry(QueriesMO queriesMO)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.ValidateQry(queriesMO);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }       
        
        public ResponseModel UpdatePayment(int id)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = Commuters.UpdatePayment(id);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }       
        
        public ResponseModel GetPaymentAddVerifyList(VerifyMO verifyMO)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.AffectedData = Commuters.AddVerify(verifyMO);
                Commuters.UpdatePayment(verifyMO.bookingID);
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
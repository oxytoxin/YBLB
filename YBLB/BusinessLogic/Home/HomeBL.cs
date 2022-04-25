using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Home;
using YBLB.Models;
using YBLB.Models.Home;

namespace YBLB.BusinessLogic.Home
{
    public class HomeBL
    {
        ResponseModel responseModel;
        HomeDA homeDa = new HomeDA();


        public ResponseModel AddAnnouncement(HomeMO home)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.AffectedData = homeDa.AddAnnouncement(home);
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
                responseModel.Data = homeDa.GetAnnouncement();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel Getqryheader()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.Getqryheader();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel GetAllReg()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.GetAllReg();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }          
        
        public ResponseModel Getqryheaderarchived()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.Getqryheaderarchived();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel Getqrybody(QueriesBody queriesBody)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.Getqrybody(queriesBody);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel GetAnnSearch(QueriesBody queriesBody)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.GetAnnSearch(queriesBody);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }          
        
        public ResponseModel Archive(QueriesBody queriesBody)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.Archive(queriesBody);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel GetqrybodyInbox(QueriesBody queriesBody)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = homeDa.GetqrybodyInbox(queriesBody);
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
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Credentials;
using YBLB.Models;
using YBLB.Models.Credentials;
using YBLB.Models.Home;

namespace YBLB.BusinessLogic.Credentials
{
    public class CredentialsBL
    {
        ResponseModel responseModel;
        CredentialsDA credentialsDA = new CredentialsDA();

        public ResponseModel UserReg(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UserReg(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel UpdateDetailsUsers(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UpdateDetailsUsers(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel UpdateCredUsers(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UpdateCredUsers(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel UserReg2(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UserReg2(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }       
        
        public ResponseModel UpdateDP(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UpdateDP(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel UpdateDP2(VerifyMO verifyMO)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UpdateDP2(verifyMO);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel UserLogin(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.UserLogin(credentials);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }



        public ResponseModel GetGenerald(CredentialsMO credentials)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.Data = credentialsDA.GetGenerald(credentials);
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
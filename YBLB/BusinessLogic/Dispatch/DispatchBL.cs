using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Dispatch;
using YBLB.Models;

namespace YBLB.BusinessLogic.Dispatch
{
    public class DispatchBL
    {
        ResponseModel responseModel;
        DispatchDA dispatchDA = new DispatchDA();


        public ResponseModel AddDispatch(YBLB.Models.Dispatch.DispatchMO.Dispatch dispatch)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = dispatchDA.AddDispatch(dispatch);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetDispatchSchedul()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = dispatchDA.GetDispatchSchedul();
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
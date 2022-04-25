using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using YBLB.DataAccess.Components;
using YBLB.Models;
using static YBLB.Models.Components.ComponentsMO;

namespace YBLB.BusinessLogic.Components
{
    public class ComponentsBL
    {
        ResponseModel responseModel;
        ComponentsDA componentsDA = new ComponentsDA();

 
        public ResponseModel AddUnit(BusUnit _busUnit)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.AddUnit(_busUnit);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetUbus()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetUnit();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }


        public ResponseModel GetUserlvl()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetUserlvl();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

       
        public ResponseModel AddTerminal(Terminals _terminals)
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.AddTerminal(_terminals);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetTerminals()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetTerminals();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel GetAllusers()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetAllusers();
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel AddFare(Fare _fare)
        {
               responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.AddFare(_fare);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetFare()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetFare(); 
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel AddBusClass(BusClass _busClass)
        {
               responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.AddBusClass(_busClass);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel UpdateFareStatus(Fare fare)
        {
               responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.UpdateFareStatus(fare);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }         
        
        public ResponseModel UpdateFareDetails(Fare fare)
        {
               responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.UpdateFareDetails(fare);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }        
        
        public ResponseModel UpdateBusClass(BusClass _busClass)
        {
               responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Insert Success!";
                responseModel.AffectedData = componentsDA.UpdateBusClass(_busClass);
                return responseModel;
            }
            catch (Exception ex)
            {
                responseModel.Status = "400";
                responseModel.Message = ex.Message;
                return responseModel;
            }
        }

        public ResponseModel GetBusClass()
        {
            responseModel = new ResponseModel();
            try
            {
                responseModel.Status = "200";
                responseModel.Message = "Data Has Been Loaded!";
                responseModel.Data = componentsDA.GetBusClass(); 
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
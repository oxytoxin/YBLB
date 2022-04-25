using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using static YBLB.Models.Components.ComponentsMO;

namespace YBLB.DataAccess.Components
{
    public class ComponentsDA
    {
        MySqlConnection con;
        int o_value;
        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }

        public int AddUnit(BusUnit _busUnit)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_ubus", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("_unitNum", _busUnit.unitNum);
            cmd.Parameters.AddWithValue("_plateNum", _busUnit.plateNum.ToUpper());
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public DataTable GetUnit()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_ubus", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetUserlvl()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_userlvl", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public int AddTerminal(Terminals terminals)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_terminals", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_Tcode", terminals.TCode.ToUpper());
            cmd.Parameters.AddWithValue("i_Tname", terminals.TName);
            cmd.Parameters.AddWithValue("i_Tdesc", terminals.TDesc);
            cmd.Parameters.AddWithValue("i_TRouteCode", terminals.TRouteCode);
            cmd.Parameters.AddWithValue("i_TDistance", terminals.TDistance);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public DataTable GetTerminals()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_terminals", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }        
        
        public DataTable GetAllusers()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_allusers", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public int AddFare(Fare _fare)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_fare", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_StartPoint", _fare.Spoint);
            cmd.Parameters.AddWithValue("i_EndPoint", _fare.Epoint);
            cmd.Parameters.AddWithValue("i_FareAmount", _fare.FAmount);
            cmd.Parameters.AddWithValue("i_Distance", _fare.Distance);
            cmd.Parameters.AddWithValue("i_CompAmount", _fare.CompAmount);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public DataTable GetFare()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_fare", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public int AddBusClass(BusClass _busClass)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_busclass", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_busClassDesc", _busClass.BusClassDesc);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }          
        
        public int UpdateFareStatus(Fare fare)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_farestatus", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_FareID", fare.FareID);
            cmd.Parameters.AddWithValue("I_Status", fare.FareStatus);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public int UpdateFareDetails(Fare fare)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_faredetails", con);
            cmd.CommandType = CommandType.StoredProcedure; 
            cmd.Parameters.AddWithValue("I_FareID", fare.FareID);
            cmd.Parameters.AddWithValue("I_FareAmount", fare.FareAmount);
            cmd.Parameters.AddWithValue("I_CompAmount", fare.CompAmounts);
            cmd.Parameters.AddWithValue("I_Distance", fare.Distance);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }


        public int UpdateBusClass(BusClass _busClass)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_ubus", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_busClassID", _busClass.BusClassID);
            cmd.Parameters.AddWithValue("I_bussClassDesc", _busClass.BusClassDesc);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public DataTable GetBusClass()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_busclass", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

    }
}
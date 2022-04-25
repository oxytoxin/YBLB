using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;

namespace YBLB.DataAccess.Dispatch
{
    
    public class DispatchDA
    {
        MySqlConnection con;
        int o_value;

        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }


        public int AddDispatch(YBLB.Models.Dispatch.DispatchMO.Dispatch dispatch)
        {


            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_dispatch", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_unitID", dispatch.unitID);
            cmd.Parameters.AddWithValue("i_busClassID", dispatch.busClassID);
            cmd.Parameters.AddWithValue("i_startPointID", dispatch.startPointID);
            cmd.Parameters.AddWithValue("i_endPointID", dispatch.endPointID);
            cmd.Parameters.AddWithValue("i_stops", dispatch.stops);
            cmd.Parameters.AddWithValue("i_numPassenger", dispatch.numPassenger);
            cmd.Parameters.AddWithValue("i_compartment", dispatch.compartment);
            cmd.Parameters.AddWithValue("i_message", dispatch.message);
            cmd.Parameters.AddWithValue("i_dispatchDATE", dispatch.dispatchDATE.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("i_dispatchTIME", dispatch.dispatchTIME);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }

        public DataTable GetDispatchSchedul()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_dispatch", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }
    }
}
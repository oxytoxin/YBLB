using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using YBLB.Models.Home;

namespace YBLB.DataAccess.Commuters
{
    public class CommutersDA
    {
        MySqlConnection con;
        int o_value;
        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }


        public DataTable GetTermRoute()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_termRouteC", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetAnnouncement()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_announcementByPassenger", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetPaymentList(int id)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_paymentListbyUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_ID", id);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetNotifHead(int id)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_qryheadercom", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_userID", id);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable AddQueries(QueriesMO queriesMO)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_queriesHeader", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_announceID", queriesMO.I_announceID);
            cmd.Parameters.AddWithValue("I_Uqry", queriesMO.I_Uqry);
            cmd.Parameters.AddWithValue("I_userID", queriesMO.I_userID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }        
        
        public DataTable ValidateQry(QueriesMO queriesMO)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("validate_qry", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_announceID", queriesMO.I_announceID);
            cmd.Parameters.AddWithValue("I_userID", queriesMO.I_userID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable UpdatePayment(int id)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_paymentByUser", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_bookingID", id);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }
        
        public int AddVerify(VerifyMO verifyMO)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_verifier", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_REFERENCES", verifyMO.REFERENCES);
            cmd.Parameters.AddWithValue("i_PAYREFERENCES", verifyMO.PayREFERENCES.ToUpper());
            cmd.Parameters.AddWithValue("i_imgPath", verifyMO.imgPath);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }
    }
}
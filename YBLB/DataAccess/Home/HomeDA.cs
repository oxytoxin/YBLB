using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using YBLB.Models.Home;

namespace YBLB.DataAccess.Home
{
    public class HomeDA
    {
        MySqlConnection con;
        int o_value;

        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }
   

        public int AddAnnouncement(HomeMO home)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_announcement", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_announcement", home.Announcement);
            cmd.Parameters.AddWithValue("i_userlvlID", home.UserLvlID);
            cmd.Parameters.AddWithValue("i_path", home.Path);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }


        public DataTable GetAnnouncement()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_announcement", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable Getqryheader()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_qryheader", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetAllReg()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_allreg", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable Getqryheaderarchived()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_archivedheader", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable Getqrybody(QueriesBody queriesBody)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_queriesbody", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_qryID", queriesBody.I_qryID);
            cmd.Parameters.AddWithValue("I_sendTo", queriesBody.I_sendTo);
            cmd.Parameters.AddWithValue("I_sendBy", queriesBody.I_sendBy);
            cmd.Parameters.AddWithValue("I_queriesbody", queriesBody.I_queriesbody);
            cmd.Parameters.AddWithValue("I_announceID", queriesBody.I_announceID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }       
        
        public DataTable GetAnnSearch(QueriesBody queriesBody)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_annsearch", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_search", queriesBody.I_queriesbody);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable Archive(QueriesBody queriesBody)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_qryheaders", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_headerID", queriesBody.I_qryID);
            cmd.Parameters.AddWithValue("I_isArchived", queriesBody.I_Archive);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable GetqrybodyInbox(QueriesBody queriesBody)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_qrybody", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_qryID", queriesBody.I_qryID);
            cmd.Parameters.AddWithValue("I_MessengerID", queriesBody.I_sendTo);
            cmd.Parameters.AddWithValue("I_announceID", queriesBody.I_announceID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

    }
}
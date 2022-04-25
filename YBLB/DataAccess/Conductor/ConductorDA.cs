using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.DataAccess.Conductor
{
    public class ConductorDA
    {
        MySqlConnection con;
        int o_value;
        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }

        public DataTable ScanTicket(ScanPayment scanPayment)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("scan_ticket", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_paymentID", scanPayment.I_paymentID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable AcceptTicket(ScanPayment scanPayment)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("accpt_payment", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_payment", scanPayment.I_paymentID);
            cmd.Parameters.AddWithValue("i_dispatchedID", scanPayment.I_dispatchedID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable AcceptTicketList(ScanPayment scanPayment)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_acceptedT", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_dispatchID", scanPayment.I_dispatchedID);
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
            MySqlCommand cmd = new MySqlCommand("g_announcementByConductor", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable AddReaction(Reactions reactions)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_reactions", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_announceID", reactions.I_announceID);
            cmd.Parameters.AddWithValue("i_userID", reactions.I_userID);
            cmd.Parameters.AddWithValue("i_react", reactions.I_react);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable Reactions(Reactions reactions)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_reactions", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_userID", reactions.I_userID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

    }
}
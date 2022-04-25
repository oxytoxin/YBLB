using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using static YBLB.Models.Booking.BookingMO;

namespace YBLB.DataAccess.Booking
{
    public class BookingDA
    {
        MySqlConnection con;
        int o_value;
        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }

        public int AddBooking(ApplyBooking _applyBooking)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_booking", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_dispatchID", _applyBooking.i_dispatchid);
            cmd.Parameters.AddWithValue("i_passenger", _applyBooking.i_passenger);
            cmd.Parameters.AddWithValue("i_compartment", _applyBooking.i_compartment);
            cmd.Parameters.AddWithValue("i_remarks", _applyBooking.i_remarks);
            cmd.Parameters.AddWithValue("i_startPoint", _applyBooking.i_startPoint);
            cmd.Parameters.AddWithValue("i_endPoint", _applyBooking.i_endPoint);
            cmd.Parameters.AddWithValue("i_userID", _applyBooking.i_userID);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }


        public int UpdatePayment(ApplyBooking _applyBooking)
        {
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_payment", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_id", _applyBooking.i_id);
            o_value = cmd.ExecuteNonQuery();
            con.Close();
            return o_value;
        }


        public DataTable GetDispatchRoute(Bookings _bookings)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_terminalRoute", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_date", _bookings.I_Date.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("i_time", _bookings.I_Time);
            cmd.Parameters.AddWithValue("i_StartrouteCode", _bookings.I_startPoint);
            cmd.Parameters.AddWithValue("i_EndrouteCode", _bookings.I_endPoint);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetBookFare(Bookings bookings)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_fareBook", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_startPointID", bookings.I_startPoint);
            cmd.Parameters.AddWithValue("i_endPointID", bookings.I_endPoint);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetPaymentList()
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_paymentList", con);
            cmd.CommandType = CommandType.StoredProcedure;
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable GetTermRoute(ApplyBooking applyBooking)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_termRouteA", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i__dispatchID", applyBooking.i_dispatchid);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable UpdateBooking(ApplyBooking applyBooking)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_booking", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_dispatchID", applyBooking.i_dispatchid);
            cmd.Parameters.AddWithValue("i_bookingID", applyBooking.i_bookingid);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


    }
}
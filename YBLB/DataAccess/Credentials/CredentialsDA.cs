using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using YBLB.Models;
using YBLB.Models.Credentials;
using YBLB.Models.Home;

namespace YBLB.DataAccess.Credentials
{
    public class CredentialsDA
    {
        MySqlConnection con;
        int o_value;

        private void Connection()
        {
            Connection connection = new Connection();
            con = new MySqlConnection(connection.ConnectionString());
        }



        public DataTable UserReg(CredentialsMO credentials)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_users", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_uCname", credentials.I_UCNAME);
            cmd.Parameters.AddWithValue("i_uGender", credentials.I_UGENDER);
            cmd.Parameters.AddWithValue("i_uBD", credentials.I_UBD.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("i_uAddress", credentials.I_UADDRESS);
            cmd.Parameters.AddWithValue("i_uEmail", credentials.I_UEMAIL);
            cmd.Parameters.AddWithValue("i_userlvlID", credentials.I_USERLVLID);
            cmd.Parameters.AddWithValue("i_uImg", "none");
            cmd.Parameters.AddWithValue("i_username", credentials.I_USERNAME);
            cmd.Parameters.AddWithValue("i_paswword", credentials.I_PASWWORD);

            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }



        public DataTable UpdateDetailsUsers(CredentialsMO credentials)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_usersdetails3", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_userID", credentials.I_USERID);
            cmd.Parameters.AddWithValue("I_address", credentials.I_UADDRESS);
            cmd.Parameters.AddWithValue("I_email", credentials.I_UEMAIL);
            cmd.Parameters.AddWithValue("I_username", credentials.I_USERNAME);

            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }        
        
        
        public DataTable UpdateCredUsers(CredentialsMO credentials)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_userscred3", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_userID", credentials.I_USERID);
            cmd.Parameters.AddWithValue("I_password", credentials.I_PASWWORD);

            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }



        public DataTable UserReg2(CredentialsMO credentials)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("a_users", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_uCname", credentials.I_UCNAME);
            cmd.Parameters.AddWithValue("i_uGender", credentials.I_UGENDER);
            cmd.Parameters.AddWithValue("i_uBD", credentials.I_UBD.ToString("yyyy-MM-dd"));
            cmd.Parameters.AddWithValue("i_uAddress", credentials.I_UADDRESS);
            cmd.Parameters.AddWithValue("i_uEmail", credentials.I_UEMAIL);
            cmd.Parameters.AddWithValue("i_userlvlID", credentials.I_USERLVLID);
            cmd.Parameters.AddWithValue("i_uImg", credentials.I_UIMG);
            cmd.Parameters.AddWithValue("i_username", credentials.I_USERNAME);
            cmd.Parameters.AddWithValue("i_paswword", credentials.I_PASWWORD);

            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable UpdateDP(CredentialsMO credentials)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_dp", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_userID", credentials.I_USERID);
            cmd.Parameters.AddWithValue("I_imgPath", credentials.I_UIMG);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }

        public DataTable UpdateDP2(VerifyMO verifyMO)
        {
            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("u_dp", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_userID", verifyMO.I_USERID);
            cmd.Parameters.AddWithValue("I_imgPath", verifyMO.I_UIMG);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable UserLogin(CredentialsMO credentials)
        {
           

            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("l_userLogin", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("I_USERNAME", credentials.I_USERNAME); //
            cmd.Parameters.AddWithValue("I_PASSWORD", credentials.I_PASWWORD); //
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


        public DataTable GetGenerald(CredentialsMO credentials)
        {


            DataTable dt = new DataTable();
            Connection();
            con.Open();
            MySqlCommand cmd = new MySqlCommand("g_generalInfo", con);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("i_userID", credentials.I_USERID);
            MySqlDataAdapter da = new MySqlDataAdapter();
            da.SelectCommand = cmd;
            da.Fill(dt);
            return dt;
        }


    }
}
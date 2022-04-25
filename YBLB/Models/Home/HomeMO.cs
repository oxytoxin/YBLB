using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YBLB.Models.Home
{
    public class HomeMO
    {
        public string Announcement { get; set; }
        public int UserLvlID { get; set; }
        public string Path { get; set; }
    }

    public class VerifyMO
    {
        public string REFERENCES { get; set; }
        public string PayREFERENCES { get; set; }
        public int isVerified { get; set; }
        public string imgPath { get; set; }
        public int bookingID { get; set; }

        public int I_USERID { get; set; }
        public String I_UCNAME { get; set; }
        public String I_UGENDER { get; set; }
        public DateTime I_UBD { get; set; }
        public String I_UADDRESS { get; set; }
        public String I_UEMAIL { get; set; }
        public int I_USERLVLID { get; set; }
        public String I_UIMG { get; set; }
        public int I_UACTIVE { get; set; }
        public String I_USERNAME { get; set; }
        public String I_PASWWORD { get; set; }

    }

    public class QueriesMO
    {
        public int I_announceID { get; set; }
        public string I_Uqry { get; set; }
        public int I_userID { get; set; }
    }

    public class QueriesBody
    {
        public int I_qryID { get; set; }
        public int I_sendTo { get; set; }
        public int I_sendBy { get; set; }
        public string I_queriesbody { get; set; }
        public int I_announceID { get; set; }
        public int I_Archive { get; set; }
    }

}
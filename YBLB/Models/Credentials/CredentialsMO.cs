using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YBLB.Models.Credentials
{
    public class CredentialsMO
    {
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
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YBLB.Models.Usermanagement
{
    public class UserMO
    {
        public string uCname { get; set; }
        public string uGender { get; set; }
        public DateTime uBD { get; set; }
        public string uAddress { get; set; }
        public string uEmail { get; set; }
        public int userlvlID { get; set; }
        public string uImgPath { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserID { get; set; }
    }
}
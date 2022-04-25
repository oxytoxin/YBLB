using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace YBLB.Models
{
    public class Connection
    {
        public String ConnectionString() {
            string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString.ToString();
            return cs;
        }
    }
}
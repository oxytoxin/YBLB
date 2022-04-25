using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;

namespace YBLB.Models
{
    public class ResponseModel
    {
        public int ID { get; set; }
        public string Status { get; set; }
        public string Message { get; set; }

        public int AffectedData { get; set; }
        public DataTable Data { get; set; }
    }
}
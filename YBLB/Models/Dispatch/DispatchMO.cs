using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


namespace YBLB.Models.Dispatch
{
    public class DispatchMO
    {
        public class Dispatch { 
            public int unitID { get; set; }
            public int busClassID { get; set; }
            public int startPointID { get; set; }
            public int endPointID { get; set; }
            public string stops { get; set; }
            public int numPassenger { get; set; }
            public double compartment { get; set; }
            public string message { get; set; }
            public DateTime dispatchDATE { get; set; }
            public string dispatchTIME { get; set; }
        }

    }
}
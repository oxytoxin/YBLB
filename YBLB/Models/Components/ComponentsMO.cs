using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YBLB.Models.Components
{
    public class ComponentsMO
    {
        public class BusUnit
        {
            public int unitID { get; set; }
            public int unitNum { get; set; }
            public string plateNum { get; set; }
        }

        public class Terminals
        {
            public String TCode { get; set; }
            public String TName { get; set; }
            public String TDesc { get; set; }
            public int TRouteCode { get; set; }
            public double TDistance { get; set; }
        }

        public class Fare
        {
          
            public String Spoint { get; set; }
            public String Epoint { get; set; }
            public String FAmount { get; set; }
            public String Distance { get; set; }
            public String CompAmount { get; set; }

            //I_FareID I_FareAmount I_CompAmount I_Distance

            public int FareID { get; set; }
            public decimal FareAmount { get; set; }
            public decimal CompAmounts { get; set; }
            public string I_Distance { get; set; }
            public int FareStatus { get; set; }
        }

        public class BusClass
        {
            public int BusClassID { get; set; }
            public String BusClassDesc { get; set; }
        }
    }
}
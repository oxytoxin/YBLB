using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace YBLB.Models.Booking
{
    public class BookingMO
    {
        public class Bookings
        {
            public DateTime I_Date { get; set; }
            public string I_Time { get; set; }
            public int I_startPoint { get; set; }
            public int I_endPoint { get; set; }
        }

        public class ScanPayment
        {
            public int I_paymentID { get; set; }
            public int I_dispatchedID { get; set; }
        }

        public class Reactions
        {
            public int I_announceID { get; set; }
            public int I_userID { get; set; }
            public int I_react { get; set; }
        }

        public class ApplyBooking
        {
            public int i_id { get; set; }
            public int i_dispatchid { get; set; }
            public int i_bookingid { get; set; }
            public int i_passenger { get; set; }
            public int i_compartment { get; set; }
            public string i_remarks { get; set; }
            public int i_startPoint { get; set; }
            public int i_endPoint { get; set; }
            public int i_userID { get; set; }
        }

    }
}
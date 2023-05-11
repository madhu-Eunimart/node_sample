let cancellation_reason = [
    {
        "code": "001",
        "reason": "Price of one or more items have changed due to which buyer was asked to make additional payment",
        "triggers_rto": false,
        "cause_of_cancellation": "seller",
        "weather_applicable_for_part_cancel": true
    },
    {
        "code": "003",
        "reason": "Product available at lower than order price",
        "triggers_rto": false,
        "cause_of_cancellation": "seller",
        "weather_applicable_for_part_cancel": true
    },
    {
        "code": "004",
        "reason": "Order in pending shipment / delivery state for too long",
        "triggers_rto": false,
        "cause_of_cancellation": "Logistics Provider/ Seller",
        "weather_applicable_for_part_cancel": true
    },
    {
        "code": "006",
        "reason": "Order not shipped as per buyer app SLA",
        "triggers_rto": false,
        "cause_of_cancellation": "Seller",
        "weather_applicable_for_part_cancel": true
    },
    {
        "code": "009",
        "reason": "Wrong product delivered",
        "triggers_rto": true,
        "cause_of_cancellation": "Seller",
        "weather_applicable_for_part_cancel": false
    },
    {
        "code": "010",
        "reason": "Buyer wants to modify details",
        "triggers_rto": true,
        "cause_of_cancellation": "Buyer/Buyer App",
        "weather_applicable_for_part_cancel": false
    },
    {
        "code": "012",
        "reason": "Buyer does not want product any more",
        "triggers_rto": true,
        "cause_of_cancellation": "Buyer / Buyer App (prepaid), Seller (COD)",
        "weather_applicable_for_part_cancel": false
    }
]

export { cancellation_reason }
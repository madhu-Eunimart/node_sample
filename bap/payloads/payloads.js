
var city=""
function SearchPayload(data){
  city=data.city
  var payload={
    context: {
        city: city,
        state: data.state,
      },
      message: {
        criteria: {
          delivery_location:data.location,
          area_code:"",
        },
        payment: {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3",
        },
      },
}
// payload.message.criteria=Object.assign(payload.message.criteria,query)
  
    return payload
   }


export{
   SearchPayload 
}

var city=""
function SearchPayload(search_city,query){
  city=search_city
  var payload={
    context: {
        city: city,
        state: "Telangana",
      },
      message: {
        criteria: {
          delivery_location:"17.385044,78.486671",
          area_code:"",
        },
        payment: {
          "@ondc/org/buyer_app_finder_fee_type": "percent",
          "@ondc/org/buyer_app_finder_fee_amount": "3",
        },
      },
}
payload.message.criteria=Object.assign(payload.message.criteria,query)
  
    return payload
   }
// function InitPayload(){
//   return {
//     context:{
//         city:city
//     }
// }
// }


export{
   SearchPayload  // InitPayload
}
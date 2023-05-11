import moment from "moment";


const IsoConverter=async(curr) =>{
    try {
        // let time_data=moment.duration(duration)
        // let curr=moment(moment.now()).add(time_data)
        curr=moment(curr)
        let now=moment(moment.now())
        let diff=curr.diff(now)
        let response = moment.duration(diff).toISOString()
        console.log(response)
        return response;
    } catch (err) {
      console.log("Error ========>>> ", err);
    }
  }

const IsoAndDateToDateConverter=async(timestamp,duration)=>{
    try {
        let time_data=moment.duration(duration)
        let curr=moment(timestamp).add(time_data).toDate()
        // curr=moment(curr)
        // let now=moment(moment.now())
        // let diff=curr.diff(now)
        // let response = moment.duration(diff).toISOString()
        console.log(curr)
        return curr;
    } catch (err) {
      console.log("Error ========>>> ", err);
    }
  }
  
 const IsoToDateConverter=async(duration) =>{
  try {
      let time_data=moment.duration(duration)
      let curr=moment(moment.now()).add(time_data)
      // curr=moment(curr)
      // let now=moment(moment.now())
      // let diff=curr.diff(now)
      // let response = moment.duration(diff).toISOString()
      console.log(curr)
      return curr;
  } catch (err) {
    console.log("Error ========>>> ", err);
  }
}

export {IsoConverter,IsoToDateConverter,IsoAndDateToDateConverter}
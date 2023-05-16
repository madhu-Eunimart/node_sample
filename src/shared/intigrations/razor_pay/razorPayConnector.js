import razorpay from 'razorpay'
import { envdata } from '../../../buyer/config/config';
let razorClient;


const razorPayConnect = async () => {
  const KEY = envdata?.RAZOR_PAY_KEY_ID
  const SECRET = envdata?.RAZOR_PAY_KEY_SECRET

  if (!KEY) {
      throw new Error("razor pay details not configured in ENV file");
  }
  if (!SECRET) {
    throw new Error("razor pay details not configured in ENV file");
  }
  razorClient = new razorpay({ key_id: KEY, key_secret: SECRET })
}

export {
  razorClient,
  razorPayConnect
}

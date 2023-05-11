import razorpay from 'razorpay'

let razorClient;


const razorPayConnect = async () => {
  const KEY = process.env.RAZOR_PAY_KEY_ID
  const SECRET = process.env.RAZOR_PAY_KEY_SECRET

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

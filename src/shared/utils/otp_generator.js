//@ts-check
import { authenticator, totp, hotp } from 'otplib'

const secret = 'secretkey';

authenticator.options = {
    digits: 6,
    step: 300
};

authenticator.allOptions()

const generateOtp = () => {
    let otp = authenticator.generate(secret)
    return otp
}

const verifyOtp = (otp) => {
    return authenticator.verify({ token: otp, secret: secret })
}

export {generateOtp, verifyOtp};

import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const Hash = (password) => {

    return new Promise((resolve, reject) => {
        bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
            if (err) return reject(err);
            bcrypt.hash(password, salt, function(err, hash) {
                if (err) return reject(err);
                resolve(hash)
            });
        });
    })
}

const VerifyHash = (input, password) => {

    return new Promise((resolve, reject) => {
        bcrypt.compare(input, password, function(err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
}

export { Hash, VerifyHash }
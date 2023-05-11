// const AWS = require('aws-sdk')
import AWS from 'aws-sdk'

var s3
export const awsConnect = () => {
    s3 = new AWS.S3({
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
        Bucket: process.env.AWS_S3_BUCKET_NAME
    });
}

const upload = async (file_name, data, account_id,channel_type,extension) => {
    var todays_date= new Date()
   let invoice_path = `${account_id}/ondc-deckn/${channel_type}/${todays_date.getFullYear()}/${todays_date.getMonth() + 1}/${todays_date.getDate()}/${file_name}.${extension}`
    let params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: invoice_path,
        Body: data  // Only accepts [ Buffer, string, stream data, stringify data ]
        // ContentType: 'text/plain'
    };
        return s3.upload(params).promise()
            .then((data) => {
                return data.Location
            })
            .catch(err => console.log(err))
}

export default upload
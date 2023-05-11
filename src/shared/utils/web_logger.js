//@ts-check

import { Server } from 'socket.io'
// import { createAdapter } from '@socket.io/redis-adapter';
// import { Emitter } from '@socket.io/redis-emitter'
// import { redisClient } from "./../database/redis.js";
import Convert from 'ansi-to-html';
var convert = new Convert();

// var myLogFileStream = fs.createWriteStream('app.log');

const WebLogger = async (server) => {

    // console.log('INSIDE')

    // const io = new Server(server);

    // const pubClient = redisClient.duplicate();
    // const subClient = redisClient.duplicate();

    // await pubClient.connect();
    // await subClient.connect();

    // io.adapter(createAdapter(pubClient, subClient));

    // await io.fetchSockets();

    // io.on('connection', function (socket) {

        var fn = process.stdout.write;

        function write() {
            fn.apply(process.stdout, arguments);
            emmitter.apply(emmitter, arguments)
            // myLogFileStream.write.apply(myLogFileStream, arguments);
        }

        var errFn = process.stderr.write
        function error() {
            errFn.apply(process.stderr, arguments);
            emmitter.apply(emmitter, arguments)
            // myLogFileStream.write.apply(myLogFileStream, arguments);
        }


        process.stdout.write = write;
        process.stderr.write = error;

        function emmitter(data) {
            data = convert.toHtml(data)

            let date = new Date().toJSON();

            data = '<b>' + process.pid + ':' + date + '</b> : ' + data

            // socket.emit('message', data);
            process.send({
                type: 'WEBLOGGER',
                message: data   
            })
        }

    // });
}

export default WebLogger;
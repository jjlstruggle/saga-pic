const PREFIX = 'room';
module.exports = app => {
    return async(ctx, next) => {
        const { app, socket} = ctx;
        const id = socket.id;
        const nsp = app.io.of('/chart');
        const query = socket.handshake.query;
        ctx.socket.emit('res', 'connected!');
        await next();
        // execute when disconnect.
        console.log('disconnection!');
    };
};

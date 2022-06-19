module.exports = app => {
    class Controller extends app.Controller {
        async res() {
        //chat事件与客户端的保持一致
           const {ctx,app}=this;
           const nsp = app.io.of('/chart');
           const mes=ctx.args[0]|| {};
            ctx.socket.emit('res', 'hi 我是服务端这是发送给你的消息');
            const params =this.ctx.args[0];
            console.log('接受客户端消息:', params);
            const result=await ctx.service.chartRoom.getAllMes(message_id)
            const {message_id,FromUserID,ToUserID,PostMessages} = query;
            await ctx.service.chartRoom.postMes(message_id,FromUserID,ToUserID,PostMessages)
            nsp.emit('res',result)
            console.log('接受客户端消息:', result);
        }
    }
    return Controller
};

/**
 * Created by hp on 2018/4/25.
 */
(function (w) {
    function OverScene(ctx){
        this.ctx = ctx;
    }
    OverScene.prototype = {
        constructor:OverScene,
        draw: function () {
            /*为了防止影响全局状态，先save再restore*/
            this.ctx.save();
            this.ctx.fillStyle = "rgba(100,100,100,0.8)";
            this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillStyle = "red";
            this.ctx.font = "40px 微软雅黑";
            this.ctx.fillText("GAME OVER",this.ctx.canvas.width/2,this.ctx.canvas.height/2);
            this.ctx.restore();
        }
    };
    var getOverScene = function (ctx) {
        return new OverScene(ctx);
    }
    w.getOverScene = getOverScene;
})(window);
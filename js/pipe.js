/**
 * Created by hp on 2018/4/25.
 */
(function (w) {
    /*constructor:{Pipe}管道构造函数
     * param:{imgDown:Image}口朝下的管道，位于画布上方
     * param:{imgUp:Image}口朝上的管道，位于画布下方
     * param:{space:number}上下管道之间的间距
     * param:{landHeight:number}大地的高度
     * param:{speed:number}速度*/
    function Pipe(ctx,imgDown,imgUp,space,landHeight,speed){
        /*每创建一对管道，自增1*/
        Pipe.len++;
        this.ctx = ctx;
        this.imgDown = imgDown;
        this.imgUp = imgUp;
        this.space = space||100;
        this.landHeight = landHeight;
        this.speed = speed||2;
        /*计算默认的管道的宽高*/
        this.width = this.imgDown.width;
        this.height = this.imgDown.height;
        /*绘制的起始点坐标*/
        this.x =300+this.width*3*(Pipe.len-1);
        /*管道的最小高度*/
        this.minHeight = 100;
        /*管道的最大高度*/
        this.maxHeight = this.ctx.canvas.height-this.space-this.landHeight-this.minHeight;
        this._init();/*内部方法*/
    }
    /*管道实例的数量*/
    Pipe.len = 0;
    Pipe.prototype = {
        constructor:Pipe,
        _init: function () {
            /*随机生成上管道的高度 在最大高度和最小高度之间*/
            this.randomHeight = Math.random()*(this.maxHeight-this.minHeight)+this.minHeight;
            /*上管道的y轴坐标*/
            this.imgDownY = this.randomHeight-this.height;
            /*下管道的y轴坐标*/
            this.imgUpY = this.randomHeight+this.space;
        },
        /*绘制上下管道*/
        draw: function () {
            this.ctx.drawImage(this.imgDown,this.x,this.imgDownY);
            this.ctx.drawImage(this.imgUp,this.x,this.imgUpY);
            /*管道路径*/
            this._drawPath();
        },
        /*更新数据*/
        update: function () {
            this.x-=this.speed;
            if(this.x<=-this.width){
                this.x+=this.width*3*Pipe.len;
            }
        },
        _drawPath: function () {
            this.ctx.save();
            this.ctx.strokeStyle = "transparent";
            this.ctx.rect(this.x,this.imgDownY,this.width,this.height);
            this.ctx.rect(this.x,this.imgUpY,this.width,this.height);
            this.ctx.stroke();
            this.ctx.restore();
        }
    };
    /*工厂模式*/
    var getPipe = function (ctx,imgDown,imgUp,space,landHeight,speed) {
        return new Pipe(ctx,imgDown,imgUp,space,landHeight,speed);
    };
    w.getPipe = getPipe;
})(window);
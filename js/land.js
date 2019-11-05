/**
 * Created by hp on 2018/4/25.
 */
(function (w) {
    /*constructor:{Land}大地构造函数
     * param:{ctx}绘制环境
     * param:{img:Image}绘图资源
     * param:{speed:number}速度*/
    function Land(ctx,img,speed){
        /*每创建一个大地实例，自增1*/
        Land.len++;
        this.ctx = ctx;
        this.img = img;
        this.speed = speed||2;
        /*大地的宽高*/
        this.width = this.img.width;
        this.height = this.img.height;
        /*绘制的起始点坐标*/
        this.x = this.width*(Land.len-1);
        this.y = this.ctx.canvas.height-this.height;
    }
    /*创建大地实例的数量*/
    Land.len = 0;
    /*给原型添加方法*/
    Land.prototype = {
        constructor:Land,
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        update: function () {
            this.x-=this.speed;
            if(this.x<=-this.width){
                this.x+=this.width*Land.len;
            }
        }
    };
    /*工厂模式*/
    var getLand = function (ctx,img,speed) {
        return new Land(ctx,img,speed);
    };
    w.getLand = getLand;
})(window);

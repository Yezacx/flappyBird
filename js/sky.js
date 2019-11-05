/**
 * Created by hp on 2018/4/25.
 */
/*沙箱模式*/
(function (w) {
    /*constructor :{Sky}天空背景构造函数
     *param:{ctx:Context}绘制环境
     *param:{img:Image}绘图资源
     *param:{speed:number}速度*/
    function Sky(ctx,img,speed){
        /*每创建一个实例，自增1*/
        Sky.len++;
        this.ctx = ctx;
        this.img = img;
        /*天空背景图的宽高*/
        this.width = this.img.width;
        this.height = this.img.height;
        /*天空背景绘制的起始点坐标:x轴坐标根据是第几张图变化，y轴一直为0
         * 第一个天空背景对象的初始x轴坐标是0，第二个天空背景对象的初始x轴坐标是天空背景的宽度值*/
        this.x = this.width*(Sky.len-1);
        this.y = 0;
        /*速度*/
        this.speed = speed||3;
    }
    /*创建天空背景的实例数量*/
    Sky.len = 0;
    /*给天空构造函数原型扩充方法*/
    util.extend(Sky.prototype,{
        constructor:Sky,
        draw: function () {
            this.ctx.drawImage(this.img,this.x,this.y);
        },
        /*更新下一帧图像的位置*/
        update: function () {
            this.x-=this.speed;
            if(this.x<=-this.width){
                this.x+= this.width*Sky.len;
            }
        }
    });
    /*第一种方式：工厂模式 把getSky暴露给外界
    外面直接调用getSky()函数就能够获取到Sky构造函数创建的实例*/
    var getSky = function (ctx,img,speed) {
       return new Sky(ctx,img,speed);
    };
    w.getSky = getSky;
    /*第二种方式：直接把构造函数暴露给外界*/
    /*w.Sky = Sky;*/
})(window);
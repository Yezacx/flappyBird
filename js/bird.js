/**
 * Created by hp on 2018/4/25.
 */
(function (w) {
    /*constructor:{Bird}小鸟构造函数
     * param:{ctx:Context}绘制环境
     * param:{img:Image}绘图资源
     * param:{x:number}绘制起始点x轴坐标
     * param:{y:number}绘制起始点y轴坐标
     * param:{widthFrame}一行有多少帧
     * param:{heightFrame}一列有多少帧
     * param:{speed:number}速度*/
    function Bird(ctx,img,x,y,widthFrame,heightFrame,speed){
        this.ctx = ctx;
        this.img = img;
        this.x = x;
        this.y = y;
        this.widthFrame = widthFrame;
        this.heightFrame = heightFrame;
        this.speed = speed||2;/*速度*/
        this.speedPlus = 0.05;/*加速度*/
        /*计算小鸟的宽高*/
        this.width = this.img.width/this.widthFrame;
        this.height = this.img.height/this.heightFrame;
        /*当前行的第几帧*/
        this.currentFrame = 0;
        /*当前列的第几帧*/
        this.direction = 0;
        this._init();
    }
    Bird.prototype =  {
        constructor:Bird,
        _init:function () {
            /*存储当前this,new出来的实例对象*/
            var that = this;
            /*绑定点击画布事件*/
            this.ctx.canvas.addEventListener("click", function () {
                that.speed = -1.5;
            })
        },
        /*绘制小鸟*/
        draw: function () {
            /*初始化小鸟的旋转角度 当下落速度为1的时候，旋转10度，最大旋转角度为45度*/
            var baseRadian = Math.PI/180*10;
            var rotateRadian = baseRadian*this.speed;
            /*最大旋转角度*/
            var maxRadian = Math.PI/180*45;
            rotateRadian = rotateRadian>maxRadian?maxRadian:rotateRadian;
            /*让小鸟的旋转角度随速度变化，点平移坐标轴到小鸟中心，
             再旋转，再画小鸟，起始点坐标为小鸟宽高的负一半*/
            this.ctx.save();
            this.ctx.translate(this.x+this.width/2,this.y+this.height/2);
            this.ctx.rotate(rotateRadian);
            this.ctx.drawImage(this.img,this.width*this.currentFrame,this.height*this.direction,
                this.width,this.height,-this.width/2,-this.height/2,this.width,this.height);
            this.ctx.restore();
        },
        /*更新数据*/
        update: function () {
            this.currentFrame++;
            if(this.currentFrame>this.widthFrame-1){
                this.currentFrame = 0;
            }
            this.y+=this.speed;
            this.speed += this.speedPlus;
        }
    };
    /*工厂模式*/
    var bird = null;
    var getBird = function (ctx,img,x,y,widthFrame,heightFrame,speed) {
        /*单利模式，整个游戏只需要一个小鸟就够了*/
        if(!bird){
            bird = new Bird(ctx,img,x,y,widthFrame,heightFrame,speed);
        }
        return bird;
    };
    w.getBird = getBird;
})(window);
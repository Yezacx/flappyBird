/**
 * Created by hp on 2018/4/25.
 */
(function (w) {
    function Scene(ctx,imgObj){
        this.ctx = ctx;
        this.imgObj = imgObj;
        /*定义一个数组，放所有游戏所需角色*/
        this.arr = [];
        /*添加听众*/
        this.listeners = [];
        this._init();
    }
    Scene.prototype = {
        constructor:Scene,
        _init: function () {
            /*创建2个天空背景对象实现无缝轮播*/
            for(var i=0;i<2;i++){
                /*把创建的每一个对象放进数组里*/
                this.arr.push(getSky(this.ctx, this.imgObj.sky,3));
            }
            /*创建4个大地实例*/
            for(var i=0;i<4;i++){
                this.arr.push(getLand(this.ctx, this.imgObj.land));
            }
            /*创建6个管道实例*/
            for(var i=0;i<6;i++){
                this.arr.push(getPipe(this.ctx, this.imgObj.pipeDown, this.imgObj.pipeUp,150, this.imgObj.land.height));
            }
            /*创建一个小鸟实例*/
            this.arr.push(getBird(this.ctx, this.imgObj.bird,100,19,3,1,2));
        },
        /*添加听众*/
        addListener: function (listener) {
            this.listeners.push(listener);
        },
        /*监听小鸟死亡*/
        triggerBirdOver: function () {
            /*小鸟死亡时告知所有的听众*/
            this.listeners.forEach(function (item) {
                item();
            });
        },
        draw: function () {
            /*每次绘制新的场景时，判断小鸟有没有碰撞，如果有，通知所有听众*/
            var bird = getBird();
            var birdCoreX = bird.x+bird.width/2;
            var birdCoreY = bird.y+bird.height/2;
            if(this.ctx.isPointInPath(birdCoreX,birdCoreY)||birdCoreY<0||
                birdCoreY>this.ctx.canvas.height-this.imgObj.land.height){
                /*监听到了小鸟死亡*/
                this.triggerBirdOver();
            }else{
                /*设置所有的对象执行的方法一致，遍历数组，操作数组中的每个对象
                 * 这里的item就指的是根据构造函数创建的实例，在遍历数组的对调里调用这些实例的方法*/
                /*先清除上一次绘制的路径*/
                this.ctx.beginPath();
                this.arr.forEach(function(item){
                    item.draw();
                    item.update();
                });
            }
        }
    };
    /*工厂模式*/
    var getGameScene = function (ctx,imgObj) {
        return new Scene(ctx,imgObj);
    };
    w.getGameScene = getGameScene;
})(window);
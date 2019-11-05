/**
 * Created by hp on 2018/4/25.
 */
var util = {
    /*混入式继承*/
    extend:function (o1,o2){
            for(var k in o2){
                if(o2.hasOwnProperty(k)){/*k属性属于o2本身才能被o1继承*/
                    o1[k] = o2[k];
                }
            }
    },
    /*图片加载 图片全部加载完毕之后在绘制页面，所以绘制页面整体可以作为一个回调函数，
     满足图片全部加载完毕这个条件之后，再执行*/

    /*imgUrl:Object 以键值对的方式存储想要加载的图片的地址，
     加载完成之后传递给回调函数做实参*/
    loadImage: function (imgUrl,fn) {
        /*存储加载完毕的资源*/
        var imgObj = {};
        var tempImg;
        /*遍历想要加载的图片的数量*/
        var imgLength = 0;
        /*已经加载完毕的图片的数量*/
        var loaded = 0;
        for(var k in imgUrl){
            imgLength++;
            tempImg = new Image();
            tempImg.onload = function () {
                loaded++;
                if(loaded >= imgLength){
                    fn(imgObj);
                }
            };
            tempImg.src = imgUrl[k];
            imgObj[k] = tempImg;
        }
    }
};

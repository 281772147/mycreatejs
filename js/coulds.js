/**
 * Created by mac on 15-6-4.
 */
(function(){
    var MOVE_SIZE = 3;
    var moveperFPS = 1/15;
    function createCoulds(x,y,img){
        var _this = new createjs.Bitmap(img);
        _this.x = x;
        _this.y = y;
        stage.addChild(_this);
        stage.update();
        _this.couldmove = function(){
            if(_this.x <= _this.image.width*-1){
                _this.x = 800;
            }else{
                MOVE_SIZE = -Math.abs(MOVE_SIZE);
                _this.x += MOVE_SIZE;
            }
        };
        return _this;
    };
    //createCoulds.prototype.couldmove = function(){
    //    console.log("could_move")
    //    if(this._this.x<= Math.round(0-this._this.image.width)){
    //        this._this.x = 800;
    //    }else{
    //        MOVE_SIZE = -Math.abs(MOVE_SIZE);
    //    }
    //}
    //function createCoulds(x,y,img){
    //    //createjs.Bitmap.call(this);
    //    this.x = x;
    //    this.y = y;
    //    //this.width = img.width;
    //    //this.height = img.height;
    //    this.init(x,y,img);
    //    return this;
    //}
    //createCoulds.prototype = new createjs.Bitmap();
    //createCoulds.prototype.init = function(x,y,img){
    //    console.log(this);
    //    this.bitmap = new createjs.Bitmap(img);
    //    this.bitmap.x = x;
    //    this.bitmap.y = y;
    //    stage.addChild(this.bitmap);
    //}
    //createCoulds.prototype.couldmove = function(){
    //    console.log("could_move")
    //    if(this.x<= Math.round(0-_this.width)){
    //        this.x = 800;
    //    }else{
    //        MOVE_SIZE = -Math.abs(MOVE_SIZE);
    //    }
    //}
    //window.createCoulds = function(x,y,img){
    //    var obj = new createCoulds();
    //    console.log(obj);
    //    return obj;
    //}
    window.createCoulds = createCoulds;
}());
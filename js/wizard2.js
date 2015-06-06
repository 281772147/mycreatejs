/**
 * Created by mac on 15-6-4.
 */
(function(){
    var MOVE_SIZE = 2;
    var SPEED = 1;
    var GRAVITY = 3;
    var SCALE_X = 0.9;
    var SCALE_Y = 0.9;
    var RATE = 3;
    var moveperFPS = 1/15;
    function createWizard(img){
        var ss = new createjs.SpriteSheet({
            "images":[img],
            "frames":{"height":110,"width":100,count:4},
            "animations":{
                fryright:{frames:[2,3],speed:0.1*RATE},
                fryleft:{frames:[0,1],speed:0.1*RATE}
            }
        });
        var _this = new createjs.Sprite(ss,"fryright");
        _this.speed = SPEED;
        _this.x = Math.round(300*Math.random()+800);
        _this.y = Math.round(Math.random()*380);
        _this.scaleX = SCALE_X;
        _this.scaleY = SCALE_Y;
        stage.addChild(_this);
        stage.update();
        _this.move = function(){
            var sx = _this.speed*MOVE_SIZE;
            //if(_this.x > _this.getBounds().width*-1 ){
                sx = - Math.abs(sx);
            //}
            _this.x += sx;
        }
        return _this;
    }
    window.createWizard = createWizard;

}());
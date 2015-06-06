/**
 * Created by mac on 15-6-4.
 */
(function(){
    var FRAME_RATE = 1;
    var WIDTH = 100;
    var HEIGHT = 100;
    var SPEED = 10;
    var FRY_UP = 50;
    var FRY_DOWN = 1;
    var RATE = 3;
    var moveperFPS = 1/15;
    function createBat(img){
        var ss = new createjs.SpriteSheet({
            "images":[img],
            "frames":{"height":100,"width":100,count:10},
            "animations":{
                fryleft:{frames:[0,1,2,3,4],speed:0.2*RATE},
                fryleftfast:{frames:[0,1,2,3,4],speed:1*RATE},
                fryleftslow:{frames:[0,1,2,3,4],speed:0.1*RATE},
                fryright:{frames:[5,6,7,8,9],speed:0.3*RATE},
                fryrightfast:{frames:[5,6,7,8,9],speed:1*RATE},
                fryrightslow:{frames:[5,6,7,8,9],speed:0.1*RATE}
            }
        });
        var _this = new createjs.Sprite(ss,"fryleft");
        _this.x = 50;
        _this.y = 380;
        _this.scaleX =1;
        _this.scaleY =1;
        //console.log(_this.x + _this.getBounds());
        _this.gotoAndPlay("fryleft");
        stage.addChild(_this);
        stage.update();
        _this.fryup = function(){
            //console.log("bat fryup");
            var bsyup = FRY_UP;
            if(_this.y >= 0){
                bsyup = -Math.abs(FRY_UP);
                _this.y += bsyup;
                stage.update();
            }
        };
        _this.falldown = function(speed){
           // console.log("bat falldown");
            var bsydown = FRY_DOWN*speed;
            if(Math.round(380-_this.y)>=0){
                bsydown = Math.abs(bsydown);
                _this.y += bsydown;
            }
        }
        _this.attack = function(){
            var shengbo = new createjs.Bitmap(loader.getResult("shengbo"));
            shengbo.x = _this.x + _this.getBounds().width + 10;
            shengbo.y = _this.y + (_this.getBounds().height/2)+50;
            //shengbo.addEventListener("tick",shengbomove);
            //shengbos.push(shengbo);
            stage.addChild(shengbo);
            stage.update();
            return shengbo;
        }
        return _this;
    }
    window.createBat = createBat;
}())
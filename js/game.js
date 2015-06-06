/**
 * Created by mac on 15-6-4.
 */
var FPS = 15;
var moveperFPS = 1/15;
//舞台元素
var stage,w,h,loader;
//背景图像
var sky,moon;
var coulds = [];
//显示积分
var text;
var message,message2,barcode;
var messageBox;
var reploadtext;
var reloadbox;
var score = 0;
//声波速度
var SHENGBO_SPEED = 1;
//主角
var bat;
var shengbos = [];
var wizards = [];
var w_speed = 1;
var heart = 4;
var pause;
var TIME = 0;
var progressbox,progresstext;
var text1,text2,text3,text4; //开始游戏
var fpstext;
function init(){
    stage = new createjs.Stage("gameview");
    createjs.Touch.enable(stage);
    w = stage.canvas.width;
    h = stage.canvas.height;

    mainfest = [
        {src:"s2.png",id:"bat"},
        {src:"sky.png",id:"sky"},
        {src:"w.png",id:"wizard"},
        {src:"could1.png",id:"yun1"},
        {src:"could2.png",id:"yun2"},
        {src:"could3.png",id:"yun3"},
        {src:"could4.png",id:"yun4"},
        {src:"moon.png",id:"moon"},
        {src:"peas.png",id:"peas"},
        {src:"tomato.png",id:"tomato"},
        {src:"carrot.png",id:"carrot"},
        {src:"ver.png",id:"vers"},
        {src:"barcode.jpg",id:"barcode"},
        {src:"shengbo.png",id:"shengbo"},
        {src:"./sound/bg.m4a",id:"bgmusic"},
        {src:"./sound/Slime.m4a",id:"fryup"},
        {src:"./sound/Invite.m4a",id:"attack"},
        {src:"./sound/Spawn.m4a",id:"attackontarget"},
        {src:"./sound/Loose.m4a",id:"attacked"}
    ];

    loader = new createjs.LoadQueue(false);
    createjs.Sound.alternateExtensions = ["m4a"];
    loader.installPlugin(createjs.Sound);
    loader.addEventListener("complete",completehandler);
    loader.addEventListener("fileload", fileComplete);
    loader.addEventListener("error", handleFileError);
    loader.addEventListener("fileprogress", handleFileProgress);
    loader.addEventListener("progress", handleProgress);
    //3个参数,第一个 mainfest, 第二个是否立即加载,第三个指定路径,2,3都是可选参数
    loader.loadManifest(mainfest,true);
}

function completehandler(){
    alert("1.任务:保卫水果,不要被巫师进入偷走你的水果\n" +
    "2.操作:点击屏幕,蝙蝠会上飞,不点击,蝙蝠就会回落\n" +
    "3.操作:点击蝙蝠,就会发出声波,攻击屏幕中的巫师\n" +
    "点击'确定'开始游戏");
    stage.removeChild(text1,text2,text3,text4,progresstext);
    stage.removeChild(progressbox);
    stage.update();
    start();
    console.log("start game");
    var instance = playSound("bgmusic");
    instance.volume = 0.5;
    instance.loop = -1;
    sky = new createjs.Shape();
    sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w * 2, h);
    stage.addChild(sky);
    moon = new createjs.Bitmap(loader.getResult("moon"));
    moon.x = 600;
    moon.y = 70;
    text = new createjs.Text("Scores:0", "40px Arial", "yellow");
    text2 = new createjs.Text("Hearts:4", "40px Arial", "yellow");
    text2.x = 600;
    text2.y = 0;
    var verg = new createjs.Bitmap(loader.getResult("vers"));
    var verg1 = new createjs.Bitmap(loader.getResult("vers"));
    verg1.x = 0;
    verg1.y = 0;
    verg.x = 0;
    verg.y = 380;
    fpstext = new createjs.Text("FPS:"+ Math.round(createjs.Ticker.getMeasuredFPS()),"20px Arial","grey");
    fpstext.x = 0;
    fpstext.y = 450;
    stage.addChild(verg,verg1,text,text2,fpstext,moon);
    stage.update();
    //摆放巫师,云
    putCoulds();
    putWizards(4, 1);

    bat = createBat(loader.getResult("bat"));
    bat.addEventListener("mousedown",function(e){
        var sss = createjs.Sound.play("attack");
        sss.volume = 0.8;
        var shengbo =  bat.attack();
        shengbos.push(shengbo);
    });
    createjs.Ticker.setFPS(FPS);
    createjs.Ticker.addEventListener("tick",handlertick);
    stage.addEventListener("stagemousedown",function(e){
        TIME = 0;
        createjs.Sound.play("fryup");
        bat.fryup();
    });
}

function handlertick(e){
    fpstext.text = "FPS:"+Math.round(createjs.Ticker.getMeasuredFPS());
    if(!createjs.Ticker.getPaused()){
        if(wizards.length<=0){
            w_speed++;
            var realspeed = 1 + w_speed/20;
            putWizards(5,realspeed);
        }
        TIME += moveperFPS;
        var bspeed = 1/2*9.8*TIME*TIME;
        bat.falldown(bspeed);
        skymove();
        couldMove();
        wizardsmove();
        shengbomove();
        dealScores();
        stage.update();
    }
}

function putCoulds(){
    var c1 = createCoulds(700,200,loader.getResult("yun1"));
    var c2 =createCoulds(500,100,loader.getResult("yun2"));
    var c3 =createCoulds(300,300,loader.getResult("yun3"));
    var c4 =createCoulds(100,150,loader.getResult("yun4"));
    coulds.push(c1);
    coulds.push(c2);
    coulds.push(c3);
    coulds.push(c4);
}

function couldMove(){
    if(coulds.length>0){
        for(var i=0;i<coulds.length;i++){
            var c = coulds[i];
            c.couldmove();
        }
    }
}
function shengbomove(){
    SHENGBO_SPEED = moveperFPS*30;
    if(shengbos.length>0){
        for(var i =0;i<shengbos.length;i++){
            if(shengbos[i].visible){
                if(shengbos[i].x >= shengbos[i].getBounds().width+w){
                    shengbos[i].visible = false;
                    shengbos.splice(i,1);
                }else{
                    shengbos[i].x += 10*SHENGBO_SPEED;
                    var b = dealattck(shengbos[i]);
                    if(b){
                        shengbos.splice(i,1);
                    }
                }
            }
        }
    }
}

function putWizards(numbers,speed){
    for(var i=0;i<numbers;i++){
        var w = createWizard(loader.getResult("wizard"));
        w.speed = speed;
        wizards.push(w);
    }
}
function wizardsmove(){
    if(wizards.length>0){
        for(var i=0;i<wizards.length;i++){
            if(wizards[i].visible){
                if(wizards[i].x >= -wizards[i].getBounds().width){
                    wizards[i].move();
                }else{
                    createjs.Sound.play("attacked");
                    wizards[i].visible = false;
                    wizards.splice(i,1);
                    heart--;
                }
            }else{
                wizards.splice(i,1);
                heart--;
            }
        }
    }
}

function dealattck(shengbo){
    var ones = shengbo;
    if(ones.visible){
        for(var j=0;j<wizards.length;j++){
            wizards[j];
            if(wizards[j].visible){
                if(Math.abs(wizards[j].x-ones.x) <= 16){
                    if(wizards[j].y - ones.y <=0){
                        if(Math.abs(wizards[j].y - ones.y) <= wizards[j].getBounds().height ){
                            wizards[j].visible = false;
                            ones.visible = false;
                            wizards.splice(j,1);
                            score++;
                            createjs.Sound.play("attackontarget");
                            return true;
                        }
                    }else if(wizards[j].y - ones.y>=0){
                        if(Math.abs(wizards[j].y - ones.y) <= ones.getBounds().height){
                            wizards[j].visible = false;
                            ones.visible = false;
                            wizards.splice(j,1);
                            score++;
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

function dealScores(){
    text.text = "Scores:"+score;
    text2.text= "Hearts:"+heart;
    if(heart===0){
        die();
    }
}

function die(){
    if(localStorage.max!=null && localStorage.max!=undefined){
        if(score > praseInt(localStorage.max)){
            localStorage.max = score;
        }
    }
    message = new createjs.Text("  您的分数:   "+score,"30px Arial","Red");
    message2 = new createjs.Text(" 南沙TT美妆"  ,"20px Arial","Yellow");
    barcode = new createjs.Bitmap(loader.getResult("barcode"));

    reploadtext = new createjs.Text("重新开始","30px Arial","Yellow");
    messageBox = new createjs.Shape();
    reloadbox = new createjs.Shape();
    messageBox.graphics.beginFill("#333").drawRoundRect(150,100,500,320,10).endFill();
    reloadbox.graphics.beginFill("#666").beginStroke("white").drawRoundRect(230,210,200,50,10).endFill();
    message.x = 220;
    message.y = 150;

    reploadtext.x = 260;
    reploadtext.y = 220;

    message2.x = 260;
    message2.y = 300;

    barcode.x = 400;
    barcode.y = 280;
    barcode.scaleX = 0.6;
    barcode.scaleY = 0.6;
    stage.addChild(messageBox);
    stage.addChild(reloadbox);
    stage.addChild(message,message2,barcode);
    stage.addChild(reploadtext);
    reloadbox.addEventListener("click",function(e){
        window.location.reload(true);
    });
    stop();
}
function skymove(){
    if(sky.x <= (w*-1) ){
        sky.x = 0;
    }else{
        sky.x += -1;
    }
}

function stop(){
    pause = createjs.Ticker.setPaused(true);
}

function start(){
    pause = createjs.Ticker.setPaused(false);
}
function handleFileError(evt) {
    console.log("error ", evt);
}

function handleFileProgress(evt) {
    progressbox = new createjs.Shape();
    progressbox.graphics.beginFill("white").drawRect(50,50,(w-100),(h-100)).endFill();
    stage.addChild(progressbox);
    progresstext = new createjs.Text("File Loading:","30px Arial","red");
    progresstext.x = 200;
    progresstext.y = 320;
    stage.addChild(progresstext);
    progresstext.text = "File Loading: " + (loader.progress.toFixed(2) * 100) + "%";
    stage.update();
}

function handleProgress(evt) {
    progressbox = new createjs.Shape();
    progressbox.graphics.beginFill("white").drawRect(50,50,(w-100),(h-100)).endFill();
    stage.addChild(progressbox);
    progresstext = new createjs.Text("Loading:","30px Arial","red");
    progresstext.x = 200;
    progresstext.y = 320;
    stage.addChild(progresstext);
    progresstext.text = "Loading: " + (loader.progress.toFixed(2) * 100) + "%";
    text1 = new createjs.Text("任务:保卫水果,不要被巫师进入偷走你的水果","30px Arial","red");
    text2 = new createjs.Text("操作:点击屏幕,蝙蝠会上飞,不点击,蝙蝠就会回落","20px Arial","red");
    text3 = new createjs.Text("操作:点击蝙蝠,就会发出声波,攻击屏幕中的巫师","20px Arial","red");
    text4 = new createjs.Text("点击开始游戏","20px Arial","red");
    text1.x = text2.x = text3.x = text4.x = progressbox.x + 50;
    text1.y = progressbox.y + 50;
    text2.y = text1.y + 50;
    text3.y = text2.y + 50;
    text4.y = text3.y + 50;
    text4.x += 50;
    stage.addChild(text1,text2,text3,text4);
    stage.update();
    stop();
}

function fileComplete(evt) {

}

function playSound(name) {
    return createjs.Sound.play(name);
}
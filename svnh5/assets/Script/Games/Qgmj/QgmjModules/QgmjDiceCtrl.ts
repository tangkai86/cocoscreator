/*
author: JACKY
日期:2018-01-12 16:08:22
*/
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseModel from "../../../Plat/Libs/BaseModel";
import UiMgr from "../../../Plat/GameMgrs/UiMgr";
import ModuleMgr from "../../../Plat/GameMgrs/ModuleMgr";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import QgmjLogic from "../QgmjMgr/QgmjLogic";
import UserMgr from "../../../Plat/GameMgrs/UserMgr";
import { QgmjDef } from "../QgMjMgr/QgmjDef";
import FrameMgr from "../../../Plat/GameMgrs/FrameMgr";
import QgmjAudio from "../QgmjMgr/QgmjAudio"

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : QgmjDiceCtrl;
//模型，数据处理
class Model extends BaseModel{
	list=null;
	step=null;
	totalstep=null;
	dice1Value=null;
	dice2Value=null;
	constructor()
	{
		super();

		//在这里定义视图和控制器数据
		this.clear();
	}  
	initRandom(finalpoint){ 
		this.step=1;
		var pool = {}  
		for (var i=0;i<this.totalstep;++i){
			var rand = 0
			var tmp = pool[rand] || rand // 对于第二个池子，序号跟id号是一致的
			pool[rand] = pool[i] || i
			pool[i] = tmp
	
			this.list.push(tmp)
		}
		this.list.push(finalpoint); 
	}
	initDices(data){
		this.dice1Value=Number(data.touzi1);
		this.dice2Value=Number(data.touzi2);
	}
	clear(){
		// body
		this.list=[];
		this.step=1;
		this.totalstep=QgmjLogic.dicetime; 
	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
		Dice1:null,
		Dice2:null,
		DiceList:null
	};
	node=null;
	constructor(model){
		super(model);
		this.node=ctrl.node;
		this.initUi();
	}
	//初始化ui
	initUi()
	{
		this.ui.Dice1=ctrl.Dice1;
		this.ui.Dice2=ctrl.Dice2;
		this.ui.DiceList=ctrl.DiceList;
		this.node.active=false;
		this.ui.Dice1.getComponent('cc.Animation').on('finished', this.onDice1Finished, this);
		this.ui.Dice2.getComponent('cc.Animation').on('finished', this.onDice2Finished, this);
	}
	runDice()
	{ 
		this.node.active=true; 
		this.ui.Dice1.getComponent('cc.Animation').play();
		this.ui.Dice2.getComponent('cc.Animation').play();
	}
	onDice1Finished()
	{
		console.log("dice1Finish"+this.model.dice1Value);
		var name = "ThrowDiceResult_0"+this.model.dice1Value;
		var spriteFrame = this.ui.DiceList.getSpriteFrame(name);
		if(spriteFrame){
			this.ui.Dice1.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }else{
            cc.error('atlas lost frame= '+name+', user value= ',value);
        }
	}
	onDice2Finished()
	{
		console.log("dice2Finish"+this.model.dice2Value);
		var name = "ThrowDiceResult_0"+this.model.dice2Value;
		var spriteFrame = this.ui.DiceList.getSpriteFrame(name);
		if(spriteFrame){
			this.ui.Dice2.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        }else{
            cc.error('atlas lost frame= '+name+', user value= ',value);
        }
	}
	hideDice()
	{
		this.node.active=false;
	}
}
//c, 控制
@ccclass
export default class QgmjDiceCtrl extends BaseCtrl {
	//这边去声明ui组件
    @property(cc.Node)
	Dice1=null;

    @property(cc.SpriteAtlas)
    DiceList:cc.SpriteAtlas = null;

    @property(cc.Node)
	Dice2=null;
	//声明ui组件end
	//这是ui组件的map,将ui和控制器或试图普通变量分离 

	onLoad (){
		//创建mvc模式中模型和视图
		//控制器
		ctrl = this;
		//数据模型
		this.initMvc(Model,View);
	}

	//定义网络事件
	defineNetEvents()
	{
		this.n_events={ 
			//网络消息监听列表
			onProcess:this.onProcess,
		}
	}
	//定义全局事件
	defineGlobalEvents()
	{

	}
	//绑定操作的回调
	connectUi()
	{
	}
	start () {
	}
	//网络事件回调begin
	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
 
	onProcess(msg){ 
		if (msg.process==QgmjDef.process_ready){ 
			this.process_ready(msg);
		}
		else if(msg.process==QgmjDef.process_dingzhuang){ 
			this.process_dingzhuang(msg);
		} 
		else if(msg.process==QgmjDef.process_fapai){ 
			this.process_fapai(msg);
		} 
	}
	process_ready(){
		// body   
		this.model.clear();
		this.view.clear();
	}
	process_dingzhuang(msg)
	{
		this.model.initDices(msg);
		this.view.runDice();
		QgmjAudio.getInstance().playDiceAudio();
	} 
	process_fapai(msg)
	{
		this.view.hideDice();
	}
}
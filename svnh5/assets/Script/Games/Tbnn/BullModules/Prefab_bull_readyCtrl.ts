/*
author: YOYO
日期:2018-03-02 15:26:14
准备图标
*/
import BaseModel from "../../../Plat/Libs/BaseModel";
import BaseView from "../../../Plat/Libs/BaseView";
import BaseCtrl from "../../../Plat/Libs/BaseCtrl";
import RoomMgr from "../../../Plat/GameMgrs/RoomMgr";
import BullConst from "../BullMgr/BullConst";

//MVC模块,
const {ccclass, property} = cc._decorator;
let ctrl : Prefab_bull_readyCtrl;
//模型，数据处理
class Model extends BaseModel{
	constructor()
	{
		super();

	}
}
//视图, 界面显示或动画，在这里完成
class View extends BaseView{
	ui={
		//在这里声明ui
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
    }

    setReady(logicSeatId:number){
        let viewId = RoomMgr.getInstance().getViewSeatId(logicSeatId);
        let curNode = this.node.children[viewId];
        if(curNode){
            curNode.active = true;
        }
    }
    
    hideAll(){
        let children = this.node.children;
        for(let i = 0; i < children.length; i ++){
            children[i].active = false;
        }
    }
    //初始下准备的显示
    initPrepare (){
        console.log('强行刷新准备信息===', RoomMgr.getInstance().preparemap)
        let Room = RoomMgr.getInstance();
        let children = this.node.children;
        let viewSeatId, logicSeatId;
        for(let i = 0; i < children.length; i ++){
            viewSeatId = i;
            logicSeatId = Room.getLogicSeatId(viewSeatId);
            let isPrepare = Room.preparemap[logicSeatId];
            children[i].active = isPrepare;
        }
    }
}
//c, 控制
@ccclass
export default class Prefab_bull_readyCtrl extends BaseCtrl {
    view:View = null
    model:Model = null
	//这边去声明ui组件

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
        this.n_events = {
            'onPrepare':this.onPrepare,
            // 'http.reqUsers':this.http_reqUsers, 
            'connector.entryHandler.enterRoom':this.connector_entryHandler_enterRoom,
        };
        this.n_events[BullConst.clientEvent.onProcess] = this.onProcess;
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
    
    onProcess(msg){
		if(msg.process==BullConst.process.start){ 
            console.log('游戏开始，清理准备')
            this.view.hideAll();
            // 同步服务端时间 msg.servertime
		}else if(msg.process==BullConst.process.settle){

        }else if(msg.process==BullConst.process.giveCards){
            
        }
    }
    
    onPrepare(msg){
        console.log('onPrepare进入准备的 id= ', msg)

        this.view.setReady(msg.seatid);
    }

    connector_entryHandler_enterRoom(msg){
        this.view.initPrepare();
    }

	//end
	//全局事件回调begin
	//end
	//按钮或任何控件操作的回调begin
	//end
}
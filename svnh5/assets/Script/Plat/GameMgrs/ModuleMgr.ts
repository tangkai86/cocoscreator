import LogMgr from "./LogMgr";

//控制器基类 
let G_MODULE=
{
    Login:'Login',  
	LoadingPlat:'LoadingPlat',  
    Plaza:'Plaza', 
    QzmjRoom:'QzmjRoom',
    QgmjRoom:'QgmjRoom',
    BullRoom:'BullRoom', 
    SssRoom:'SssRoom', 
    UserLogin:'SubLayer/Plat/UserLogin/Prefab_UserLogin',
    UserRegister:'SubLayer/Plat/UserLogin/Prefab_UserRegister',
	MsgBox:'SubLayer/Plat/MsgBox/Prefab_MsgBoxCtrl',
	HintBox:'SubLayer/Plat/MsgBox/Prefab_HintBoxCtrl',
	LoadingGame:'LoadingGame',
	PlazaSetting:'SubLayer/Plat/PlazaSetting/Prefab_settingCtrl',
    LuckDraw:'SubLayer/Plat/LuckDraw/Prefab_luckDraw',
    LuckDrawTipPanel:'SubLayer/Plat/LuckDraw/Prefab_luckDrawTipCtrl',
	AgencyBind:'SubLayer/Plat/PlazaSetting/Prefab_AgencyBind',
	AccountBind:'SubLayer/Plat/PlazaSetting/Prefab_AccountBind',
	ChatNode:'SubLayer/Plat/Chat/Prefab_ChatNode',
	Mail:'SubLayer/Plat/Mail/Prefab_Mail', 
    Shared:'SubLayer/Plat/Shared/Prefab_sharedCtrl',
	Shop:'SubLayer/Plat/Shop/Prefab_shopCtrl',
	ShopDetail:'SubLayer/Plat/Shop/Prefab_shopDetailCtrl',
    joinRoom:'SubLayer/Plat/CreateRoom/Prefab_JoinRoom',
    createRoom:'SubLayer/Plat/CreateRoom/Prefab_CreateRoomPanel',
    QzmjCreate:'SubLayer/Plat/CreateRoom/Prefab_QzmjCreate',
    PlayerDetail:'SubLayer/Plat/PlayerDetail/Prefab_playerDetailCtrl',
    ReliefMoney:'SubLayer/Plat/MsgBox/Prefab_reliefMoneyCtrl',
    HarvestFrame:'SubLayer/Plat/MsgBox/Prefab_harvestCtrl',
    SignIn:'SubLayer/Plat/SignIn/Prefab_SignIn',
    LoadAni:'SubLayer/Plat/MsgBox/Prefab_loadAniCtrl',
	GoldMode:'SubLayer/Plat/GoldMode/Prefab_GoldModeCtrl',
	RoomSetting:'SubLayer/Plat/RoomSetting/Prefab_roomSettingCtrl',  
	shimingRenZheng:'SubLayer/Plat/PlayerDetail/Prefab_shimingRenZheng',
	changeName:'SubLayer/Plat/PlayerDetail/Prefab_changeName',
	tipFrame:'SubLayer/Plat/tips/Prefab_tipsCtrl',
	gameDetailResult:'SubLayer/Games/Qzmj/gameDetailResult/Prefab_gameDetailResultCtrl',
	qgmjGameDetailResult:'SubLayer/Games/Qgmj/gameDetailResult/Prefab_gameDetailResultCtrl',
	Rank:'SubLayer/Plat/Rank/Prefab_RankCtrl',
	RoleDetail:'SubLayer/Plat/Rank/Prefab_roleDetailCtrl',
	RuleDescription:'SubLayer/Plat/RuleDescription/Prefab_RuleCtrl',
	More:'SubLayer/Plat/More/More',
	MoreGame:'SubLayer/Plat/CreateRoom/Prefab_MoreGameSuggestion',
	MoreRuleSuggestion:'SubLayer/Plat/CreateRoom/Prefab_RoomRuleMoreSuggestion',
	DefaultRule:'SubLayer/Plat/CreateRoom/Prefab_DefaultRule',
	ClubCreate:'SubLayer/Plat/Club/Club_Create',
	ClubEnter:'SubLayer/Plat/Club/Club_EnterSelect',
	ClubLobby:'SubLayer/Plat/Club/Club_Lobby',
	ClubSeek:'SubLayer/Plat/Club/Club_SeekList',
	ClubMember:'SubLayer/Plat/Club/Club_MemberList',
	ClubRecord:'SubLayer/Plat/Club/Club_RecordList',
	ClubRecordC:'SubLayer/Plat/Club/Club_RecordContent',
	ClubChangeName:'SubLayer/Plat/Club/Club_ChangeName',
	ClubChangeIcon:'SubLayer/Plat/Club/Club_ChangeIcon',
	MatchVideo:'MatchVideo',
	Tranning:'SubLayer/Plat/Tranning/Prefab_tranning',
	ClubApplication:'SubLayer/Plat/Club/Club_applicationList', 
	ApplyDisbandRoom:'SubLayer/Plat/ApplyDissolutionRoom/Prefab_ApplyDissolutionRoom',
	bingPhone:'SubLayer/Plat/PlayerDetail/Prefab_bingPhone',  
} 
window['G_MODULE']=G_MODULE;


export default class ModuleMgr{ 
	  
	gameModules=null;
	registerGame(modules)
	{
		this.gameModules=modules;
		for(var key in modules)
		{
			G_MODULE[key]=modules[key];
		}
	}
	//启动模块(全屏)
	start_module(sceneName)
	{
		var cb=function()
		{
			LogMgr.getInstance().showModule(sceneName)
		}
		cc.director.loadScene(sceneName,cb.bind(this));
	}   
	start_sub_module(prefabName:string, cb:Function)
	{ 
        if(!prefabName){
            cc.error('start_sub_module name== ',prefabName)
            return
        }
		cc.loader.loadRes(prefabName, (err, prefab:cc.Prefab)=> { 
			if(err){
				cc.error(err) 
			}else{
				let prefabNode = cc.instantiate(prefab);
                prefabNode.parent = cc.find('Canvas');
                let prefabComp = prefabNode.getComponent(prefab.name);
                cb(prefabComp?prefabComp:prefabNode);
				LogMgr.getInstance().showSubModule(prefabName)
			} 
		}); 
	}       
    private static _instance:ModuleMgr;
  
    public static getInstance ():ModuleMgr{
        if(!this._instance){
            this._instance = new ModuleMgr();
        }
        return this._instance;
    }
}

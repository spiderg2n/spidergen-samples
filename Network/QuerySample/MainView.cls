
/**
Constructor
Do not call Function in Constructor.
*/
class MainView()
{
	super();

	//TODO:edit here

}
extends AView;


function MainView*onInitDone()
{

	//TODO:edit here

};


function MainView*onConfirmBtnClick(comp, info, e)
{
	theApp.qm.sendProcessByName('ac001', this.getContainerId(), null,
	
	//inblock function, 서버로 전송되기 바로 전에 호출되는 함수
	function(queryData)
	{
		queryData.printQueryData();
		
		var blockData = queryData.getBlockData('InBlock1');
		blockData[0].login_id = '7777';
	},
	
	//outblock function, 서버로부터 데이터를 수신한 후 바로 호출되는 함수
	function(queryData)
	{
		queryData.printQueryData();
		
		var blockData = queryData.getBlockData('OutBlock1');
		blockData[0].uid = 456789;		
	});

};

function MainView*onSendBtnClick(comp, info, e)
{
theApp.qm.sendProcessByName('ac002', this.getContainerId(), null,
	
	//inblock function, 서버로 전송되기 바로 전에 호출되는 함수
	function(queryData)
	{
		queryData.printQueryData();
		
		//var blockData = queryData.getBlockData('InBlock1');
		//blockData[0].login_id = '7777';
	},
	
	//outblock function, 서버로부터 데이터를 수신한 후 바로 호출되는 함수
	function(queryData)
	{
		queryData.printQueryData();
		/*
		var blockData = queryData.getBlockData('OutBlock1');
		
		if(blockData[0].sex==1) blockData[0].sex = '남성';
		else blockData[0].sex = '여성';*/
	});
};


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


function MainView*init(context, evtListener)
{
	super.init(context, evtListener);

	//TODO:edit here

};

function MainView*onInitDone()
{
	super.onInitDone();

	//TODO:edit here

};

function MainView*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	//TODO:edit here

};

function MainView*onATextBox1Actionup(comp, info, e)
{
	var menu = new AMenu();
	
	var itemInfos = 
	[
		{ text:'Menu1' },
		{ text:'Menu2' },
		{ text:'Menu3' },
		{ text:'SubMenu', sub: [ {text:'Sub1'}, {text:'Sub2'}, {text:'Sub3'} ] }
	];

	menu.setItemInfoArr(itemInfos);
	menu.popupEx({left:e.pageX, top:e.pageY}, function(result)
	{
		console.log(result);
	
	});

};

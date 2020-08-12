
/**
Constructor
Do not call Function in Constructor.
*/
function MainView()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(MainView, AView);


MainView.prototype.onInitDone = function()
{

	//TODO:edit here

};

MainView.prototype.onMenuBtnClick = function(comp, info, e)
{

	this.getContainer().navigator.goPage(comp.getComponentId());

};

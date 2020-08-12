
/**
Constructor
Do not call Function in Constructor.
*/
class BackKeySampleApp()
{
	super();

	//TODO:edit here

}
extends AApplication;


function BackKeySampleApp*onReady()
{
	super.onReady();
	
	var navigator = new ANavigator();
	navigator.registerPage('Source/LoginView.lay', 'LoginView');
	navigator.registerPage('Source/MainView.lay', 'MainView');
	
	navigator.goPage('LoginView');
};

function BackKeySampleApp*unitTest(unitUrl)
{
	//TODO:edit here

	this.onReady();

	super.unitTest(unitUrl);
};

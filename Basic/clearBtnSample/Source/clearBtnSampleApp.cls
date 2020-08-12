

/**
Constructor
Do not call Function in Constructor.
*/
class clearBtnSampleApp()
{
	super();

	//TODO:edit here

}
extends AApplication;


function clearBtnSampleApp*onReady()
{
	super.onReady();

	//var navigator = new ANavigator();
	//navigator.registerPage('Source/MainView.lay', 'MainView');
	//navigator.goPage('MainView');

	//or

	this.setMainContainer(new APage('main'));
	this.mainContainer.open('Source/MainView.lay');

	//TODO:edit here

};

function clearBtnSampleApp*unitTest(unitUrl)
{
	//TODO:edit here

	this.onReady();

	super.unitTest(unitUrl);
};

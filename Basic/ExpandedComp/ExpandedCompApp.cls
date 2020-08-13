
/**
Constructor
Do not call Function in Constructor.
*/
class ExpandedCompApp()
{
	super();

	//TODO:edit here

}
extends AApplication;


function ExpandedCompApp*onReady()
{
	super.onReady();

	var navigator = new ANavigator();
	navigator.registerPage('Source/MainView.lay', 'MainView');
	navigator.registerPage('Source/DnDSampleView.lay', 'DnDSampleView');
	navigator.registerPage('Source/AnimaSampleView.lay', 'AnimaSampleView');
	navigator.registerPage('Source/ScrollManagerSampleView.lay', 'ScrollManagerSampleView');
	navigator.registerPage('Source/BackupManagerSampleView.lay', 'BackupManagerSampleView');
	navigator.registerPage('Source/ResponsiveSampleView.lay', 'ResponsiveSampleView');
	navigator.registerPage('Source/RBMSampleView.lay', 'RBMSampleView');
	
	
	navigator.goPage('MainView');

};

function ExpandedCompApp*unitTest(unitUrl)
{
	//TODO:edit here

	this.onReady();

	super.unitTest(unitUrl);
};

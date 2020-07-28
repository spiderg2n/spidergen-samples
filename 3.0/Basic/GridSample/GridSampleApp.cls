
import 'Framework/afc/component/AApplication.js'
import 'Framework/afc/component/APage.js'
import 'Framework/afc/component/AToast.js'


/**
Constructor
Do not call Function in Constructor.
*/
class GridSampleApp()
{
	super();

	//TODO:edit here

}
extends AApplication;


function GridSampleApp:onReady()
{
	super.onReady();

	this.setMainContainer(new APage('main'));
	this.mainContainer.open('Source/Views/MainView.lay');


};

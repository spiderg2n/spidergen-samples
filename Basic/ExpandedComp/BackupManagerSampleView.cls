
/**
Constructor
Do not call Function in Constructor.
*/
class BackupManagerSampleView()
{
	super();

	//TODO:edit here

}
extends AView;


function BackupManagerSampleView*onInitDone()
{

	this.testListView.createBackup( 60, 20 );
	this.testGrid.createBackup( 60, 20 );
	
};

function BackupManagerSampleView*onBackBtnClick(comp, info, e)
{

	this.getContainer().navigator.goPrevPage();

};

function BackupManagerSampleView*onAddItemBtnClick(comp, info, e)
{
	var data = [], time = new Date().getMilliseconds();
	
	for(var i=0; i<20; i++)
	{
		data.push(time);
	}

	//listview
	this.testListView.addItem('Source/subviews/subview1.lay', data);
	

};

function BackupManagerSampleView*onAddRowBtnClick(comp, info, e)
{
	var data, time = new Date().getMilliseconds();
	
	for(var i=0; i<20; i++)
	{
		data = i+':'+time;
		this.testGrid.addRow([data, data, data]);
	}
};


function BackupManagerSampleView*onMoveTopBtnClick(comp, info, e)
{
	this.testListView.scrollToTop();

};

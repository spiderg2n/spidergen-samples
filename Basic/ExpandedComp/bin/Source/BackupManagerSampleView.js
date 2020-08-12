
/**
Constructor
Do not call Function in Constructor.
*/
function BackupManagerSampleView()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(BackupManagerSampleView, AView);


BackupManagerSampleView.prototype.onInitDone = function()
{

	this.testListView.createBackup( 60, 20 );
	this.testGrid.createBackup( 60, 20 );
	
};

BackupManagerSampleView.prototype.onBackBtnClick = function(comp, info, e)
{

	this.getContainer().navigator.goPrevPage();

};

BackupManagerSampleView.prototype.onAddItemBtnClick = function(comp, info, e)
{
	var data = [], time = new Date().getMilliseconds();
	
	for(var i=0; i<20; i++)
	{
		data.push(time);
	}

	//listview
	this.testListView.addItem('Source/subviews/subview1.lay', data);
	

};

BackupManagerSampleView.prototype.onAddRowBtnClick = function(comp, info, e)
{
	var data, time = new Date().getMilliseconds();
	
	for(var i=0; i<20; i++)
	{
		data = i+':'+time;
		this.testGrid.addRow([data, data, data]);
	}
};


BackupManagerSampleView.prototype.onMoveTopBtnClick = function(comp, info, e)
{
	this.testListView.scrollToTop();

};

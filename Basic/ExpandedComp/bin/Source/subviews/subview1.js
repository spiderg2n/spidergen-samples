
/**
Constructor
Do not call Function in Constructor.
*/
function subview1()
{
	AView.call(this);

	//TODO:edit here

}
afc.extendsClass(subview1, AView);


subview1.prototype.onInitDone = function()
{

	//TODO:edit here

};


subview1.prototype.setData = function(data)
{

	this.lbl1.setText(data);
	this.msg1.setText(data + ' message.');

};

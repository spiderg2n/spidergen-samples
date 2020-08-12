
function ACanvas()
{
	AComponent.call(this);
	
	this.ctx = null;
	
	//this.data = new Array();
	this.data = null;
	
}
afc.extendsClass(ACanvas, AComponent);

ACanvas.CONTEXT = 
{
    tag: '<canvas data-base="ACanvas" data-class="ACanvas" class="ACanvas-Style"></canvas>',

    defStyle: 
    {
        width:'200px', height:'200px'
    },

    events: []
};


ACanvas.prototype.init = function(context, evtListener)
{
	AComponent.prototype.init.call(this, context, evtListener);
	
	this.ctx = this.element.getContext('2d');
	
	this.actionToFocusComp();
};

ACanvas.prototype.updatePosition = function(pWidth, pHeight)
{
    AComponent.prototype.updatePosition.call(this, pWidth, pHeight);
	
	this.resizeCanvas();
	
	if(this.onUpdateCanvas) this.onUpdateCanvas();
};

ACanvas.prototype.setData = function(data)
{
    this.data = data;
};

ACanvas.prototype.getData = function()
{
	return this.data;
};

ACanvas.prototype.resizeCanvas = function()
{
	var w = this.getWidth();
	var h = this.getHeight();
	
	this.$ele.attr('width', w+'px');
	this.$ele.attr('height', h+'px');

};
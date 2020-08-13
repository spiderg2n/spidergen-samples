
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

function MainView*onAddBtnClick(comp, info, e)
{
	var row = this.testGrid.addRow(['', 'a', 'b', '']);
	
	var chk = this.makeCheckBox('테스트', 100),
		btn = this.makeButton('실행');
	
	this.testGrid.layComponent( chk, row, 0);//comp, row, col, width, height
	this.testGrid.layComponent( btn, row, 3, '50%', '90%');
};


function MainView*onGridCheckClick(comp, info, e)
{
	console.log(comp.getValue());
	console.log(comp.getCheck());
};

function MainView*onGridBtnClick(comp, info, e)
{
	AfcMessageBox('알림', '실행 버튼 클릭!');
};

function MainView*onCheckedRowsClick(comp, info, e)
{
	var $rows = this.testGrid.getRows();
	var chkArr = [];
	
	//첫번째 컬럼의 컴포넌트들 얻기
	$rows.find('td:eq(0)').each(function()
	{
		var ele = $(this).children().get(0);
		
		if(ele.acomp.getCheck())
			chkArr.push(ele.acomp.getValue());
	});
	
	console.log(chkArr);
	
	
	/*	다음과 같은 방식으로 패치될 예정
	var comps = this.testGrid.getColumnComps(0);
	var chkArr = [];
	
	for(var i=0; i<comps.length; i++)
	{
		if(comps[i].getCheck())
			chkArr.push(comps[i].getValue());
	}
	
	console.log(chkArr);
	*/	
	
	
	
};

function MainView*makeCheckBox(text, value)
{
	var acomp = new ACheckBox();
	acomp.init();
	//acomp.$ele.css('padding-top', '2px');
	acomp.setStyleObj({
		'margin-left': '5px',
		'height':'30px'
	});	
	acomp.setText(text);
	acomp.setValue(value);
	acomp.addEventListener('click', this, 'onGridCheckClick');
	
	return acomp;
};

function MainView*makeButton(text)
{
	var acomp = new AButton();
	acomp.init();
	acomp.setStyleObj({
		'margin-left': '5px',
		'height':'30px',
		'border':'1px solid gray'
	});	
	acomp.setText(text);
	acomp.addEventListener('click', this, 'onGridBtnClick');
	
	return acomp;
};


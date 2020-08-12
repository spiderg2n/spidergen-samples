
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

	//클리어버튼 클릭후 이벤트를 받고 싶을때 클리어버튼뷰에 델리게이터를 설정한다.
	//델리게이터(this)에 onAfterClearInpuText(textfiled) 함수가 호출된다.
	this.clearInputView.setDelegator(this);
	

};

function MainView*onInitDone()
{
	super.onInitDone();

	

};

function MainView*onActiveDone(isFirst)
{
	super.onActiveDone(isFirst);

	//TODO:edit here

};


function MainView*onAfterClearInpuText(comp)
{
	console.log(comp);
};




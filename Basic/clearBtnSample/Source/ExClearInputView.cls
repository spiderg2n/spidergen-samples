
/**

view 에 컴포넌트 순서는 다름과 같아야 합니다.
  |-- ATextField
  |-- AButton
  
*/
class ExClearInputView()
{
	super();

	this.txtField = null;
	this.clearBtn = null;
	this.delegator = null;
	

}
extends AView;


function ExClearInputView*init(context, evtListener)
{
	super.init(context, evtListener);

	var childs = this.getChildren();
	
	this.txtField = childs[0];
	this.clearBtn = childs[1];
	
	this.clearBtn.addEventListener('click', this, 'onClearBtnClick');
	this.txtField.addEventListener('keyup', this, 'onTextFieldKeyUp');
	this.txtField.addEventListener('change', this, 'onTextFieldChange');	
		
	//숫자키패드때문에 추가
	var tfEle = this.txtField.element;
	if(tfEle.type == 'number')
	{
		if(afc.isIos)
		{
			tfEle.inputmode = "numeric";
			tfEle.pattern = "[0-9]*";
			tfEle.min="0";
		}
		else
		{
			tfEle.pattern = "\d*";
		}		
	}
		
	if(!this.txtField.getText())
		this.hideButton();
	else
		this.showButton();
		

};


function ExClearInputView*setText(text)
{
	if(!text) this.hideButton();
	
	this.txtField.setText(text);
};


function ExClearInputView*getText()
{
	return this.txtField.getText();
};


//입력 텍스트가 변경 되었을 경우
function ExClearInputView*onTextFieldKeyUp(acomp, info, e)
{
	if(!acomp.getText())
	{
		this.hideButton();
	}
	
};


//입력 텍스트가 변경 되었을 경우
function ExClearInputView*onTextFieldChange(acomp, info, e)
{
	if(info) 
		this.showButton();
	else 
		this.hideButton();
		
};


function ExClearInputView*showButton()
{
	this.clearBtn.centerY();
	this.clearBtn.show();	
};

function ExClearInputView*hideButton()
{
	this.clearBtn.hide();
};


//클리어 버튼이 클릭되었을 경우
function ExClearInputView*onClearBtnClick(acomp, info, e)
{

	e.preventDefault();
	
	this.txtField.setText('');
	this.hideButton();
	
	if(this.delegator && this.delegator.onAfterClearInpuText)
		this.delegator.onAfterClearInpuText(this.txtField);
	else
	{
		if(!this.delegator)
			console.log('There is no delegate.');
		else		
			console.log('The onAfterClearInpuText function does not exist.');
	}
	
};


function ExClearInputView*setDelegator(delegator)
{
	this.delegator  = delegator;
}


















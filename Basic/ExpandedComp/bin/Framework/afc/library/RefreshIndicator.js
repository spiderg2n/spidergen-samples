/**
 * @author 
 */

function RefreshIndicator()
{
	this.element = null;
	this.acomp = null;
	this.iconColor = 'rgb(66, 133, 244)';
	this.spinnerColor = 'rgb(66, 133, 244)';
};

RefreshIndicator.prototype.init = function(comp, ele)
{
	this.element = ele;
	this.acomp = comp;
	
	//개발중에는 생성하지않는다.
	if(comp.isDev()) return;
	
	// refresh event 시에 추가한다.
	this.$indicator = $('\
<div>\
	<div class="pull-to-refresh-control"">\
        <svg class="pull-to-refresh-icon" fill="' + this.iconColor +'" width="24" height="24" viewBox="0 0 24 24">\
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></path>\
          <path d="M0 0h24v24H0z" fill="none"></path>\
        </svg>\
        <svg class="pull-to-refresh-spinner" width="24" height="24" viewBox="25 25 50 50">\
          <circle class="pull-to-refresh-path" cx="50" cy="50" r="20" fill="none" stroke="' + this.spinnerColor +'" stroke-width="4" stroke-miterlimit="10"></circle>\
        </svg>\
	</div>\
</div>');
	
	this.$indicator.css(
	{
		position: 'absolute',
		margin: 'auto',
		left: 0,
		top: '-40px',
		right: 0,
		width: '40px',
		height: '40px',
		opacity: 0
	});
	this.$controlDiv = this.$indicator.children().eq(0);
	this.$iconDiv = this.$controlDiv.children().eq(0);
	this.$spinnerDiv = this.$controlDiv.children().eq(1);
	
	this.$controlDiv.css({
		position: 'absolute',
		width: '100%',
		height: '100%',
		'justify-content': 'center',
		'align-items': 'center',
		'background-color': '#fff',
		'border-radius': '50%',
		'box-shadow': '0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647)',
		display: 'none'
	});
	
	this.$spinnerDiv.css({
		'transform-origin': 'center center',
		animation: 'pull-to-refresh-material-rotate 2s linear infinite'
	});
	
	this.$spinnerDiv.children().eq(0).css({
		  'stroke-dasharray': '1, 200',
		  'stroke-dashoffset': 0,
		  'stroke-linecap': 'round',
		  animation: 'pull-to-refresh-material-dash 1.5s ease-in-out infinite'
	});

	this.$modalBg = $('<div></div>');
	this.$modalBg.css(
	{
		'width':'100%', 'height':'100%',
		'position':'absolute',
		'top':'0px', 'left':'0px',
		//'z-index':zIndex,
		'display': 'none'
	});
	
	$(ele).append(this.$indicator);
	$(ele).append(this.$modalBg);
	
	var thisObj = this,
		agrid = this.acomp,
		startX = 0, startY = 0,
		isTouchLeave = true,
		$div = this.$indicator;
	

	this.$indicator.on('transitionend', function()
	{
		if(['aborting', 'restoring'].indexOf(thisObj.state) < 0) return;
		
		$div.css({
			opacity: 0,
			transition: ''
		});

		if(thisObj.state == 'restoring') thisObj.acomp.enable(true);
		thisObj.changeStyleByState(null);
		thisObj.distance = thisObj.offset = null;
		//$div.removeClass('pull-to-refresh--' + thisObj.state);
		//thisObj.distance = thisObj.state = thisObj.offset = null;
	});
	
	AEvent.bindEvent(ele, AEvent.ACTION_DOWN, function(e)
	{
		isTouchLeave = false;
		
		/*//자체적으로 스크롤을 구현하고 현재 스크롤이 진행중일 경우는 셀렉트 이벤트를 발생시키지 않는다. 
		if(agrid.scrlManager && agrid.scrlManager.scrlTimer)
		{
			isTouchLeave = true;
			return;
		}*/

		var oe = e.changedTouches[0];
		startX = oe.clientX;
		startY = oe.clientY;
	});	

	AEvent.bindEvent(ele, AEvent.ACTION_MOVE, function(e)
	{
		if(isTouchLeave) return;

		var oe = e.changedTouches[0];
		var d = oe.clientY;
		var maxH = this.clientHeight/3;
		
		if(comp.getScrollPos() >= 1 || d < 0 && !thisObj.state || thisObj.state in { aborting: 1, refreshing: 1, restoring: 1 }) return;
		
		//if(e.cancelable) e.preventDefault();
		
		if(thisObj.distance == null)
		{
			thisObj.offset = d;
			thisObj.changeStyleByState('pulling');
			//thisObj.state = 'pulling';
			//$div.addClass('pull-to-refresh--' + thisObj.state);
			//onStateChange(state, opts);
		}
		
		d = d - thisObj.offset;
		if(d < -15) d = -15; //if(d < 0) d = 0;
		if(d > maxH) d = maxH;
		thisObj.distance = d;
		
		if(d >= maxH && thisObj.state != 'reached' || d < maxH && thisObj.state !== 'pulling')
		{
			thisObj.changeStyleByState(thisObj.state === 'reached' ? 'pulling' : 'reached');
			//$div.removeClass('pull-to-refresh--' + thisObj.state);
			//thisObj.state = thisObj.state === 'reached' ? 'pulling' : 'reached';
			//$div.addClass('pull-to-refresh--' + thisObj.state); //addClass(thisObj.state);
			//onStateClass(state, opts);
		}
		
		$div.css({
			transform: 'translate3d(0px, ' + d + 'px, 0px) rotate(' + (360*(d/maxH)) + 'deg)',
			opacity: (d/40)>1?1:d/40,
			transition: ''
		});

		if(d == (maxH))
		{
			//$div.removeClass('pull-to-refresh--' + thisObj.state);
			//thisObj.state = 'reached';
			//$div.addClass('pull-to-refresh--' + thisObj.state);
			
			thisObj.changeStyleByState('reached');
		}
	});

	AEvent.bindEvent(ele, AEvent.ACTION_UP, function(e)
	{
		if(isTouchLeave) return;
		isTouchLeave = true;
		
		if(thisObj.state == null) return;

		// 취소
		if(thisObj.state == 'pulling')
		{
			thisObj.changeStyleByState('aborting');
// 			$div.removeClass('pull-to-refresh--' + thisObj.state);
// 			thisObj.state = 'aborting';
// 			$div.addClass('pull-to-refresh--' + thisObj.state);
			$div.css({
				transform: 'translateY(-15px) rotate(0deg)',
				opacity: '0',
				transition: 'transform 0.3s, opacity 0.15s'
			});

			// transitionend 에서 처리
			/*setTimeout(function() {
				$div.css({
					opacity: 0,
					transition: ''
				});
			
				thisObj.changeStyleByState(null);
				//$div.removeClass('pull-to-refresh--' + thisObj.state);
				//thisObj.distance = thisObj.state = thisObj.offset = null;
				thisObj.distance = thisObj.offset = null;
			}, 300);*/
		}
		// 갱신
		else if(thisObj.state == 'reached')
		{
			thisObj.changeStyleByState('refreshing');
// 			$div.removeClass('pull-to-refresh--' + thisObj.state);
// 			thisObj.state = 'refreshing';
// 			$div.addClass('pull-to-refresh--' + thisObj.state);
			$div.css({
				transform: 'translateY(' + (this.clientHeight/3) + 'px) rotate(720deg)',
				transition: 'transform 0.2s'
			});
			
			// refresh UI 제거는 직접 hide 호출

			if(thisObj.refreshFunc) thisObj.refreshFunc();
			//agrid.reportEvent('refresh');
		}
	});

	AEvent.bindEvent(ele, AEvent.ACTION_CANCEL, function(e)
	{
		thisObj.changeStyleByState(null);
// 		thisObj.state = '';
		isTouchLeave = true;
// 		toolTip.hide();
	});
};

RefreshIndicator.prototype.changeStyleByState = function(state)
{
	this.state = state;
	if(state)
	{
		this.$controlDiv.css('display', 'flex');
		
		if(['pulling', 'aborting', 'reached'].indexOf(state) > -1)
		{
			this.$iconDiv.show();
			this.$spinnerDiv.hide();
			this.$modalBg.hide();
		}
		else if(['refreshing', 'restoring'].indexOf(state) > -1)
		{
			this.$iconDiv.hide();
			this.$spinnerDiv.show();
			this.acomp.enable(false);
			this.$modalBg.show();
		}
	}
	else this.$controlDiv.hide();
};

RefreshIndicator.prototype.hide = function()
{
	var thisObj = this;
	this.changeStyleByState('restoring');
// 	this.$indicator.removeClass('pull-to-refresh--' + this.state);
// 	this.state = 'restoring';
// 	this.$indicator.addClass('pull-to-refresh--' + this.state);
	this.$indicator.css({
		transform: this.$indicator.css('transform') + ' scale(0.01)',
		transition: 'transform 0.3s'
	});

	/*setTimeout(function() {
		thisObj.changeStyleByState(null);
// 		this.$indicator.css('display', 'none');
// 		$div.removeClass('pull-to-refresh--' + thisObj.state);
// 		thisObj.distance = thisObj.state = thisObj.offset = null;
		thisObj.distance = thisObj.offset = null;
	}, 300);*/
};

RefreshIndicator.prototype.setRefreshFunc = function(refreshFunc)
{
	this.refreshFunc = refreshFunc;
};

RefreshIndicator.prototype.setIconColor = function(color)
{
	this.iconColor = color;
	this.$iconDiv.attr('fill', color);
};

RefreshIndicator.prototype.setSpinnerColor = function(color)
{
	this.spinnerColor = color;
	this.$spinnerDiv.children().eq(0).attr('stroke', color);
};

RefreshIndicator.prototype.destroy = function()
{
	//if(afc.isIos) return;
	
	if(this.timer) 
	{
		clearInterval(this.timer);
		this.timer = null;
	}

	AEvent.unbindEvent(this.scrlElement, 'scroll', this.scrlFunc);
	
	this.scrlElement = null;
	this.scrlFunc = null;
	
	this.$indicator.remove();
	this.$indicator = null;
};
/*
RefreshIndicator.prototype.setStyle = function(styleObj)
{
	this.$indicator.css(styleObj);
};


//delegator is function
RefreshIndicator.prototype.resetScrollPos = function(callback)
{
	this.resetCallback = callback;
};

RefreshIndicator.prototype.setScrollOffset = function(scrollOffset)
{
	this.scrollOffset = scrollOffset;
};

RefreshIndicator.prototype.scrollProc = function()
{
	var thisObj = this, ratio, indi = this.$indicator[0];
	
	
	this.scrlFunc = function(e)
	{
		thisObj.checkTime = Date.now();
	
		if(!thisObj.isVisible) thisObj.show();
		
		if(thisObj.isScrollVert)
		{
			ratio = this.scrollTop/thisObj.scrollArea;					//비율 = 스크롤위치 / 스크롤 가능 전체영역
			indi.style.top = (thisObj.posArea*ratio+thisObj.scrollOffset)+'px';
		}
		else
		{
			ratio = this.scrollLeft/thisObj.scrollArea;
			indi.style.left = (thisObj.posArea*ratio+thisObj.scrollOffset)+'px';
		}
	};
	
	AEvent.bindEvent(this.scrlElement, 'scroll', this.scrlFunc);
	
	//최초 초기화 시점에 잠시 보여준다.
	setTimeout(function()
	{
		if(!thisObj.isVisible) thisObj.show();
		
	}, 500);
};

RefreshIndicator.prototype.show = function()
{
	if(!this.$indicator) return;
	
	var scrlEle = this.scrlElement, indiSize;
	
	if(this.isScrollVert)
	{
		//스크롤 가능한 영역
		this.scrollArea = scrlEle.scrollHeight - scrlEle.clientHeight;
		
		//스크롤 영역이 없는 경우는 안보여준다.
		if(this.scrollArea < 1) return;
	
		//차지하는 비율을 구한 뒤 스크롤-인디케이터의 높이를 지정한다.
		indiSize = scrlEle.clientHeight * (scrlEle.clientHeight / scrlEle.scrollHeight);
		this.$indicator.css('height', indiSize+'px');

		//인디케이터 높이를 제외한 영역
		this.posArea = scrlEle.clientHeight - indiSize;
	}
	else
	{
		//스크롤 가능한 영역
		this.scrollArea = scrlEle.scrollWidth - scrlEle.clientWidth;
		
		//스크롤 영역이 없는 경우는 안보여준다.
		if(this.scrollArea < 1) return;
	
		//차지하는 비율을 구한 뒤 스크롤-인디케이터의 높이를 지정한다.
		indiSize = scrlEle.clientWidth * (scrlEle.clientWidth / scrlEle.scrollWidth);
		this.$indicator.css('width', indiSize+'px');

		//인디케이터 높이를 제외한 영역
		this.posArea = scrlEle.clientWidth - indiSize;
	}
	
	if(this.resetCallback) 
	{
		this.resetCallback.call(this);
	}
	
	this.$indicator.show();
	
	this.isVisible = true;
	
	if(!this.isNoHide) this.checkScrollStop();
};

RefreshIndicator.prototype.checkScrollStop = function()
{
	var thisObj = this;
	
	if(!this.timer)
	{
		thisObj.checkTime = Date.now();
		
		this.timer = setInterval(function()
		{
			if(Date.now()-thisObj.checkTime > 500)
			{
				clearInterval(thisObj.timer);
				thisObj.timer = null;
				
				if(!thisObj.isNoHide)
				{
					thisObj.$indicator.fadeOut(300, function()
					{
						thisObj.isVisible = false;
					});
				}
			}
		
		}, 200);
	}
	
};*/
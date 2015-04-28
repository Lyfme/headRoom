function FixMessage(opt) {
	/** 参数定义
	*	dom: 为dom节点，wrap为外部容器，content为内容
	*	scrollHeight: 窗口滑动多少距离出现效果
	*	position: 默认为true, 指的是顶部提示栏, 如改为false, 则为底部提示栏
	**/
	//默认参数
	var oDefaults = {
		dom: {
			wrap: "",
			cont: ""
		},
		scrollHeight: "200",
		position: true,
	};
	//继承
	this.oOption = $.extend(oDefaults, opt);
	//定义私有变量
	var _oSelf = this;
	//定义私有方法
	var _init = function () {
		//判断传入参数是否正确
		_fnJustice();
		//绑定方法
		_fnBind();
	}
	//申明dom元素
	var _sWrap = $(_oSelf.oOption.dom.wrap),
		_sCont = $(_oSelf.oOption.dom.cont);

	//初始化参数验证方法
	var _fnJustice = function () {
		if (_sWrap.length < 0) {
			return false;
		} 
		if (_sCont.length < 0) {
			return false;
		}
		if (typeof _oSelf.oOption.position == "boolean") {
			return false;
		}
	};
	//事件绑定方法
	var _fnBind = function () {
		var _sStartScrollTop = $(window).scrollTop(),
			_sScreenWidth = window.screen.width,
			_sJustice = true;
		//定义滚动方法

		var _fnScroll = function (scrollTop) {
			var _fnSlideUp = function () {
				if (_oSelf.oOption.position) {
					_sWrap.stop().animate({
						top: -_sWrap.height()
					}, 300);
				} else {
					if (_sWrap.is(":hidden")) {
						_sWrap.css({
							bottom: -_sWrap.height()
						})
						.show()
						.stop().animate({
							bottom: 0
						}, 300);
					} else {
						_sWrap.stop().animate({
							bottom: 0
						}, 300);
					}
				}
			};
			var _fnSlideDown = function () {
				if (_oSelf.oOption.position) {
					_sWrap.stop().animate({
						top: 0
					}, 300);
				} else {
					_sWrap.stop().animate({
						bottom: -_sWrap.height()
					}, 300);
				}
			}
			var _fnSlide = function (n) {
				if (n == 1) {
					_fnSlideDown();
				} else {
					if (scrollTop >= _oSelf.oOption.scrollHeight) {
						_fnSlideUp();
					}
				}
			};
			if (scrollTop - _sStartScrollTop > 0) {
				_sStartScrollTop = scrollTop;
				_fnSlide(0);
			}else if (scrollTop - _sStartScrollTop < 0){
				_sStartScrollTop = scrollTop;
				_fnSlide(1);
			}
		};
		//窗口滚动的时候调用滚动方法
		$(window).scroll(function () {
			var _sScrolltop = $(window).scrollTop();
			_fnScroll(_sScrolltop);
		});
	};
	_init();
}

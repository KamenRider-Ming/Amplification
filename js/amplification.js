

(function($){
	
	var Amplification = function(containerClass){

		var self = this;

		this.parentObj = $(containerClass);
		this.curObj = this.parentObj.find(".js-amplification");
		this.imgObj = this.curObj.find(".amplification-img");
		this.ampBtn = $('<div class = "amplification-btn">');
		this.ampShow = $('<div class = "amplification-show">');
		this.hoverdiv = $('<div class = "amphover-show">');
		this.ampShowImg = $('<img class = "ampshow-img" src = "' + this.imgObj.attr("src")+ '"/>');

		this.defaults = {
			smallPicWidth : 64,//显示图片宽度
			smallPicHeight : 27,//显示图片高度
			magGlassWidth : 30,//放大镜宽度
			magGlassHeight : 30,//放大镜高度
			magSize : 5,//放大倍数
		}


		var options = $.parseJSON(self.curObj.attr("data-settings"));


		this.options = $.extend({}, self.defaults, options);



		this.addShowCodes();



		this.setSize();

		this.setMagBtn();//设置放大镜的大小


		this.hoverdiv.hover(function(event){
			self.ampBtn.css("display", "block");
			self.ampShow.css("display", "block")
			self.setBtnpos(event);
		}, function(){
			self.ampBtn.css("display", "none");
			self.ampShow.css("display", "none");
		});

		this.hoverdiv.mousemove(function(event) {
			/* Act on the event */
			self.setBtnpos(event);
			self.setMagPosition();
		});

		this.ampBtn.mousemove(function(event) {
			/* Act on the event */
			event.stopPropagation();
			self.setBtnpos(event);
			self.setMagPosition();
		});

		$(window).resize(function(){
			self.setMagBtn();
		});
	}

	Amplification.prototype = {
		addShowCodes : function(){//加载放大镜代码
			var self = this;
			self.ampShow.append(self.ampShowImg);
			self.curObj.append(self.ampBtn, self.ampShow, self.hoverdiv);

			this.ampShowImg.css({
				width: self.options.magSize * self.options.smallPicWidth,
				height : self.options.magSize * self.options.smallPicHeight,
			});

		},

		setSize : function(){
			var self = this;
			this.curObj.css({
				width : self.options.smallPicWidth,
				height : self.options.smallPicHeight
			});

			this.hoverdiv.css({
				width : self.options.smallPicWidth,
				height : self.options.smallPicHeight
			});

			this.imgObj.css({
				width : self.options.smallPicWidth,
				height : self.options.smallPicHeight
			});
		},

		setMagPosition : function(){
			var self = this;
			this.ampShowImg.css({
				left : - self.ampBtn.position().left * self.options.magSize,
				top : -self.ampBtn.position().top * self.options.magSize
			});
		},

		setMagBtn : function(){
			var self = this;
			this.ampBtn.css({
				width:self.options.magGlassWidth,
				height:self.options.magGlassHeight
			});

			var left = self.curObj.outerWidth() + 10,
				top = 0;
			if($(window).width() < self.curObj.outerWidth() + self.options.magSize * self.options.magGlassWidth){
				left = 0;
				top = self.curObj.outerHeight() + 10;
			}

			this.ampShow.css({
				left : left,
				width : self.options.magSize * self.options.magGlassWidth,
				height : self.options.magSize * self.options.magGlassHeight,
				top : top
			});
		},

		setBtnpos : function(event){
			var self = this,
				wileft = event.pageX - self.imgObj.offset().left - self.options.magGlassWidth / 2,
				hitop = event.pageY - self.imgObj.offset().top - self.options.magGlassHeight / 2;
			if(wileft < 0) wileft = 0;
			if(hitop < 0) hitop = 0;
			if(wileft + self.options.magGlassWidth > self.options.smallPicWidth) wileft =  self.options.smallPicWidth - self.options.magGlassWidth;
			if(hitop + self.options.magGlassHeight > self.options.smallPicHeight) hitop =  self.options.smallPicHeight - self.options.magGlassHeight;

			this.ampBtn.css({
				left: wileft,
				top: hitop
			})
		}
	}

	window['Amplification'] = Amplification;
})(jQuery);
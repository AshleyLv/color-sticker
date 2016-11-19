;(function($, window, document, undefined){
	var counter = 0;
	var line = 0;
	var initPosition = 100;
	var hasMovingSticker = false;
	var defaults = {
		
 	}
	
	function Sticker(element,options){
		this.element = $(element);
		this.options = $.extend({}, defaults, options);
		this.init();
	}
	Sticker.prototype = {
		init : function(){
			this._createAddingBtn();
		},
		_createAddingBtn : function(){
			var addingBtn = document.createElement('div');
			addingBtn.className = 'sticker-adding-btn';
			addingBtn.appendChild(document.createTextNode('+'));
			document.getElementsByTagName('body')[0].appendChild(addingBtn);
			$(addingBtn).on('click', this, this._createSticker);
			

		},
		_createSticker : function(event){
			var Sticker = event.data;
			var stickerEl = document.createElement('div');
			stickerEl.className = 'sticker';
			if((document.body.clientWidth + document.body.scrollLeft) - counter*240 < 240){
				counter = 0;
				line++;
			} 
			stickerEl.style.left = initPosition + counter*240 + 'px';
			stickerEl.style.top = initPosition + line*270 + 'px';
			var tape = document.createElement('div');
			tape.className = 'tape';
			var stickerTA = document.createElement('textarea');
			var closeBtn = $('<button type="button" class="close-btn">×</button>');

			stickerEl.appendChild(closeBtn[0]);
			stickerEl.appendChild(tape);
			stickerEl.appendChild(stickerTA);
			document.getElementsByTagName('body')[0].appendChild(stickerEl);
			stickerEl.childNodes[0].addEventListener('click',Sticker.closeSticker);
			counter++;
			$(stickerEl).on('mousedown', Sticker._dragSticker);
			$(window).on('mousemove', Sticker._moveSticker);
			$(window).on('mouseup', Sticker._dropSticker);
		},
		_dragSticker : function(event){
			
			if(event.target.className.indexOf('tape') != -1 && !this.moving){
				
				this.clientX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft);
				this.clientY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop); 
				this.style.left = this.clientX + 'px';
				this.style.top = this.clientY + 'px';
				this.moving = true;
				this.style.cursor = 'pointer';
				hasMovingSticker = true;
			}

		},
		_moveSticker : function(event){
			if(hasMovingSticker){
				var stickers = $('.sticker');
				for(var i=0;i<stickers.length;i++){
					if(stickers[i].moving){
						event.preventDefault();
						var newClientX = event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft),
						newClientY = event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);
						var left = parseInt(stickers[i].style.left) || 0;
						var top = parseInt(stickers[i].style.top) || 0;
						stickers[i].style.left = left + (newClientX - stickers[i].clientX) + 'px';
						stickers[i].style.top = top + (newClientY - stickers[i].clientY) + 'px';
						stickers[i].clientX = newClientX;
						stickers[i].clientY = newClientY;
					}
				}
			}
			

		},
		_dropSticker : function(event){
			if(hasMovingSticker){
				var stickers = $('.sticker');
				for(var i=0;i<stickers.length;i++){
					if(stickers[i].moving){

						stickers[i].style.left = stickers[i].clientX = event.clientX;  
						stickers[i].style.top = stickers[i].clientY = event.clientY; 
						stickers[i].style.cursor = 'none';
						stickers[i].moving = false; 
					}
				}

			}
			
		},
		closeSticker : function(){
			this.parentElement.remove();
		}

	}

	$.sticker = function(options, sticker){
		new Sticker(this,options);
	}

})(window.jQuery, window, document);
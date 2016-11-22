# Color Sticker

This is a jQuery plugin, which allows you to adding stickers on your webpage.
The color sticker has following features:
  - Clicking on the blue button which is on the upper right of the webpage to create a new sticker
  - Clicking on the save button on the right bottom of the sticker, you can save the location and content of the sticker with a callback function
  - You can drag the stickers in anywhere on the webpage
  - you can importing existing stickers with a json object
  - You can remove a sticker by click on the close button

How to use it:<br/>
  - Inclouding colorsticker.js and color-sticker.css to your html code<br/>
 ```
<link rel="stylesheet" type="text/css" href="css/color-sticker.css">
<script type="text/javascript" src="js/colorsticker.js"></script>
```
  - default initialization
```
$.sticker({});
```
  - settings
```
$.sticker({
	color:'purple', //the default value is yellow, we also provide pink,green,blue,purple for you to choice
	width:'200px',  //the width of each sticker, the default value is 200px
	height:'300px', //the height of each sticker, the default value is 200px
	saveStickerCallback: function(sticker){   //callback function of saving a sticker, The param is a sticker object, which includes the location info and the content
		alert('sticker info: left ' + sticker.left + ',top ' + sticker.top + ',content ' + sticker.content);
	}，
	closeStickerCallback： function(stickerId){  //callback function of remove sticker,the param is stickerId which is setted by user
		alert(stickerId);
	}
});
```
  - importing existing stickers
```
/**Importing stickers as an array, each object in the array should has following attrbutes.
 *stickerId--A sticker id, which is used to tell the webapp which sticker has been removed by user
 *left--location info
 *top--location info
 *content--content of sticker
**/
var stickers = [{stickerId:'2',left:'1000px', top:'100px', content:'I\'m Ashley\'s cat'}];
$.sticker({
	color:'purple', 
	width:'200px',  
	height:'300px', 
	saveStickerCallback: function(sticker){   
		alert('sticker info: left ' + sticker.left + ',top ' + sticker.top + ',content ' + sticker.content);
	}，
	closeStickerCallback： function(stickerId){  
		alert(stickerId);
	}
}，stickers);//The sticker array is the second param of the instantiation function
```

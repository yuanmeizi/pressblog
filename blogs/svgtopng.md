---
title: SVG转PNG
date: 2019-07-15 9:30:00
categories: tips
tags:
  - svg
  - png


---

# js转化svg为png

(其实没软用)

<!--more-->


## svg转png
```
(function (global) {

    //global就是window
    global.svgToPng = function (svgHtml) {
        this.svgHtml = svgHtml;
    };

    global.svgToPng.prototype = {
        change:function (filename) {
            var This = this;
            [
                ['version', 1.1],
                ['xmlns', "http://www.w3.org/2000/svg"],
            ].forEach(function(item){
                This.svgHtml.setAttribute(item[0], item[1]);
            });
            var str = This.svgHtml.parentNode.innerHTML;
 
            //生成img
            var img = document.createElement('img');
 
            //把img的src设置为
            img.setAttribute('src', 'data:image/svg+xml;base64,'+ btoa(unescape(encodeURIComponent(str))));
            
            img.onload = function(){
                //生成canvas
                var canvas = document.createElement('canvas');
                var context = canvas.getContext("2d");
 
                canvas.width = img.width;
                canvas.height = img.height;
 
                context.drawImage(img, 0, 0);
 
                var canvasData = canvas.toDataURL("image/png");
                var img2 = document.createElement('img');
                //把第二个img的src设为dataurl
                img2.setAttribute('src', canvasData);

                img2.onload = function () {
                    var a = document.createElement("a");
                    a.download = filename + ".png";
                    a.href = img2.getAttribute('src');
                    a.click();
                };
            };
 
        }
    }
}(this));

var svg = document.querySelector('svg');
var svgToPng = new svgToPng(svg);
svgToPng.change('zhang');//zhang是文件名字

```
把svg的东西弄成dataurl放到canvas里去，在用canvas的toDataURL()转成图片
(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{504:function(a,s,n){"use strict";n.r(s);var e=n(4),t=Object(e.a)({},(function(){var a=this,s=a.$createElement,n=a._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[n("h1",{attrs:{id:"利用canvas对上传的图片进行压缩"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#利用canvas对上传的图片进行压缩"}},[a._v("#")]),a._v(" 利用canvas对上传的图片进行压缩")]),a._v(" "),n("p",[a._v("(其实没软用)")]),a._v(" "),n("p",[a._v("利用canvas的todataurl接口对图片进行压缩")]),a._v(" "),n("p",[a._v("html内容中")]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v('<img src="" id="img"/> \n<input type="file" id="picFile" accept="image/*" capture="camera" onchange="readFile(this)"/> \naccept="image/*" 调用相机或者相册 加上capture="camera"后为直接调用相册,在移动端中有效\n')])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br")])]),n("p",[a._v("js中")]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v("  function readFile(obj){ \n   var file = obj.files[0];\n   //判断类型是不是图片 \n    if(!/image\\/\\w+/.test(file.type)){ \n      alert(\"请确保文件为图像类型\"); \n      return false; \n    } \n\n    var reader = new FileReader(); \n    reader.readAsDataURL(file); \n    reader.onload = function(e){\n     dealImage(this.result,'image/png',{width:500},function(base){\n     　　　　document.getElementById('img').setAttribute('src',base)\n     });\n    } \n  }\n\n\n\n  function dealImage(path,typename, obj, callback){\n     var img = new Image();\n     img.src = path;\n     img.onload = function(){\n         var that = this;\n         // 默认按比例压缩\n         var w = that.width,\n         h = that.height,\n         scale = w / h;\n         w = obj.width || w;\n         h = obj.height || (w / scale);\n         var quality = 0.7; // 默认图片质量为0.7\n         //生成canvas\n         var canvas = document.createElement('canvas');\n         var ctx = canvas.getContext('2d');\n         // 创建属性节点\n         var anw = document.createAttribute(\"width\");\n         anw.nodeValue = w;\n         var anh = document.createAttribute(\"height\");\n         anh.nodeValue = h;\n         canvas.setAttributeNode(anw);\n         canvas.setAttributeNode(anh);\n         ctx.drawImage(that, 0, 0, w, h);\n         // 图像质量\n         if(obj.quality && obj.quality <= 1 && obj.quality > 0){\n         quality = obj.quality;\n         }\n         // quality值越小，所绘制出的图像越模糊typename\n         var base64 = canvas.toDataURL(typename, quality );\n         // 回调函数返回base64的值\n         callback(base64);\n     }\n  }\n\n")])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br"),n("span",{staticClass:"line-number"},[a._v("7")]),n("br"),n("span",{staticClass:"line-number"},[a._v("8")]),n("br"),n("span",{staticClass:"line-number"},[a._v("9")]),n("br"),n("span",{staticClass:"line-number"},[a._v("10")]),n("br"),n("span",{staticClass:"line-number"},[a._v("11")]),n("br"),n("span",{staticClass:"line-number"},[a._v("12")]),n("br"),n("span",{staticClass:"line-number"},[a._v("13")]),n("br"),n("span",{staticClass:"line-number"},[a._v("14")]),n("br"),n("span",{staticClass:"line-number"},[a._v("15")]),n("br"),n("span",{staticClass:"line-number"},[a._v("16")]),n("br"),n("span",{staticClass:"line-number"},[a._v("17")]),n("br"),n("span",{staticClass:"line-number"},[a._v("18")]),n("br"),n("span",{staticClass:"line-number"},[a._v("19")]),n("br"),n("span",{staticClass:"line-number"},[a._v("20")]),n("br"),n("span",{staticClass:"line-number"},[a._v("21")]),n("br"),n("span",{staticClass:"line-number"},[a._v("22")]),n("br"),n("span",{staticClass:"line-number"},[a._v("23")]),n("br"),n("span",{staticClass:"line-number"},[a._v("24")]),n("br"),n("span",{staticClass:"line-number"},[a._v("25")]),n("br"),n("span",{staticClass:"line-number"},[a._v("26")]),n("br"),n("span",{staticClass:"line-number"},[a._v("27")]),n("br"),n("span",{staticClass:"line-number"},[a._v("28")]),n("br"),n("span",{staticClass:"line-number"},[a._v("29")]),n("br"),n("span",{staticClass:"line-number"},[a._v("30")]),n("br"),n("span",{staticClass:"line-number"},[a._v("31")]),n("br"),n("span",{staticClass:"line-number"},[a._v("32")]),n("br"),n("span",{staticClass:"line-number"},[a._v("33")]),n("br"),n("span",{staticClass:"line-number"},[a._v("34")]),n("br"),n("span",{staticClass:"line-number"},[a._v("35")]),n("br"),n("span",{staticClass:"line-number"},[a._v("36")]),n("br"),n("span",{staticClass:"line-number"},[a._v("37")]),n("br"),n("span",{staticClass:"line-number"},[a._v("38")]),n("br"),n("span",{staticClass:"line-number"},[a._v("39")]),n("br"),n("span",{staticClass:"line-number"},[a._v("40")]),n("br"),n("span",{staticClass:"line-number"},[a._v("41")]),n("br"),n("span",{staticClass:"line-number"},[a._v("42")]),n("br"),n("span",{staticClass:"line-number"},[a._v("43")]),n("br"),n("span",{staticClass:"line-number"},[a._v("44")]),n("br"),n("span",{staticClass:"line-number"},[a._v("45")]),n("br"),n("span",{staticClass:"line-number"},[a._v("46")]),n("br"),n("span",{staticClass:"line-number"},[a._v("47")]),n("br"),n("span",{staticClass:"line-number"},[a._v("48")]),n("br"),n("span",{staticClass:"line-number"},[a._v("49")]),n("br"),n("span",{staticClass:"line-number"},[a._v("50")]),n("br"),n("span",{staticClass:"line-number"},[a._v("51")]),n("br"),n("span",{staticClass:"line-number"},[a._v("52")]),n("br"),n("span",{staticClass:"line-number"},[a._v("53")]),n("br")])]),n("p",[a._v("如果需要上传")]),a._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[a._v('//上传文件\nfunction upload(){ \n      //base64 转 blob \n      var $Blob= getBlobBydataURI(document.getElementsByTagName("img")[0].currentSrc); \n      var formData = new FormData(); \n      formData.append("files", $Blob ,"file_"+Date.parse(new Date())+".png"); \n      //组建XMLHttpRequest 上传文件 \n      var request = new XMLHttpRequest(); \n      //上传连接地址 \n      request.open("POST", "上传图片的地址"); \n      request.onreadystatechange=function(){\n\n        if (request.readyState==4) \n        { \n          if(request.status==200){ \n            console.log("上传成功"); \n          }else{ \n            console.log("上传失败,检查上传地址是否正确"); \n          } \n        }\n      } \n      \n      request.send(formData); \n    } \n')])]),a._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[a._v("1")]),n("br"),n("span",{staticClass:"line-number"},[a._v("2")]),n("br"),n("span",{staticClass:"line-number"},[a._v("3")]),n("br"),n("span",{staticClass:"line-number"},[a._v("4")]),n("br"),n("span",{staticClass:"line-number"},[a._v("5")]),n("br"),n("span",{staticClass:"line-number"},[a._v("6")]),n("br"),n("span",{staticClass:"line-number"},[a._v("7")]),n("br"),n("span",{staticClass:"line-number"},[a._v("8")]),n("br"),n("span",{staticClass:"line-number"},[a._v("9")]),n("br"),n("span",{staticClass:"line-number"},[a._v("10")]),n("br"),n("span",{staticClass:"line-number"},[a._v("11")]),n("br"),n("span",{staticClass:"line-number"},[a._v("12")]),n("br"),n("span",{staticClass:"line-number"},[a._v("13")]),n("br"),n("span",{staticClass:"line-number"},[a._v("14")]),n("br"),n("span",{staticClass:"line-number"},[a._v("15")]),n("br"),n("span",{staticClass:"line-number"},[a._v("16")]),n("br"),n("span",{staticClass:"line-number"},[a._v("17")]),n("br"),n("span",{staticClass:"line-number"},[a._v("18")]),n("br"),n("span",{staticClass:"line-number"},[a._v("19")]),n("br"),n("span",{staticClass:"line-number"},[a._v("20")]),n("br"),n("span",{staticClass:"line-number"},[a._v("21")]),n("br"),n("span",{staticClass:"line-number"},[a._v("22")]),n("br"),n("span",{staticClass:"line-number"},[a._v("23")]),n("br"),n("span",{staticClass:"line-number"},[a._v("24")]),n("br")])])])}),[],!1,null,null,null);s.default=t.exports}}]);
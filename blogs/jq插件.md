---
title: jq插件
date: 2019-06-26 16:01:00
categories: tips
tags:
  - js
  - jq
  - plugins

---


# 写插件时候可以用到的一些方法

<!--more-->

```
    var createClass = function() {
        function defineProperties(target, props) {
            for(var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        };
        return function(Constructor, protoProps) {
            if(protoProps) defineProperties(Constructor.prototype, protoProps);
            return Constructor;
        };
    }();



    var Datepicker = function() {
        function Datepicker(options) {
            this.options = $.extend(true, {}, DEFAULT, options);
            this.init();
        };

        createClass(Datepicker, [{
            key:"init",
            value:function init(){
                var self = this;
                var opt = self.options;
                //code here
            }
        },{
            key:"a",
            value:function a(){
                //code here
            }
        },{
            key:"b",
            value:function b(){
                //code here
            }
        }])
    }





```
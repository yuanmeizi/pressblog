---
title: function prototype的继承
date: 2018-06-18 9:30:00
categories: function-prototype
tags:
  - function
  - prototype

---


创建一个俗称父类的构造函数Beverage

在父类构造函数的原型上增加方法

创建一个子类构造函数

子类构造函数继承(重写)父类构造函数的方法

实例化一个子类对象

这里有两个例子
<!--more-->
例子1：

```
      // 创建一个俗称父类的构造函数Beverage
      var Beverage = function() {}
      // 在构造函数的原型上增加方法
      Beverage.prototype.boilWater = function() {
        console.log("把水煮沸");
      };
      Beverage.prototype.brew = function() {
        throw new Error("子类必须重写该方法");
      };
      Beverage.prototype.pourInCup = function() {
        throw new Error("子类必须重写该方法");
      };
      Beverage.prototype.addCondiments = function() {
        throw new Error("子类必须重写该方法");
      };
      Beverage.prototype.customerWantsCondiments = function() {
        return true;
      };
      Beverage.prototype.init = function() {
        this.boilWater();
        this.brew();
        this.pourInCup();
        if(this.customerWantsCondiments()) {
          this.addCondiments();
        }
      }
      // 创建一个Coffee构造函数
      var Coffee = function() {};
      // 使该构造函数继承Beverage这个父类
      Coffee.prototype = new Beverage();
      // 重写父类的方法
      Coffee.prototype.brew = function() {
        console.log("用沸水冲泡咖啡");
      };
      Coffee.prototype.pourInCup = function() {
        console.log("把咖啡倒进杯子");
      };
      Coffee.prototype.addCondiments = function() {
        console.log("加糖和牛奶");
      };
      // 实例化一个coffee对象，调用对象上的init()方法
      var coffee = new Coffee();
      coffee.init();
```

例子2：
```
        //定义继承prototype的函数
        var extend = function(sonClass, dadClass) {
          var F = function() {};
          F.prototype = dadClass.prototype;
          sonClass.prototype = new F();
          sonClass.prototype.constructor = sonClass;//使子类的构造函数对象重新指向自己
        };

        //这是父类
        var baba = function(el, options) {
          this.xxx = xxx;//各种this.某某某 = 某某某
        };
         //定义父类的方法
        baba.prototype.init = function() {};
        baba.prototype.lighton = function(){
        	throw new Error('子类必须重写此方法');
        }
        //可以多加几个方法
        baba.prototype.xxx = function(){xxx};

        //这是子类
        var son = function(el, options) {
          
          baba.call(this, el, options);// call的作用是让this强制绑定son对象
          this.xxx = xxx;//可以再添加son自己的this.xxx=xxx;
        };
        extend(son, baba);
        son.prototype.lighton = function() {
        	xxxxxxxxxxxx
        };//添加或重写父类的方法,此例中的lighton方法就必须重写
```
ps:例子来源于网络，侵删
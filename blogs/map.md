---
title: 百度地图api显示公司地址
date: 2019-07-17 14:30:00
categories: tips
tags:
  - svg
  - png


---

# 百度地图api显示公司地址

(其实没软用)

<!--more-->


## 百度地图api显示公司地址
```
    <div id="ditu"></div>


    <script type="text/javascript">
        
    
    function initMap(){
        createMap();
        setMapEvent();
        addMapControl();
        addMarker();
    }
    
    
    function createMap(){
        var map = new BMap.Map("ditu");//获取dom元素
        var point = new BMap.Point(121.384078,28.414901);//公司的坐标
        map.centerAndZoom(point,18);
        window.map = map;
    }
    
    
    function setMapEvent(){
        map.enableDragging();//拖拽
        map.enableScrollWheelZoom();//鼠标滚轮缩放
        map.enableDoubleClickZoom();//双击缩放
        map.enableKeyboard();//键盘
    }
    
    
    function addMapControl(){
        
    var ctrl_nav = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(ctrl_nav);
        
    var ctrl_ove = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:1});
    map.addControl(ctrl_ove);
        
    var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    map.addControl(ctrl_sca);
    }
    
    
    var markerArr = [{title:"豪成服务业大厦",content:"豪成服务业大厦22楼2202",point:"121.384078|28.414901",isOpen:0,icon:{w:21,h:21,l:0,t:0,x:6,lb:5}}
         ];
    
    function addMarker(){
        for(var i=0;i<markerArr.length;i++){
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0,p1);
            var iconImg = createIcon(json.icon);//创建图标
            var marker = new BMap.Marker(point,{icon:iconImg});//创建一个点
            var iw = createInfoWindow(i);//创建点击时候弹出的信息框
            var label = new BMap.Label(json.title,{"offset":new BMap.Size(json.icon.lb-json.icon.x+10,-20)});//创建标签
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({//设置标签的样式
                        borderColor:"#808080",
                        color:"#333",
                        cursor:"pointer"
            });
            
            (function(){
                var index = i;
                var _iw = createInfoWindow(i);//返回信息框赋值给_iw
                var _marker = marker;
                _marker.addEventListener("click",function(){
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open",function(){
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close",function(){
                    _marker.getLabel().show();
                })
                label.addEventListener("click",function(){
                    _marker.openInfoWindow(_iw);
                })
                if(!!json.isOpen){
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }
    
    // 创建点击时候的信息框
    function createInfoWindow(i){
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>"+json.content+"</div>");
        return iw;
    }

    // 创建图标
    function createIcon(json){
        var icon = new BMap.Icon("https://i.loli.net/2019/07/17/5d2e8e2eabf0495707.png", new BMap.Size(json.w,json.h),{imageOffset: new BMap.Size(-json.l,-json.t),infoWindowOffset:new BMap.Size(json.lb+5,1),offset:new BMap.Size(json.x,json.h)})
        return icon;
    }
    
    initMap();

    </script>
```

/*
jQWidgets v2.4.2 (2012-Sep-12)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){
    a.jqx.jqxWidget("jqxColorPicker","",{});
    a.extend(a.jqx._jqxColorPicker.prototype,{
        defineInstance:function(){
            this.disabled=false;
            this.height=null;
            this.width=null;
            this.color=new a.jqx.color({
                hex:"ff0000"
            });
            this.redString="R:";
            this.greenString="G:";
            this.blueString="B:";
            this.showTransparent=false;
            this.colorMode="saturation";
            this.events=["colorchange",]
        },
        createInstance:function(c){
            var b=this;
            this._setSize();
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-reset"));
            this.host.addClass(this.toThemeProperty("jqx-color-picker"));
            this.container=a("<div style='width: 100%; height: 100%; position: relative;'></div>");
            this.container.appendTo(this.host);
            this.colorMap=a("<div style='left: 0; top: 0; position: absolute;'></div>");
            this.colorMap.appendTo(this.container);
            this.colorBar=a("<div style='left: 0; top: 0; position: absolute;'></div>");
            this.colorBar.appendTo(this.container);
            this.colorPanel=a("<div style='left: 0; top: 0; position: absolute;'></div>");
            this.colorPanel.appendTo(this.container);
            this.hexPanel=a("<div style='float: left;'></div>");
            this.hexPanel.appendTo(this.colorPanel);
            this.hexPanel.append("<span>#</span>");
            this.hex=a("<input maxlength='6' style='height: 16px;'/>");
            this.hex.addClass(this.toThemeProperty("jqx-input"));
            this.hex.appendTo(this.hexPanel);
            this.rgb=a("<div style='float: left; margin-top: 2px;'></div>");
            this.rgb.appendTo(this.colorPanel);
            this.red=a("<input style='width: 25px; height: 16px;' maxlength='3'/>");
            this.red.addClass(this.toThemeProperty("jqx-input"));
            this.rgb.append("<span>"+this.redString+"</span>");
            this.red.appendTo(this.rgb);
            this.green=a("<input style='margin-right: 2px; height: 16px; width: 25px;' maxlength='3'/>");
            this.green.addClass(this.toThemeProperty("jqx-input"));
            this.rgb.append("<span>"+this.greenString+"</span>");
            this.green.appendTo(this.rgb);
            this.colorPanel.addClass(this.toThemeProperty("jqx-color-picker-map-overlay"));
            this._mapImageOverlayURL=this._getImageUrl(this.colorPanel);
            this.colorPanel.removeClass(this.toThemeProperty("jqx-color-picker-map-overlay"));
            this.blue=a("<input style='height: 16px; width: 25px;' maxlength='3'/>");
            this.blue.addClass(this.toThemeProperty("jqx-input"));
            this.rgb.append("<span>"+this.blueString+"</span>");
            this.blue.appendTo(this.rgb);
            this.preview=a("<div style='background: red; position: absolute;'></div>");
            this.preview.addClass(this.toThemeProperty("jqx-widget-content"));
            this.preview.appendTo(this.colorPanel);
            this.colorBarPointer=a("<div style='top: 0; left: 0; position: absolute; width: 100%;'></div>");
            this.colorBarPointer.addClass(this.toThemeProperty("jqx-color-picker-bar-pointer"));
            this.colorMapPointer=a("<div style='top: 0; left: 0; position: absolute; width: 100%;'></div>");
            this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"));
            this.transparent=a("<div style='clear: both;'><a style='text-align: center;' href='#'>transparent</a></div>");
            if(this.disabled){
                this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
                this.element.disabled=true
            }
            this._addHandlers()
        },
        _setPositionFromValue:function(){
            var d=this;
            var c=d.color.h;
            var i=100-d.color.v;
            var b=d.colorMap.height();
            var e=d.colorMap.width();
            var h=c*e/360;
            var g=i*b/100;
            if(this.colorMode=="saturation"){
                var f=100-d.color.s;
                f=f*b/100;
                d._saturation=100-d.color.s;
                d.colorMapPointer.css("margin-left",h-8);
                d.colorMapPointer.css("margin-top",g-8);
                d.colorBarPointer.css("margin-top",f-8);
                d.colorMapImageOverlay.css("opacity",(100-d.color.s)/100)
            }else{
                var c=d.color.s;
                var h=c*e/100;
                var g=i*b/100;
                var f=360-d.color.h;
                f=f*b/360;
                d._hue=d.color.h;
                d.colorMapPointer.css("margin-left",h-8);
                d.colorMapPointer.css("margin-top",g-8);
                d.colorBarPointer.css("margin-top",f-8)
            }
        },
        updateRGB:function(){
            var b=this;
            b.color.setRgb(b.red.val(),b.green.val(),b.blue.val());
            b._updateUI();
            b._raiseEvent("0",{
                color:b.color
            });
            b.color.transparent=false
        },
        _setPosition:function(f,c,h){
            var e=parseInt(f.pageX);
            var g=parseInt(c.offset().left);
            var b=parseInt(f.pageY);
            var d=parseInt(c.offset().top);
            if(h[0].className.indexOf("jqx-color-picker-bar")==-1){
                h.css("margin-left",e-8-g)
            }
            if(b>=d&&b<=d+c.height()){
                h.css("margin-top",b-8-d)
            }
        },
        _handleKeyInput:function(c,d,b){
            if(c.disabled){
                return
            }
            if(!c._validateKey(d)){
                return d
            }
            b.val(c._setValueInRange(b.val(),0,255));
            this.updateRGB();
            this._setPositionFromValue()
        },
        _addHandlers:function(){
            var b=this;
            this.addHandler(this.colorMapPointer,"dragStart",function(e){
                e.preventDefault();
                return false
            });
            this.addHandler(this.colorBarPointer,"dragStart",function(e){
                e.preventDefault();
                return false
            });
            this.addHandler(this.transparent,"click",function(e){
                b._raiseEvent("0",{
                    color:"transparent"
                });
                e.preventDefault();
                b.color.transparent=true
            });
            this.addHandler(this.host,"selectionstart",function(e){
                e.preventDefault();
                return false
            });
            this.addHandler(this.blue,"keyup blur",function(e){
                b._handleKeyInput(b,e,b.blue)
            });
            this.addHandler(this.green,"keyup blur",function(e){
                b._handleKeyInput(b,e,b.green)
            });
            this.addHandler(this.red,"keyup blur",function(e){
                b._handleKeyInput(b,e,b.red)
            });
            this.addHandler(this.hex,"keyup blur",function(e){
                if(b.disabled){
                    return
                }
                if(!b._validateKey(e)){
                    return e
                }
                if(b.hex.val().toString().length==6){
                    b.hex.val(b.color.validateHex(b.hex.val()));
                    b.color.setHex(b.hex.val());
                    b._updateUI();
                    b._setPositionFromValue();
                    b._raiseEvent("0",{
                        color:b.color
                    })
                }
            });
            this.addHandler(this.colorMap,"dragstart",function(e){
                e.preventDefault();
                return false
            });
            var d=function(f){
                b._setPosition(f,b.colorMap,b.colorMapPointer);
                if(b.colorMode=="saturation"){
                    var e=b._valuesFromMouse(f,b.colorMap,360,100);
                    if(e.x>360){
                        e.x=360
                    }
                    b.color.setHsv(e.x,b._saturation!=null?100-b._saturation:100,100-e.y)
                }else{
                    var e=b._valuesFromMouse(f,b.colorMap,100,100);
                    if(e.x>100){
                        e.x=100
                    }
                    b.color.setHsv(b._hue!=null?b._hue:360,e.x,100-e.y)
                }
                b._updateUI();
                b._raiseEvent("0",{
                    color:b.color
                });
                b.color.transparent=false
            };
        
            this.addHandler(this.colorMap,"mousedown",function(e){
                if(b.disabled){
                    return
                }
                b.beginDrag=true;
                d(e)
            });
            this.addHandler(a(document),"mousemove.picker"+this.element.id,function(e){
                if(b.disabled){
                    return
                }
                if(b.beginDrag==true){
                    d(e)
                }
            });
            this.addHandler(this.colorBar,"dragstart",function(e){
                e.preventDefault();
                return false
            });
            var c=function(f){
                b._setPosition(f,b.colorBar,b.colorBarPointer);
                if(b.colorMode=="saturation"){
                    var e=b._valuesFromMouse(f,b.colorBar,100,100);
                    b.color.s=e.y;
                    b._saturation=e.y;
                    b.colorMapImageOverlay.css("opacity",(b.color.s)/100);
                    b.color.setHsv(b.color.h,100-b.color.s,b.color.v)
                }else{
                    var e=b._valuesFromMouse(f,b.colorBar,100,360);
                    b.color.h=360-e.y;
                    b._hue=b.color.h;
                    b.color.setHsv(b.color.h,b.color.s,b.color.v)
                }
                b._updateUI();
                b._raiseEvent("0",{
                    color:b.color
                });
                b.color.transparent=false
            };
    
            this.addHandler(this.colorBar,"mousedown",function(e){
                if(b.disabled){
                    return
                }
                b.beginDragBar=true;
                c(e)
            });
            this.addHandler(a(document),"mousemove.colorbar"+this.element.id,function(e){
                if(b.disabled){
                    return
                }
                if(b.beginDragBar==true){
                    c(e)
                }
            });
            this.addHandler(a(document),"mouseup.colorMap"+this.element.id,function(e){
                if(b.disabled){
                    return
                }
                b.beginDrag=false;
                b.beginDragBar=false
            })
        },
        _removeHandlers:function(){
            this.removeHandler(this.colorMapPointer);
            this.removeHandler(this.colorBarPointer);
            this.removeHandler(this.transparent,"click");
            this.removeHandler(this.host,"selectionstart");
            this.removeHandler(this.blue,"keyup blur");
            this.removeHandler(this.green,"keyup blur");
            this.removeHandler(this.red,"keyup blur");
            this.removeHandler(this.hex,"keyup blur");
            this.removeHandler(this.colorMap,"dragstart");
            this.removeHandler(this.colorMap,"mousedown");
            this.removeHandler(a(document),"mousemove.colorbar"+this.element.id);
            this.removeHandler(a(document),"mousemove.colormap"+this.element.id);
            this.removeHandler(this.colorBar,"dragstart");
            this.removeHandler(this.colorBar,"mousedown");
            this.removeHandler(this.colorBar,"mousemove");
            this.removeHandler(a(document),"mouseup.colorMap"+this.element.id)
        },
        _raiseEvent:function(g,c){
            if(c==undefined){
                c={
                    owner:null
                }
            }
            var d=this.events[g];
            var e=c?c:{};

            e.owner=this;
            var f=new jQuery.Event(d);
            f.owner=this;
            f.args=e;
            var b=this.host.trigger(f);
            return b
        },
        setColor:function(b){
            if(b=="transparent"){
                this.color.transparent=true;
                this.color.hex="000";
                this.color.r=0;
                this.color.g=0;
                this.color.b=0
            }else{
                if(b.r){
                    this.color=new a.jqx.color({
                        rgb:b
                    })
                }else{
                    if(b.substring(0,1)=="#"){
                        this.color=new a.jqx.color({
                            hex:b.substring(1)
                        })
                    }else{
                        this.color=new a.jqx.color({
                            hex:b
                        })
                    }
                }
            }
            this._updateUI();
            this._setPositionFromValue();
            this._raiseEvent("0",{
                color:b
            })
        },
        getColor:function(){
            return this.color
        },
        propertyChangedHandler:function(b,c,e,d){
            if(b.isInitialized==undefined||b.isInitialized==false){
                return
            }
            if(c=="colorMode"){
                b.refresh()
            }
            if(c=="color"){
                b._updateUI();
                b._setPositionFromValue();
                b._raiseEvent("0",{
                    color:d
                })
            }
            if(c=="width"||c=="height"){
                b._setSize();
                b.refresh()
            }
            if(c=="showTransparent"){
                b.refresh()
            }
            if(c=="disabled"){
                this.element.disabled=d;
                if(d){
                    b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled"))
                }else{
                    b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled"))
                }
            }
        },
        _valuesFromMouse:function(j,g,c,b){
            var k=0;
            var i=0;
            var f=g.offset();
            var m=g.height();
            var d=g.width();
            if(j.pageX<f.left){
                k=0
            }else{
                if(j.pageX>f.left+d){
                    k=d
                }else{
                    k=j.pageX-f.left+1
                }
            }
            if(j.pageY<f.top){
                i=0
            }else{
                if(j.pageY>f.top+m){
                    i=m
                }else{
                    i=j.pageY-f.top+1
                }
            }
            var h=parseInt(k/d*c);
            var l=parseInt(i/m*b);
            return{
                x:h,
                y:l
            }
        },
        _validateKey:function(b){
            if(b.keyCode==9||b.keyCode==16||b.keyCode==38||b.keyCode==29||b.keyCode==40||b.keyCode==17||b.keyCode==37||(b.ctrlKey&&(b.keyCode=="c".charCodeAt()||b.keyCode=="v".charCodeAt()))||(b.ctrlKey&&(b.keyCode=="C".charCodeAt()||b.keyCode=="V".charCodeAt()))){
                return false
            }
            if(b.ctrlKey||b.shiftKey){
                return false
            }
            return true
        },
        _setValueInRange:function(d,c,b){
            if(d==""||isNaN(d)){
                return c
            }
            d=parseInt(d);
            if(d>b){
                return b
            }
            if(d<c){
                return c
            }
            return d
        },
        destroy:function(){
            this.host.removeClass();
            this._removeHandlers();
            this.host.remove()
        },
        setPointerStyle:function(c){
            this.colorMapPointer.removeClass();
            if(c=="transparent"||c.hex==""){
                this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"))
            }
            var b=105;
            var d=(c.r*0.299)+(c.g*0.587)+(c.b*0.114);
            var e=(255-d<b)?"Black":"White";
            if(e=="Black"){
                this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"))
            }else{
                this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer-alt"))
            }
        },
        _updateUI:function(){
            var c=this;
            c.red.val(c.color.r);
            c.green.val(c.color.g);
            c.blue.val(c.color.b);
            c.hex.val(c.color.hex);
            var b=new a.jqx.color({
                hex:"fff"
            });
            if(this.colorMode=="saturation"){
                b.setHsv(this.color.h,100,this.color.v);
                c.colorBar.css("background","#"+b.hex)
            }else{
                b.setHsv(this.color.h,100,100);
                c.colorMap.css("background-color","#"+b.hex)
            }
            c.preview.css("background","#"+this.color.hex);
            c.setPointerStyle(this.color)
        },
        _setSize:function(){
            if(this.width!=null&&this.width.toString().indexOf("px")!=-1){
                this.host.width(this.width)
            }else{
                if(this.width!=undefined&&!isNaN(this.width)){
                    this.host.width(this.width)
                }
            }
            if(this.height!=null&&this.height.toString().indexOf("px")!=-1){
                this.host.height(this.height)
            }else{
                if(this.height!=undefined&&!isNaN(this.height)){
                    this.host.height(this.height)
                }
            }
            if(this.host.width()<130){
                this.host.width(150)
            }
            if(this.host.height()<70){
                this.host.height(70)
            }
        },
        _arrange:function(){
            var b=this.host.height()-42;
            if(this.showTransparent){
                b=this.host.height()-62
            }
            if(b<=0){
                return
            }
            this.colorMap.width(85*this.host.width()/100);
            this.colorMap.height(b);
            this.colorBar.height(b);
            this.colorBar.css("left",this.colorMap.width()+4);
            this.colorBar.width(8*this.host.width()/100);
            this.colorBarPointer.width(this.colorBar.width());
            this.colorPanel.width(this.host.width());
            this.colorPanel.height(40);
            if(this.showTransparent){
                this.colorPanel.height(60)
            }
            this.colorPanel.css("top",b+4);
            this.hex.width(this.colorMap.width()-this.colorBar.width()-4);
            this.hex.css("margin-left","4px");
            this.preview.width(this.colorBar.width()+9);
            this.preview.height(25);
            this.preview.addClass(this.toThemeProperty("jqx-rc-all"));
            this.preview.addClass(this.toThemeProperty("jqx-color-picker-preview"));
            this.preview.css("left",this.colorMap.width()-4);
            this.preview.css("top","5px");
            var e=4+parseInt(this.hex.position().left)+this.hex.outerWidth();
            var d=function(f){
                var g=parseInt(f.blue.position().left)+f.blue.outerWidth();
                return g
            };
        
            var c=d(this);
            while(c<e){
                this.blue.width(this.blue.width()+1);
                c=d(this);
                if(c<e){
                    this.green.width(this.green.width()+1)
                }
                c=d(this);
                if(c<e){
                    this.red.width(this.red.width()+1)
                }
                c=d(this)
            }
        },
        _getColorPointer:function(){
            var b=a("<div></div>");
            b.addClass(this.toThemeProperty("jqx-color-picker-pointer"));
            return b
        },
        _getImageUrl:function(c){
            var b=c.css("backgroundImage");
            b=b.replace('url("',"");
            b=b.replace('")',"");
            b=b.replace("url(","");
            b=b.replace(")","");
            return b
        },
        refresh:function(){
            this._saturation=null;
            this._hue=null;
            this.colorMap.removeClass();
            this.colorBar.removeClass();
            this.colorMap.addClass(this.toThemeProperty("jqx-disableselect"));
            this.colorBar.addClass(this.toThemeProperty("jqx-disableselect"));
            this.colorPanel.addClass(this.toThemeProperty("jqx-color-picker-panel"));
            this.colorBar.css("background-image","");
            this.colorMap.css("background-image","");
            if(this.colorMode=="saturation"){
                this.colorMap.addClass(this.toThemeProperty("jqx-color-picker-map"));
                this.colorBar.addClass(this.toThemeProperty("jqx-color-picker-bar"))
            }else{
                this.colorMap.addClass(this.toThemeProperty("jqx-color-picker-map-hue"));
                this.colorBar.addClass(this.toThemeProperty("jqx-color-picker-bar-hue"))
            }
            this._barImageURL=this._getImageUrl(this.colorBar);
            this._mapImageURL=this._getImageUrl(this.colorMap);
            this._arrange();
            this.colorBar.children().remove();
            this.colorBarImageContainer=a("<div style='overflow: hidden;'></div>");
            this.colorBarImageContainer.width(this.colorBar.width());
            this.colorBarImageContainer.height(this.colorBar.height());
            this.colorBarImageContainer.appendTo(this.colorBar);
            this.colorBarImage=a("<img/>");
            this.colorBarImage.appendTo(this.colorBarImageContainer);
            this.colorBarImage.attr("src",this._barImageURL);
            this.colorBar.css("background-image","none");
            this.colorBarImage.attr("width",this.colorBar.width());
            this.colorBarImage.attr("height",this.colorBar.height());
            this.colorBarPointer.appendTo(this.colorBar);
            this.colorMap.children().remove();
            this.colorMapImage=a("<img/>");
            this.colorMapImage.appendTo(this.colorMap);
            this.colorMapImage.attr("src",this._mapImageURL);
            this.colorMap.css("background-image","none");
            this.colorMapImage.attr("width",this.colorMap.width());
            this.colorMapImage.attr("height",this.colorMap.height());
            this.colorMapImageOverlay=a("<img style='position: absolute; left: 0; top: 0;'/>");
            this.colorMapImageOverlay.prependTo(this.colorMap);
            this.colorMapImageOverlay.attr("src",this._mapImageOverlayURL);
            this.colorMapImageOverlay.attr("width",this.colorMap.width());
            this.colorMapImageOverlay.attr("height",this.colorMap.height());
            this.colorMapImageOverlay.css("opacity",0);
            this.colorMapPointer.appendTo(this.colorMap);
            if(this.showTransparent){
                this.transparent.appendTo(this.colorPanel)
            }
            this._updateUI();
            this._setPositionFromValue()
        }
    });
    a.jqx.color=function(d){
        var b={
            r:0,
            g:0,
            b:0,
            h:0,
            s:0,
            v:0,
            hex:"",
            hexToRgb:function(i){
                i=this.validateHex(i);
                var h="00",f="00",e="00";
                if(i.length==6){
                    h=i.substring(0,2);
                    f=i.substring(2,4);
                    e=i.substring(4,6)
                }else{
                    if(i.length>4){
                        h=i.substring(4,i.length);
                        i=i.substring(0,4)
                    }
                    if(i.length>2){
                        f=i.substring(2,i.length);
                        i=i.substring(0,2)
                    }
                    if(i.length>0){
                        e=i.substring(0,i.length)
                    }
                }
                return{
                    r:this.hexToInt(h),
                    g:this.hexToInt(f),
                    b:this.hexToInt(e)
                }
            },
            validateHex:function(e){
                e=new String(e).toUpperCase();
                e=e.replace(/[^A-F0-9]/g,"0");
                if(e.length>6){
                    e=e.substring(0,6)
                }
                return e
            },
            webSafeDec:function(e){
                e=Math.round(e/51);
                e*=51;
                return e
            },
            hexToWebSafe:function(i){
                var h,f,e;
                if(i.length==3){
                    h=i.substring(0,1);
                    f=i.substring(1,1);
                    e=i.substring(2,1)
                }else{
                    h=i.substring(0,2);
                    f=i.substring(2,4);
                    e=i.substring(4,6)
                }
                return intToHex(this.webSafeDec(this.hexToInt(h)))+this.intToHex(this.webSafeDec(this.hexToInt(f)))+this.intToHex(this.webSafeDec(this.hexToInt(e)))
            },
            rgbToWebSafe:function(e){
                return{
                    r:this.webSafeDec(e.r),
                    g:this.webSafeDec(e.g),
                    b:this.webSafeDec(e.b)
                }
            },
            rgbToHex:function(e){
                return this.intToHex(e.r)+this.intToHex(e.g)+this.intToHex(e.b)
            },
            intToHex:function(f){
                var e=(parseInt(f).toString(16));
                if(e.length==1){
                    e=("0"+e)
                }
                return e.toUpperCase()
            },
            hexToInt:function(e){
                return(parseInt(e,16))
            },
            hslToRgb:function(v){
                var n=parseInt(v.h)/360;
                var w=parseInt(v.s)/100;
                var k=parseInt(v.l)/100;
                if(k<=0.5){
                    var f=k*(1+w)
                }else{
                    var f=k+w-(k*w)
                }
                var i=2*k-f;
                var t=n+(1/3);
                var j=n;
                var m=n-(1/3);
                var e=Math.round(this.hueToRgb(i,f,t)*255);
                var o=Math.round(this.hueToRgb(i,f,j)*255);
                var u=Math.round(this.hueToRgb(i,f,m)*255);
                return{
                    r:e,
                    g:o,
                    b:u
                }
            },
            hueToRgb:function(g,f,e){
                if(e<0){
                    e+=1
                }else{
                    if(e>1){
                        e-=1
                    }
                }
                if((e*6)<1){
                    return g+(f-g)*e*6
                }else{
                    if((e*2)<1){
                        return f
                    }else{
                        if((e*3)<2){
                            return g+(f-g)*((2/3)-e)*6
                        }else{
                            return g
                        }
                    }
                }
            },
            rgbToHsl:function(n){
                var e=n[0],k=n[1],o=n[2];
                e/=255;
                k/=255;
                o/=255;
                var p=math.max(e,k,o),i=math.min(e,k,o),j,q,f=(p+i)/2;
                if(p===i){
                    j=q=0
                }else{
                    var m=p-i;
                    q=f>0.5?m/(2-p-i):m/(p+i);
                    switch(p){
                        case e:
                            j=(k-o)/m+(k<o?6:0);
                            break;
                        case k:
                            j=(o-e)/m+2;
                            break;
                        case o:
                            j=(e-k)/m+4;
                            break
                    }
                    j/=6
                }
                return{
                    h:j,
                    s:q,
                    l:f
                }
            },
            rgbToHsl:function(m){
                var e=parseFloat(m.r)/255;
                var k=parseFloat(m.g)/255;
                var n=parseFloat(m.b)/255;
                var o=Math.max(e,k,n);
                var i=Math.min(e,k,n);
                var p=o-i;
                var q=o+i;
                if(i===o){
                    var j=0
                }else{
                    if(e===o){
                        var j=((60*(k-n)/p)+360)%360
                    }else{
                        if(k===o){
                            var j=(60*(n-e)/p)+120
                        }else{
                            var j=(60*(e-k)/p)+240
                        }
                    }
                }
                var f=0.5*q;
                if(f===0){
                    var t=0
                }else{
                    if(f===1){
                        var t=1
                    }else{
                        if(f<=0.5){
                            var t=p/q
                        }else{
                            var t=p/(2-q)
                        }
                    }
                }
                j=j.round();
                t=(t*100).round();
                f=(f*100).round();
                return{
                    h:j,
                    s:t,
                    l:f
                }
            },
            rgbToHsv:function(h){
                var k=h.r/255;
                var j=h.g/255;
                var f=h.b/255;
                hsv={
                    h:0,
                    s:0,
                    v:0
                };
    
                var i=0;
                var e=0;
                if(k>=j&&k>=f){
                    e=k;
                    i=(j>f)?f:j
                }else{
                    if(j>=f&&j>=k){
                        e=j;
                        i=(k>f)?f:k
                    }else{
                        e=f;
                        i=(j>k)?k:j
                    }
                }
                hsv.v=e;
                hsv.s=(e)?((e-i)/e):0;
                if(!hsv.s){
                    hsv.h=0
                }else{
                    delta=e-i;
                    if(k==e){
                        hsv.h=(j-f)/delta
                    }else{
                        if(j==e){
                            hsv.h=2+(f-k)/delta
                        }else{
                            hsv.h=4+(k-j)/delta
                        }
                    }
                    hsv.h=parseInt(hsv.h*60);
                    if(hsv.h<0){
                        hsv.h+=360
                    }
                }
                hsv.s=parseInt(hsv.s*100);
                hsv.v=parseInt(hsv.v*100);
                return hsv
            },
            hsvToRgb:function(l){
                rgb={
                    r:0,
                    g:0,
                    b:0
                };
    
                var k=l.h;
                var r=l.s;
                var n=l.v;
                if(r==0){
                    if(n==0){
                        rgb.r=rgb.g=rgb.b=0
                    }else{
                        rgb.r=rgb.g=rgb.b=parseInt(n*255/100)
                    }
                }else{
                    if(k==360){
                        k=0
                    }
                    k/=60;
                    r=r/100;
                    n=n/100;
                    var j=parseInt(k);
                    var m=k-j;
                    var g=n*(1-r);
                    var e=n*(1-(r*m));
                    var o=n*(1-(r*(1-m)));
                    switch(j){
                        case 0:
                            rgb.r=n;
                            rgb.g=o;
                            rgb.b=g;
                            break;
                        case 1:
                            rgb.r=e;
                            rgb.g=n;
                            rgb.b=g;
                            break;
                        case 2:
                            rgb.r=g;
                            rgb.g=n;
                            rgb.b=o;
                            break;
                        case 3:
                            rgb.r=g;
                            rgb.g=e;
                            rgb.b=n;
                            break;
                        case 4:
                            rgb.r=o;
                            rgb.g=g;
                            rgb.b=n;
                            break;
                        case 5:
                            rgb.r=n;
                            rgb.g=g;
                            rgb.b=e;
                            break
                    }
                    rgb.r=parseInt(rgb.r*255);
                    rgb.g=parseInt(rgb.g*255);
                    rgb.b=parseInt(rgb.b*255)
                }
                return rgb
            },
            setRgb:function(h,f,e){
                var j=function(g){
                    if(g<0||g>255){
                        return 0
                    }
                    if(isNaN(parseInt(g))){
                        return 0
                    }
                    return g
                };
        
                this.r=j(h);
                this.g=j(f);
                this.b=j(e);
                var i=this.rgbToHsv(this);
                this.h=i.h;
                this.s=i.s;
                this.v=i.v;
                this.hex=this.rgbToHex(this)
            },
            setHsl:function(g,f,e){
                this.h=g;
                this.s=f;
                this.l=e;
                var i=this.hslToRgb(this);
                this.r=i.r;
                this.g=i.g;
                this.b=i.b;
                this.hex=this.rgbToHex(i)
            },
            setHsv:function(g,f,e){
                this.h=g;
                this.s=f;
                this.v=e;
                var i=this.hsvToRgb(this);
                this.r=i.r;
                this.g=i.g;
                this.b=i.b;
                this.hex=this.rgbToHex(i)
            },
            setHex:function(e){
                this.hex=e;
                var g=this.hexToRgb(this.hex);
                this.r=g.r;
                this.g=g.g;
                this.b=g.b;
                var f=this.rgbToHsv(g);
                this.h=f.h;
                this.s=f.s;
                this.v=f.v
            }
        };

        if(d){
            if(d.hex){
                var c=b.validateHex(d.hex);
                b.setHex(c)
            }else{
                if(d.r){
                    b.setRgb(d.r,d.g,d.b)
                }else{
                    if(d.h){
                        b.setHsv(d.h,d.s,d.v)
                    }
                }
            }
        }
        return b
    }
})(jQuery);
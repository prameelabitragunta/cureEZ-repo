/*
jQWidgets v2.4.2 (2012-Sep-12)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){
    a.jqx.jqxWidget("jqxPopup","",{});
    a.extend(a.jqx._jqxPopup.prototype,{
        defineInstance:function(){
            this.content="jqxPopup";
            this.horizontalOffset=0;
            this.verticalOffset=0;
            this.enableAnimation=true;
            this.showDelay=250,this.hideDelay=300,this.showHtml=false;
            this.isContainer=false;
            this.isOpen=false;
            this.disabled=false;
            this.events=["shown","closed"]
        },
        createInstance:function(b){
            this.host.addClass("jqx-popup jqx-rc-all");
            if(this.width!=undefined&&!isNaN(this.width)){
                this.host.width(this.width)
            }
            if(this.height!=undefined&&!isNaN(this.height)){
                this.host.height(this.height)
            }
        },
        destroy:function(){
            this.host.removeClass("jqx-popup jqx-rc-all")
        },
        _raiseEvent:function(f,c){
            if(c==undefined){
                c={
                    owner:null
                }
            }
            var d=this.events[f];
            args=c;
            args.owner=this;
            if(f==0){
                this.isOpen=true
            }
            if(f==1){
                this.isOpen=false
            }
            var e=new jQuery.Event(d);
            e.owner=this;
            var b=this.host.trigger(e);
            return b
        },
        close:function(){
            var b=a.data(this.element,"popup");
            if(b==undefined){
                b=a.data(this,"popup")
            }
            if(b!=null){
                if(a.browser.msie){
                    b.remove()
                }else{
                    if(this.enableAnimation){
                        b.stop().fadeOut(this.hideDelay,function(){
                            a(this).remove()
                        })
                    }else{
                        b.remove()
                    }
                }
                this._raiseEvent(1);
                a.data(this.element,"popup",null)
            }
        },
        open:function(){
            var c=Array.prototype.slice.call(arguments,0);
            var d=this.content;
            if(c.length>0){
                d=c[0]
            }
            var f=this.verticalOffset;
            var e=this.horizontalOffset;
            if(c.length>1){
                f=c[1]
            }
            if(c.length>2){
                e=c[2]
            }
            var g={
                element:this.element,
                content:d
            };
    
            var b=a.data(this.element,"popup");
            if(!b){
                b=a('<div><div class="jqx-popup-content"></div></div>');
                b.css({
                    position:"absolute",
                    zIndex:100000
                });
                a.data(this.element,"popup",b)
            }
            b.remove();
            b.css({
                top:0,
                left:0,
                visibility:"hidden",
                display:"block"
            });
            b.appendTo(document.body);
            if(!this.isContainer){
                b.find(".jqx-popup-content")[this.showHtml?"html":"text"](d)
            }else{
                b.find(".jqx-popup-content").append(d)
            }
            b.css({
                top:parseInt(f),
                left:parseInt(e)
            });
            if(a.browser.msie){
                b.css({
                    visibility:"visible",
                    display:"block"
                })
            }else{
                if(this.enableAnimation){
                    b.css({
                        opacity:0,
                        display:"block",
                        visibility:"visible"
                    }).animate({
                        opacity:1
                    },this.showDelay,function(){
                        var h=b.css("opacity");
                        b.css({
                            visibility:"visible",
                            display:"block"
                        })
                    })
                }else{
                    b.css({
                        visibility:"visible",
                        display:"block"
                    })
                }
            }
            this._raiseEvent(0)
        },
        propertyChangedHandler:function(b,d,c){
            if(this.isInitialized==undefined||this.isInitialized==false){
                return
            }
        }
    })
})(jQuery);
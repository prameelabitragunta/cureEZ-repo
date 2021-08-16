/*
jQWidgets v2.4.2 (2012-Sep-12)
Copyright (c) 2011-2012 jQWidgets.
License: http://jqwidgets.com/license/
*/

(function(a){
    a.jqx.jqxWidget("jqxCalendar","",{});
    a.extend(a.jqx._jqxCalendar.prototype,{
        defineInstance:function(){
            if(this.disabled==undefined){
                this.disabled=false
            }
            if(this.multipleMonthRows==undefined){
                this.multipleMonthRows=1
            }
            if(this.multipleMonthColumns==undefined){
                this.multipleMonthColumns=1
            }
            if(this.minDate==undefined){
                this.minDate=a.jqx._jqxDateTimeInput.getDateTime(new Date());
                this.minDate._setYear(1900);
                this.minDate._setMonth(1);
                this.minDate._setDay(1);
                this.minDate._setHours(1);
                this.minDate._setMinutes(1);
                this.minDate._setSeconds(1);
                this.minDate._setMilliseconds(1)
            }
            if(this.maxDate==undefined){
                this.maxDate=a.jqx._jqxDateTimeInput.getDateTime(new Date());
                this.maxDate._setYear(2100);
                this.maxDate._setMonth(1);
                this.maxDate._setDay(1);
                this.maxDate._setHours(1);
                this.maxDate._setMinutes(1);
                this.maxDate._setSeconds(1);
                this.maxDate._setMilliseconds(1)
            }
            if(this.stepMonths==undefined){
                this.stepMonths=1
            }
            if(this.width==undefined){
                this.width=null
            }
            if(this.height==undefined){
                this.height=null
            }
            if(this.value==undefined){
                this.value=a.jqx._jqxDateTimeInput.getDateTime(new Date());
                this.value._setHours(1);
                this.value._setMinutes(1);
                this.value._setSeconds(1);
                this.value._setMilliseconds(1)
            }
            if(this.firstDayOfWeek==undefined){
                this.firstDayOfWeek=0
            }
            if(this.showWeekNumbers==undefined){
                this.showWeekNumbers=false
            }
            if(this.showDayNames==undefined){
                this.showDayNames=true
            }
            if(this.enableWeekend==undefined){
                this.enableWeekend=false
            }
            if(this.enableOtherMonthDays==undefined){
                this.enableOtherMonthDays=true
            }
            if(this.showOtherMonthDays==undefined){
                this.showOtherMonthDays=true
            }
            if(this.rowHeaderWidth==undefined){
                this.rowHeaderWidth=25
            }
            if(this.columnHeaderHeight==undefined){
                this.columnHeaderHeight=20
            }
            if(this.titleHeight==undefined){
                this.titleHeight=25
            }
            if(this.dayNameFormat==undefined){
                this.dayNameFormat="firstTwoLetters"
            }
            if(this.titleFormat==undefined){
                this.titleFormat="MMMM yyyy"
            }
            if(this.readOnly==undefined){
                this.readOnly=false
            }
            if(this.culture==undefined){
                this.culture="default"
            }
            if(this.enableFastNavigation==undefined){
                this.enableFastNavigation=true
            }
            if(this.enableHover==undefined){
                this.enableHover=true
            }
            if(this.enableAutoNavigation==undefined){
                this.enableAutoNavigation=true
            }
            if(this.enableTooltips==undefined){
                this.enableTooltips=false
            }
            if(this.backText==undefined){
                this.backText="Back"
            }
            if(this.forwardText==undefined){
                this.forwardText="Forward"
            }
            if(this.specialDates==undefined){
                this.specialDates=new Array()
            }
            this.keyboardNavigation=true;
            this.selectionMode="default";
            this.todayString="Today";
            this.clearString="Clear";
            this.showFooter=false;
            this.selection={
                from:null,
                to:null
            };
            
            this.height=null;
            this.events=["backButtonClick","nextButtonClick","valuechanged","cellMouseDown","cellMouseUp","cellSelected","cellUnselected"]
        },
        createInstance:function(d){
            this.setCalendarSize();
            if(this.element.id==""){
                this.element.id=a.jqx.utilities.createId()
            }
            var h=this.element.id;
            var g=this;
            this.propertyChangeMap.width=function(k,m,l,n){
                g.setCalendarSize()
            };
                
            this.propertyChangeMap.height=function(k,m,l,n){
                g.setCalendarSize()
            };
                
            this.host.attr("tabIndex",0);
            this.host.css("outline","none");
            this.host.addClass(this.toThemeProperty("jqx-calendar"));
            this.host.addClass(this.toThemeProperty("jqx-widget"));
            this.host.addClass(this.toThemeProperty("jqx-widget-content"));
            this.host.addClass(this.toThemeProperty("jqx-rc-all"));
            this.addHandler(a(a(this.element)[0]),"keydown",function(l){
                var k=true;
                if(g.keyboardNavigation){
                    if(g._handleKey!=undefined){
                        k=g._handleKey(l)
                    }
                }
                return k
            });
            var c=false;
            var f=this;
            this.render();
            var b=false;
            if(g.width!=null&&g.width.toString().indexOf("%")!=-1){
                b=true
            }
            if(g.height!=null&&g.height.toString().indexOf("%")!=-1){
                b=true
            }
            a(window).bind("resize.calendar"+this.element.id,function(){
                var k=f.host.find("#View1"+g.element.id);
                if(!c){
                    c=true;
                    f.render()
                }else{
                    f.refreshTitle(k)
                }
                if(b){
                    if(g.refreshTimer){
                        clearTimeout(g.refreshTimer)
                    }
                    g.refreshTimer=setTimeout(function(){
                        g.refreshControl()
                    },1)
                }
            });
            if(b){
                setInterval(function(){
                    var l=g.host.width();
                    var k=g.host.height();
                    if(g._lastWidth!=l||g._lastHeight!=k){
                        g.refreshControl()
                    }
                    g._lastWidth=l;
                    g._lastHeight=k
                },100)
            }
            var e="View1";
            this.propertyChangeMap.disabled=function(k,m,l,n){
                if(n){
                    k.host.addClass(g.toThemeProperty("jqx-fill-state-disabled"))
                }else{
                    k.host.removeClass(g.toThemeProperty("jqx-fill-state-disabled"))
                }
                g.refreshControl()
            }
        },
        setCalendarSize:function(){
            if(this.width!=null&&this.width.toString().indexOf("px")!=-1){
                this.host.width(this.width)
            }else{
                if(this.width!=undefined&&!isNaN(this.width)){
                    this.host.width(this.width)
                }
            }
            if(this.width!=null&&this.width.toString().indexOf("%")!=-1){
                this.host.width(this.width)
            }
            if(this.height!=null&&this.height.toString().indexOf("px")!=-1){
                this.host.height(this.height)
            }else{
                if(this.height!=undefined&&!isNaN(this.height)){
                    this.host.height(this.height)
                }
            }
            if(this.height!=null&&this.height.toString().indexOf("%")!=-1){
                this.host.height(this.height)
            }
        },
        _handleKey:function(b){
            if(this.readOnly){
                return true
            }
            var m=b.keyCode;
            var g=this._getSelectedDate();
            if(g==undefined){
                return true
            }
            if(b.altKey){
                return true
            }
            var d=new a.jqx._jqxDateTimeInput.getDateTime(g);
            var c=this.getViewStart();
            var f=this.getViewEnd();
            var k=a.data(this.element,"View1"+this.element.id);
            if(k==undefined||k==null){
                return true
            }
            if(m==38){
                d._addDays(-7);
                if(d.dateTime<c){
                    var h=this.navigateBackward();
                    if(!h){
                        return false
                    }
                }
                this._selectDate(d.dateTime,"key");
                for(i=0;i<k.cells.length;i++){
                    var l=k.cells[i];
                    var e=l.dateTime.dateTime;
                    if(l.isOtherMonth&&l.isSelected&&e<=d.dateTime){
                        this.navigateBackward();
                        this._selectDate(d.dateTime,"key");
                        break
                    }
                }
                return false
            }else{
                if(m==40){
                    d._addDays(7);
                    if(d.dateTime>f){
                        var h=this.navigateForward();
                        if(!h){
                            return false
                        }
                    }
                    this._selectDate(d.dateTime,"key");
                    for(i=0;i<k.cells.length;i++){
                        var l=k.cells[i];
                        var e=l.dateTime.dateTime;
                        if(l.isOtherMonth&&l.isSelected&&e>=d.dateTime){
                            this.navigateForward();
                            this._selectDate(d.dateTime,"key");
                            break
                        }
                    }
                    return false
                }
            }
            if(m==37){
                d._addDays(-1);
                if(d.dateTime<c){
                    var h=this.navigateBackward();
                    if(!h){
                        return false
                    }
                }
                this._selectDate(d.dateTime,"key");
                for(i=0;i<k.cells.length;i++){
                    var l=k.cells[i];
                    var e=l.dateTime.dateTime;
                    if(l.isOtherMonth&&l.isSelected&&e<=d.dateTime){
                        if(d.dateTime<this.getMinDate()||d.dateTime>this.getMaxDate()){
                            return
                        }
                        this.navigateBackward();
                        this._selectDate(d.dateTime,"key");
                        break
                    }
                }
                return false
            }else{
                if(m==39){
                    d._addDays(1);
                    if(d.dateTime>f){
                        var h=this.navigateForward();
                        if(!h){
                            return false
                        }
                    }
                    this._selectDate(d.dateTime,"key");
                    for(i=0;i<k.cells.length;i++){
                        var l=k.cells[i];
                        var e=l.dateTime.dateTime;
                        if(l.isOtherMonth&&l.isSelected&&e>=d.dateTime){
                            if(d.dateTime<this.getMinDate()||d.dateTime>this.getMaxDate()){
                                return
                            }
                            this.navigateForward();
                            this._selectDate(d.dateTime,"key");
                            break
                        }
                    }
                    return false
                }
            }
            return true
        },
        render:function(){
            if(this.multipleMonthRows==1&&this.multipleMonthColumns==1){
                var b=this._renderSingleCalendar("View1"+this.element.id);
                this.host.append(b)
            }else{}
        },
        addSpecialDate:function(b,c,d){
            if(this.multipleMonthRows==1&&this.multipleMonthColumns==1){
                var e=this.specialDates.length;
                this.specialDates[e]={
                    Date:b,
                    Class:c,
                    Tooltip:d
                };
        
                this.refreshControl()
            }
        },
        refresh:function(b){
            if(!b){
                this.render()
            }
        },
        refreshControl:function(){
            if(this.multipleMonthRows==1&&this.multipleMonthColumns==1){
                this.refreshSingleCalendar("View1"+this.element.id,null)
            }
        },
        getViewStart:function(){
            var c=this.getVisibleDate();
            var b=this.getFirstDayOfWeek(c);
            return b.dateTime
        },
        getViewEnd:function(){
            var c=this.getViewStart();
            var b=new a.jqx._jqxDateTimeInput.getDateTime(c);
            b._addDays(41);
            return b.dateTime
        },
        refreshSingleCalendar:function(f,e){
            var h=this.host.find("#"+f);
            var d=this.getVisibleDate();
            var b=this.getFirstDayOfWeek(d);
            this.refreshTitle(h);
            this.refreshCalendarCells(h,b,f);
            this.refreshRowHeader(h,f);
            if(this.selectedDate!=undefined){
                this._selectDate(this.selectedDate)
            }
            var g=this.host.height()-this.titleHeight-this.columnHeaderHeight;
            if(!this.showDayNames){
                g=this.host.height()-this.titleHeight
            }
            if(this.showFooter){
                g-=20
            }
            var c=h.find("#cellsTable"+f);
            var k=h.find("#calendarRowHeader"+f);
            c.height(g);
            k.height(g)
        },
        refreshRowHeader:function(l,g){
            if(!this.showWeekNumbers){
                return
            }
            var h=this.getVisibleDate();
            var c=this.getFirstDayOfWeek(h);
            var f=c.dayOfWeek;
            var r=this.getWeekOfYear(c);
            var m=l.find("#rowHeader");
            m.width(this.rowHeaderWidth);
            var d=c;
            var q=new Array();
            for(i=0;i<6;i++){
                var e=r.toString();
                var p=new a.jqx._jqxCalendar.cell(d.dateTime);
                var k=i+1;
                var o=m.find("#headerCell"+k);
                p.element=o;
                p.row=i;
                p.column=0;
                var b=o.find("#headerCellContent"+k);
                b.addClass(this.toThemeProperty("jqx-calendar-row-cell"));
                b[0].innerHTML=r;
                q[i]=p;
                d=new a.jqx._jqxDateTimeInput.getDateTime(new Date(d._addWeeks(1)));
                r=this.getWeekOfYear(d)
            }
            var n=a.data(this.element,l[0].id);
            n.rowCells=q;
            this._refreshOtherMonthRows(n,g)
        },
        _refreshOtherMonthRows:function(e,d){
            if(this.showOtherMonthDays){
                return
            }
            this._displayLastRow(true,d);
            this._displayFirstRow(true,d);
            var c=false;
            var f=false;
            for(i=0;i<e.cells.length;i++){
                var b=e.cells[i];
                if(b.isVisible&&i<7){
                    c=true
                }else{
                    if(b.isVisible&&i>=e.cells.length-7){
                        f=true
                    }
                }
            }
            if(!c){
                this._displayFirstRow(false,d)
            }
            if(!f){
                this._displayLastRow(false,d)
            }
        },
        _displayLastRow:function(b,c){
            var g=this.host.find("#"+c);
            var f=g.find("#calendarRowHeader"+g[0].id);
            var d=f.find("#headerCellContent6");
            var e=g.find("#cellsTable"+g[0].id).find("#row6");
            if(b){
                d.css("display","block");
                e.css("display","table-row")
            }else{
                d.css("display","none");
                e.css("display","none")
            }
        },
        _displayFirstRow:function(b,c){
            var e=this.host.find("#"+c);
            var d=e.find("#calendarRowHeader"+e[0].id);
            var f=d.find("#headerCellContent1");
            var g=e.find("#cellsTable"+e[0].id).find("#row1");
            if(b){
                f.css("display","block");
                g.css("display","table-row")
            }else{
                f.css("display","none");
                g.css("display","none")
            }
        },
        _renderSingleCalendar:function(v,o){
            var r=this.host.find("#"+v.toString());
            if(r!=null){
                r.remove()
            }
            var z=a("<div id='"+v.toString()+"'></div>");
            var b=this.getVisibleDate();
            var q=this.getFirstDayOfWeek(b);
            var e=new a.jqx._jqxDateTimeInput.getDateTime(q.dateTime);
            e._addMonths(1);
            var y=a.jqx._jqxCalendar.monthView(q,e,null,null,null,z);
            if(o==undefined||o==null){
                this.host.append(z);
                if(this.height!=undefined&&!isNaN(this.height)){
                    z.height(this.height)
                }else{
                    if(this.height!=null&&this.height.toString().indexOf("px")!=-1){
                        z.height(this.height)
                    }
                }
                if(this.width!=undefined&&!isNaN(this.width)){
                    z.width(this.width)
                }else{
                    if(this.width!=null&&this.width.toString().indexOf("px")!=-1){
                        z.width(this.width)
                    }
                }
                if(this.width!=null&&this.width.toString().indexOf("%")!=-1){
                    z.width("100%")
                }
                if(this.height!=null&&this.height.toString().indexOf("%")!=-1){
                    z.height("100%")
                }
            }else{
                o.append(z)
            }
            a.data(this.element,v,y);
            var x=this.host.height()-this.titleHeight-this.columnHeaderHeight;
            if(!this.showDayNames){
                x=this.host.height()-this.titleHeight
            }
            if(this.showFooter){
                x-=20
            }
            if(this.rowHeaderWidth<0){
                this.rowHeaderWidth=0
            }
            if(this.columnHeaderHeight<0){
                this.columnHeaderHeight=0
            }
            if(this.titleHeight<0){
                this.titleHeight=0
            }
            var g=this.rowHeaderWidth;
            var m=this.columnHeaderHeight;
            if(!this.showWeekNumbers){
                g=0
            }
            if(!this.showDayNames){
                m=0
            }
            var A=a("<div style='height:"+this.titleHeight+"px;'><table style='width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarTitle' width='100%'><td NOWRAP id='leftNavigationArrow'></td><td align='center' NOWRAP id='calendarTitleHeader'></td><td NOWRAP id='rightNavigationArrow'></td></tr></table></div>");
            A.addClass(this.toThemeProperty("jqx-calendar-title-container"));
            z.append(A);
            var c=a("<table style='border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarHeader' height='"+m+"'><td id='selectCell' width='"+g+"'></td><td colspan='2' style='padding-left: 2px; padding-right: 2px' id='calendarColumnHeader'></td></tr><tr id='calendarContent'><td id='calendarRowHeader' valign='top' height='"+x+"' width='"+g+"'></td><td valign='top' colspan='2' style='padding-left: 2px; padding-right: 2px' id='cellsTable' height='"+x+"'></td></tr></table>");
            var d=20;
            var u=a("<div style='display: none; height:"+d+"px;'><table style='width: 100%; height: 100%; border-spacing: 0px;' cellspacing='0' cellpadding='0'><tr id='calendarFooter'><td align='right' id='todayButton'></td><td align='left' colspan='2' id=doneButton></td></tr></table></div>");
            if(this.showFooter){
                u.css("display","block")
            }
            z.append(c);
            z.append(u);
            c.addClass(this.toThemeProperty("jqx-calendar-month"));
            z.find("#calendarTitle")[0].id="calendarTitle"+v;
            z.find("#leftNavigationArrow")[0].id="leftNavigationArrow"+v;
            z.find("#calendarTitleHeader")[0].id="calendarTitleHeader"+v;
            z.find("#rightNavigationArrow")[0].id="rightNavigationArrow"+v;
            z.find("#cellsTable")[0].id="cellsTable"+v;
            z.find("#calendarRowHeader")[0].id="calendarRowHeader"+v;
            z.find("#calendarFooter")[0].id="calendarFooter"+v;
            z.find("#todayButton")[0].id="todayButton"+v;
            z.find("#doneButton")[0].id="doneButton"+v;
            z.find("#selectCell")[0].id="selectCell"+v;
            z.find("#calendarColumnHeader")[0].id="calendarColumnHeader"+v;
            z.find("td").css({
                padding:0,
                margin:0,
                border:"none"
            });
            z.find("tr").addClass(this.toThemeProperty("jqx-reset"));
            z.addClass(this.toThemeProperty("jqx-widget-content"));
            z.addClass(this.toThemeProperty("jqx-calendar-month-container"));
            var p=z.find("#selectCell"+v);
            p.addClass(this.toThemeProperty("jqx-reset"));
            p.addClass(this.toThemeProperty("jqx-calendar-top-left-header"));
            if(this.showWeekNumbers){
                this._renderRowHeader(z)
            }else{
                var w=z.find("#cellsTable"+v);
                w[0].colSpan=3;
                var n=z.find("#calendarColumnHeader"+v);
                n[0].colSpan=3;
                var s=z.find("#calendarRowHeader"+v);
                s.css("display","none");
                var p=z.find("#selectCell"+v);
                p.css("display","none")
            }
            if(this.showFooter){
                var u=z.find("#calendarFooter"+v);
                u.height(20);
                var l=z.find("#todayButton"+v);
                var f=z.find("#doneButton"+v);
                var k=a("<a href='#'>"+this.todayString+"</a>");
                k.appendTo(l);
                var h=a("<a href='#'>"+this.clearString+"</a>");
                h.appendTo(f);
                h.addClass(this.toThemeProperty("jqx-calendar-footer"));
                k.addClass(this.toThemeProperty("jqx-calendar-footer"));
                var t=this;
                this.addHandler(k,"click",function(){
                    t.setDate(new Date(),"mouse")
                });
                this.addHandler(h,"click",function(){
                    t.setDate(null,"mouse")
                })
            }
            if(this.showDayNames){
                this.renderColumnHeader(z)
            }
            if(o==undefined||o==null){
                this.renderTitle(z)
            }
            this.renderCalendarCells(z,q,v);
            this._refreshOtherMonthRows(y,v);
            z.find("tbody").css({
                border:"none",
                background:"transparent"
            });
            if(this.selectedDate!=undefined){
                this._selectDate(this.selectedDate)
            }
            return z
        },
        renderTitle:function(m){
            if(a.global==null||a.global==undefined){
                throw"jquery.global.js is not loaded."
            }
            a.global.preferCulture(this.culture);
            var b=a("<div style='float: left;'></div>");
            var h=a("<div style='float: right;'></div>");
            var g=m.find("#calendarTitle"+m[0].id);
            g.addClass(this.toThemeProperty("jqx-reset"));
            g.addClass(this.toThemeProperty("jqx-widget-header"));
            g.addClass(this.toThemeProperty("jqx-calendar-title-header"));
            if(a.browser.msie&&a.browser.version<8){
                if(g.find("td").css("background-color")!="transparent"){
                    var r=g.css("background-color");
                    g.find("td").css("background-color",r)
                }
                if(g.find("td").css("background-image")!="transparent"){
                    var p=g.css("background-image");
                    var n=g.css("background-repeat");
                    var t=g.css("background-position");
                    g.find("td").css("background-image",p);
                    g.find("td").css("background-repeat",n);
                    g.find("td").css("background-position","left center scroll")
                }
            }else{
                g.find("td").css("background-color","transparent")
            }
            if(this.disabled){
                g.addClass(this.toThemeProperty("jqx-calendar-title-header-disabled"))
            }
            b.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
            b.addClass(this.toThemeProperty("icon-arrow-left"));
            var k=m.find("#leftNavigationArrow"+m[0].id).append(b);
            h.addClass(this.toThemeProperty("jqx-calendar-title-navigation"));
            h.addClass(this.toThemeProperty("icon-arrow-right"));
            var e=m.find("#rightNavigationArrow"+m[0].id).append(h);
            if(this.enableTooltips&&this.tooltip!=null){
                this.tooltip.theme=this.theme;
                this.tooltip.add(k,this.backText);
                this.tooltip.add(e,this.forwardText)
            }
            var c=m.find("#calendarTitleHeader"+m[0].id);
            var q=a.global.format(this.value.dateTime,this.titleFormat,this.culture);
            var l=a("<div style='background: transparent; margin: 0; padding: 0; border: none;' id='titleContent'>"+q+"</div>");
            c.append(l);
            l.addClass(this.toThemeProperty("jqx-calendar-title-content"));
            var f=parseInt(b.width());
            var s=m.width()-2*f;
            var o=c.find("#titleContent").width(s);
            a.data(b,"navigateLeft",this);
            a.data(h,"navigateRight",this);
            var d=a.jqx.mobile.isTouchDevice();
            if(!this.disabled){
                this.addHandler(b,"mousedown",function(v){
                    a.data(b,"navigateLeftRepeat",true);
                    var u=a.data(b,"navigateLeft");
                    if(u.enableFastNavigation&&!d){
                        u.startRepeat(u,b,true,250)
                    }
                    u.navigateBackward();
                    return u._raiseEvent(0,v)
                });
                this.addHandler(b,"mouseup",function(u){
                    a.data(b,"navigateLeftRepeat",false)
                });
                this.addHandler(b,"mouseleave",function(u){
                    a.data(b,"navigateLeftRepeat",false)
                });
                this.addHandler(h,"mousedown",function(v){
                    a.data(h,"navigateRightRepeat",true);
                    var u=a.data(h,"navigateRight");
                    if(u.enableFastNavigation&&!d){
                        u.startRepeat(u,h,false,250)
                    }
                    u.navigateForward();
                    return u._raiseEvent(1,v)
                });
                this.addHandler(h,"mouseup",function(u){
                    a.data(h,"navigateRightRepeat",false)
                });
                this.addHandler(h,"mouseleave",function(u){
                    a.data(h,"navigateRightRepeat",false)
                })
            }
        },
        refreshTitle:function(d){
            if(a.global==null||a.global==undefined){
                throw"jquery.global.js is not loaded."
            }
            a.global.preferCulture(this.culture);
            var e=a.global.format(this.value.dateTime,this.titleFormat,this.culture);
            var c=d.find("#calendarTitleHeader"+d[0].id);
            var b=c.find("#titleContent");
            var f=a("<div style='background: transparent; margin: 0; padding: 0; border: none;' id='titleContent'>"+e+"</div>");
            c.append(f);
            f.addClass(this.toThemeProperty("jqx-calendar-title-content"));
            if(b!=null){
                b.remove()
            }
        },
        startRepeat:function(d,b,f,e){
            var c=window.setTimeout(function(){
                var g=a.data(b,"navigateLeftRepeat");
                if(!f){
                    g=a.data(b,"navigateRightRepeat")
                }
                if(g){
                    if(e<25){
                        e=25
                    }
                    if(f){
                        d.navigateBackward();
                        d.startRepeat(d,b,true,e-25)
                    }else{
                        d.navigateForward();
                        c=d.startRepeat(d,b,false,e-25)
                    }
                }else{
                    window.clearTimeout(c);
                    return
                }
            },e)
        },
        navigateForward:function(d){
            if(d==undefined||d==null){
                d=this.stepMonths
            }
            var b=this.value.day;
            var e=this.value.month;
            if(e+d<=12){
                var c=this.value._daysInMonth(this.value.year,this.value.month+d);
                if(b>c){
                    b=c
                }
            }
            return this.navigateTo(new Date(this.value.year,this.value.month-1+d,b))
        },
        navigateBackward:function(e){
            if(e==undefined||e==null){
                e=this.stepMonths
            }
            var b=this.value.day;
            var f=this.value.month;
            if(f-e>=1){
                var d=this.value._daysInMonth(this.value.year,this.value.month-e);
                if(b>d){
                    b=d
                }
            }
            var c=new Date(this.value.year,this.value.month-1-e,b);
            return this.navigateTo(c)
        },
        refreshCalendarCells:function(o,d,g){
            var c=o.find("#cellsTable"+o[0].id);
            var l=c.find("#cellTable"+g.toString());
            var e=d;
            var u=new Array();
            var h=0;
            var p=new a.jqx._jqxDateTimeInput.getDateTime(new Date());
            var f=(o.width()-this.rowHeaderWidth-2)/7;
            if(!this.showWeekNumbers){
                f=(o.width()-2)/7
            }
            for(i=0;i<6;i++){
                for(j=0;j<7;j++){
                    var q=i+1;
                    var n=j+1;
                    var m="#cell"+q+n;
                    var t=new a.jqx._jqxCalendar.cell(e.dateTime);
                    var s=l.find(m);
                    t.element=s;
                    t.row=i;
                    t.column=j;
                    t.isVisible=true;
                    t.isOtherMonth=false;
                    t.isToday=false;
                    t.isWeekend=false;
                    t.isHighlighted=false;
                    t.isSelected=false;
                    if(e.month!=this.value.month){
                        t.isOtherMonth=true;
                        t.isVisible=this.showOtherMonthDays
                    }
                    if(e.month==p.month&&e.day==p.day&&e.year==p.year){
                        t.isToday=true
                    }
                    if(e.isWeekend()){
                        t.isWeekend=true
                    }
                    a.data(this.element,"cellContent"+m.substring(1),t);
                    u[h]=t;
                    h++;
                    var b=s.find("#cellContent"+m.substring(1));
                    if(this.specialDates.length>0){
                        if(this.tooltip!=null){
                            if(this.tooltip.hasTooltip(b)){
                                this.tooltip.remove(b)
                            }
                        }
                    }
                    b.html(e.day);
                    this._applyCellStyle(t,s,b);
                    e=new a.jqx._jqxDateTimeInput.getDateTime(new Date(e._addDays(1)))
                }
            }
            var r=a.data(this.element,o[0].id);
            if(r!=undefined&&r!=null){
                r.cells=u
            }
        },
        renderCalendarCells:function(x,m,p){
            var s=a("<table style='border-spacing: 0px; width: 100%; height: 100%;' cellspacing='0' cellpadding='1' id=cellTable"+p.toString()+"><tr id='row1'><td id='cell11'></td><td id='cell12'></td><td id='cell13'></td><td id='cell14'></td><td id='cell15'></td><td id='cell16'></td><td id='cell17'></td></tr><tr id='row2'><td id='cell21'></td><td id='cell22'></td><td id='cell23'></td><td id='cell24'></td><td id='cell25'></td><td id='cell26'></td><td id='cell27'></td></tr><tr id='row3'><td id='cell31'></td><td id='cell32'></td><td id='cell33'></td><td id='cell34'></td><td id='cell35'></td><td id='cell36'></td><td id='cell37'></td></tr><tr id='row4'><td id='cell41'></td><td id='cell42'></td><td id='cell43'></td><td id='cell44'></td><td id='cell45'></td><td id='cell46'></td><td id='cell47'></td></tr><tr id='row5'><td id='cell51'></td><td id='cell52'></td><td id='cell53'></td><td id='cell54'></td><td id='cell55'></td><td id='cell56'></td><td id='cell57'></td></tr><tr id='row6'><td id='cell61'></td><td id='cell62'></td><td id='cell63'></td><td id='cell64'></td><td id='cell65'></td><td id='cell66'></td><td id='cell67'></td></tr></table>");
            var t=x.find("#cellsTable"+x[0].id);
            s.find("table").css({
                background:"none",
                padding:0,
                margin:0,
                border:0
            });
            s.find("td").css({
                background:"none",
                padding:1,
                margin:0,
                border:0
            });
            s.find("tr").css({
                background:"none",
                padding:0,
                margin:0,
                border:0
            });
            var h=t.find("#cellTable"+p.toString());
            if(h!=null){
                h.remove()
            }
            t.append(s);
            s.addClass(this.toThemeProperty("jqx-calendar-view"));
            var l=m;
            var b=this.showDayNames?1:0;
            var g=this.showWeekNumbers?1:0;
            var e=new Array();
            var q=0;
            var r=(x.width()-this.rowHeaderWidth-2)/7;
            if(!this.showWeekNumbers){
                r=(x.width()-2)/7
            }
            var v=new a.jqx._jqxDateTimeInput.getDateTime(new Date());
            for(i=0;i<6;i++){
                for(j=0;j<7;j++){
                    var f=i+1;
                    var u=j+1;
                    var o="#cell"+f+u;
                    var c=new a.jqx._jqxCalendar.cell(l.dateTime);
                    var n=s.find(o);
                    c.isVisible=true;
                    if(l.month!=this.value.month){
                        c.isOtherMonth=true;
                        c.isVisible=this.showOtherMonthDays
                    }
                    if(l.month==v.month&&l.day==v.day&&l.year==v.year){
                        c.isToday=true
                    }
                    if(l.isWeekend()){
                        c.isWeekend=true
                    }
                    c.element=n;
                    c.row=b;
                    c.column=g;
                    if(c.isVisible){
                        var d=a("<div id='cellContent"+o.substring(1)+"'>"+l.day+"</div>");
                        n.append(d);
                        n.width(r);
                        d.css("padding","3px")
                    }else{
                        var d=a("<div id='cellContent"+o.substring(1)+"'>"+l.day+"</div>");
                        n.append(d);
                        n.width(r);
                        d.css("padding","3px")
                    }
                    l=new a.jqx._jqxDateTimeInput.getDateTime(new Date(l._addDays(1)));
                    a.data(n,o,this);
                    a.data(this.element,"cellContent"+o.substring(1),c);
                    var y=this;
                    this.addHandler(n,"mousedown",function(C){
                        var A=a.data(n,o);
                        if(!A.readOnly&&!y.disabled){
                            var B=a(C.target);
                            var z=a.data(y.element,B[0].id);
                            var k=A._raiseEvent(3,C);
                            if(z!=null&&z!=undefined){
                                if(!z.isDisabled){
                                    if(z.isOtherMonth&&A.enableAutoNavigation){
                                        if(z.row<2){
                                            A.navigateBackward()
                                        }else{
                                            A.navigateForward()
                                        }
                                        A._selectDate(z.dateTime.dateTime,"mouse")
                                    }else{
                                        A._selectDate(z.dateTime.dateTime,"mouse")
                                    }
                                }
                            }
                            return k
                        }
                    });
                    if(!y.disabled){
                        this.addHandler(n,"mouseup",function(z){
                            var k=a.data(n,o);
                            if(!k.readOnly){
                                return k._raiseEvent(4,z)
                            }
                        });
                        this.addHandler(n,"mouseover",function(B){
                            var z=a.data(n,o);
                            if(!z.readOnly){
                                var A=a(B.target);
                                var k=a.data(y.element,A[0].id);
                                if(k!=null&&k!=undefined){
                                    k.isHighlighted=true;
                                    z._applyCellStyle(k,k.element,A)
                                }
                            }
                        });
                        this.addHandler(n,"mouseout",function(B){
                            var z=a.data(n,o);
                            if(!z.readOnly){
                                var A=a(B.target);
                                var k=a.data(y.element,A[0].id);
                                if(k!=null&&k!=undefined){
                                    k.isHighlighted=false;
                                    z._applyCellStyle(k,k.element,A)
                                }
                            }
                        })
                    }
                    g++;
                    e[q]=c;
                    q++
                }
                g=0;
                b++
            }
            var w=a.data(this.element,x[0].id);
            if(w!=undefined&&w!=null){
                w.cells=e
            }
            this._applyCellStyles()
        },
        setMaxDate:function(b){
            this.maxDate=a.jqx._jqxDateTimeInput.getDateTime(b)
        },
        getMaxDate:function(){
            if(this.maxDate!=null&&this.maxDate!=undefined){
                return this.maxDate.dateTime
            }
            return null
        },
        setMinDate:function(b){
            this.minDate=a.jqx._jqxDateTimeInput.getDateTime(b)
        },
        getMinDate:function(){
            if(this.minDate!=null&&this.minDate!=undefined){
                return this.minDate.dateTime
            }
            return null
        },
        navigateTo:function(b){
            if(b<this.getMinDate()||b>this.getMaxDate()){
                return false
            }
            if(b==null){
                return false
            }
            this.value._setYear(b.getFullYear());
            this.value._setDay(b.getDate());
            this.value._setMonth(b.getMonth()+1);
            this.refreshControl();
            this._raiseEvent("2");
            return true
        },
        setDate:function(b){
            this.navigateTo(b);
            this._selectDate(b);
            if(this.selectionMode=="range"){
                this._selectDate(b,"mouse")
            }
            return true
        },
        getDate:function(){
            if(this.value==undefined){
                return new Date()
            }
            return this.value.dateTime
        },
        setRange:function(c,b){
            this.navigateTo(c);
            this._selectDate(c,"mouse");
            this._selectDate(b,"mouse")
        },
        getRange:function(){
            return this.selection
        },
        _selectDate:function(c,d){
            if(this.selectionMode=="none"){
                return
            }
            if(d==null||d==undefined){
                d="none"
            }
            var e=a.data(this.element,"View1"+this.element.id);
            if(e==undefined||e==null){
                return
            }
            var b=this;
            a.each(e.cells,function(l){
                var p=this;
                var g=p.dateTime;
                var o=a(p.element);
                var f=o.find("#cellContent"+o[0].id);
                if(c==null){
                    p.isSelected=false;
                    p.isDisabled=false;
                    if(l==0){
                        b.selection={
                            from:null,
                            to:null
                        };
                
                        b._raiseEvent("2");
                        b._raiseEvent("5",{
                            selectionType:d
                        })
                    }
                }else{
                    if(b.selectionMode!="range"||d=="key"){
                        if(g.day==c.getDate()&&g.month==(1+c.getMonth())&&g.year==c.getFullYear()&&p.isSelected){
                            b._applyCellStyle(p,o,f);
                            return
                        }
                        if(p.isSelected){
                            b._raiseEvent("6",{
                                selectionType:d
                            })
                        }
                        p.isSelected=false;
                        if(g.day==c.getDate()&&g.month==(1+c.getMonth())&&g.year==c.getFullYear()){
                            p.isSelected=true;
                            if(l==0){
                                b.selection={
                                    date:c
                                }
                            }
                            p.element.focus();
                            if(!p.isOtherMonth){
                                b.value._setMonth(c.getMonth()+1);
                                b.value._setDay(c.getDate());
                                b.value._setYear(c.getFullYear());
                                b._raiseEvent("2");
                                b._raiseEvent("5",{
                                    selectionType:d
                                })
                            }
                        }
                    }else{
                        if(b.selectionMode=="range"){
                            if(l==0){
                                if(d!="none"){
                                    if(b._clicks==undefined){
                                        b._clicks=0
                                    }
                                    b._clicks++;
                                    if(b._clicks==1){
                                        b.selection={
                                            from:c,
                                            to:c
                                        }
                                    }else{
                                        if(b._clicks==2){
                                            var n=b.selection.from;
                                            var k=n<=c?n:c;
                                            var m=n<=c?c:n;
                                            b.selection={
                                                from:k,
                                                to:m
                                            };
                    
                                            b._clicks=0
                                        }
                                    }
                                }else{
                                    if(b.selection==null||b.selection.from==null){
                                        b.selection={
                                            from:c,
                                            to:c
                                        };
        
                                        if(b._clicks==undefined){
                                            b._clicks=0
                                        }
                                        b._clicks++;
                                        if(b._clicks==2){
                                            b._clicks=0
                                        }
                                    }
                                }
                            }
                            var h=function(r){
                                var q=new Date();
                                q.setHours(0,0,0,0);
                                q.setFullYear(r.getFullYear(),r.getMonth(),r.getDate());
                                return q
                            };
    
                            if(!p.isOtherMonth&&h(g.dateTime).toString()==h(c).toString()){
                                b.value._setMonth(c.getMonth()+1);
                                b.value._setDay(c.getDate());
                                b.value._setYear(c.getFullYear());
                                b._raiseEvent("2");
                                b._raiseEvent("5",{
                                    selectionType:d
                                })
                            }
                            p.isSelected=false;
                            p.isDisabled=false;
                            if(h(g.dateTime)<h(b.selection.from)&&b._clicks==1){
                                p.isDisabled=true
                            }
                            if(h(g.dateTime)>=h(b.selection.from)&&h(g.dateTime)<=h(b.selection.to)){
                                p.isSelected=true
                            }
                        }
                    }
                }
                b._applyCellStyle(p,o,f)
            });
            this.selectedDate=c
        },
        _getSelectedDate:function(){
            var d=a.data(this.element,"View1"+this.element.id);
            if(d==undefined||d==null){
                return
            }
            for(var c=0;c<d.cells.length;c++){
                var b=d.cells[c];
                var e=b.dateTime.dateTime;
                if(b.isSelected){
                    return e
                }
            }
            if(this.selectedDate){
                return this.selectedDate
            }
        },
        _getSelectedCell:function(){
            var d=a.data(this.element,"View1"+this.element.id);
            if(d==undefined||d==null){
                return
            }
            for(var c=0;c<d.cells.length;c++){
                var b=d.cells[c];
                var e=b.dateTime.dateTime;
                if(b.isSelected){
                    return b
                }
            }
        },
        _applyCellStyle:function(b,c,e){
            var d=this;
            e.removeClass();
            e.addClass(this.toThemeProperty("jqx-rc-all"));
            if(this.disabled||b.isDisabled){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-disabled"));
                e.addClass(this.toThemeProperty("jqx-fill-state-disabled"))
            }
            if(b.isOtherMonth&&this.enableOtherMonthDays&&b.isVisible){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-othermonth"))
            }
            if(b.isWeekend&&this.enableWeekend&&b.isVisible&&b.isVisible){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-weekend"))
            }
            if(!b.isVisible){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-hidden"))
            }else{
                e.addClass(this.toThemeProperty("jqx-calendar-cell"))
            }
            if(b.isSelected&&b.isVisible){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-selected"));
                e.addClass(this.toThemeProperty("jqx-fill-state-pressed"))
            }
            if(b.isHighlighted&&b.isVisible&&this.enableHover){
                if(!b.isDisabled){
                    e.addClass(this.toThemeProperty("jqx-calendar-cell-hover"));
                    e.addClass(this.toThemeProperty("jqx-fill-state-hover"))
                }
            }
            if(b.isToday&&b.isVisible){
                e.addClass(this.toThemeProperty("jqx-calendar-cell-today"))
            }
            if(this.specialDates.length>0){
                var f=this;
                a.each(this.specialDates,function(){
                    if(this.Class!=undefined&&this.Class!=null&&this.Class!=""){
                        e.removeClass(this.Class)
                    }else{
                        e.removeClass(d.toThemeProperty("jqx-calendar-cell-specialDate"))
                    }
                    if(b.dateTime._equalDate(this.Date)){
                        if(b.tooltip==null&&this.Tooltip!=null&&f.tooltip!=null){
                            b.tooltip=this.Tooltip;
                            f.tooltip.remove(e);
                            f.tooltip.theme=f.theme;
                            f.tooltip.add(e,this.Tooltip)
                        }
                        e.removeClass(d.toThemeProperty("jqx-calendar-cell-othermonth"));
                        e.removeClass(d.toThemeProperty("jqx-calendar-cell-weekend"));
                        if(this.Class==undefined||this.Class==""){
                            e.addClass(d.toThemeProperty("jqx-calendar-cell-specialDate"));
                            return false
                        }else{
                            e.addClass(this.Class);
                            return false
                        }
                    }
                })
            }
        },
        _applyCellStyles:function(){
            var e=a.data(this.element,"View1"+this.element.id);
            if(e==undefined||e==null){
                return
            }
            for(i=0;i<e.cells.length;i++){
                var b=e.cells[i];
                var c=a(b.element);
                var d=c.find("#cellContent"+c[0].id);
                this._applyCellStyle(b,c,d)
            }
        },
        getWeekOfYear:function(c){
            var b=c.dayOfYear(c.dateTime)-1;
            var d=c.dayOfWeek-(b%7);
            var e=((d-this.firstDayOfWeek)+14)%7;
            return Math.ceil((((b+e)/7)+1))
        },
        renderColumnHeader:function(x){
            if(!this.showDayNames){
                return
            }
            var d=this.getVisibleDate();
            var k=this.getFirstDayOfWeek(d);
            var o=k.dayOfWeek;
            var y=this.getWeekOfYear(k);
            if(a.global==null||a.global==undefined){
                throw"jquery.global.js is not loaded."
            }
            a.global.preferCulture(this.culture);
            var s=this.firstDayOfWeek;
            var w=a.global.culture.calendar.days.names;
            var t=a("<table style='border-spacing: 0px; border-collapse: collapse; width: 100%; height: 100%;' cellspacing='0' cellpadding='1' id='columnHeader'><tr id='columnHeader'><td id='columnCell1'></td><td id='columnCell2'></td><td id='columnCell3'></td><td id='columnCell4'></td><td id='columnCell5'></td><td id='columnCell6'></td><td id='columnCell7'></td></tr></table>");
            t.find("table").addClass(this.toThemeProperty("jqx-reset"));
            t.find("tr").addClass(this.toThemeProperty("jqx-reset"));
            t.find("td").css({
                background:"transparent",
                padding:1,
                margin:0,
                border:"none"
            });
            t.addClass(this.toThemeProperty("jqx-reset"));
            t.addClass(this.toThemeProperty("jqx-calendar-column-header"));
            var g=x.find("#calendarColumnHeader"+x[0].id);
            var m=g.find("#columnHeader");
            if(m!=null){
                m.remove()
            }
            g.append(t);
            var p=new Array();
            var h=k;
            var q=(x.width()-this.rowHeaderWidth-2)/7;
            if(!this.showWeekNumbers){
                q=(x.width()-2)/7
            }
            if(a.jqx._jqxTooltip!=null&&a.jqx._jqxTooltip!=undefined){
                var u=g.jqxTooltip();
                this.tooltip=a.data(u[0],"jqxTooltip").instance;
                this.tooltip.location="relative";
                this.tooltip.verticalOffset=30
            }
            for(i=0;i<7;i++){
                var f=w[s];
                switch(this.dayNameFormat){
                    case"default":
                        f=a.global.culture.calendar.days.namesAbbr[s];
                        break;
                    case"shortest":
                        f=a.global.culture.calendar.days.namesShort[s];
                        break;
                    case"firstTwoLetters":
                        f=f.substring(0,2);
                        break;
                    case"firstLetter":
                        f=f.substring(0,1);
                        break
                }
                var b=new a.jqx._jqxCalendar.cell(h.dateTime);
                var n=i+1;
                var l=t.find("#columnCell"+n);
                var r=i;
                if(this.enableTooltips&&this.tooltip!=null){
                    this.tooltip.add(l,w[s])
                }
                if(s>=6){
                    s=0
                }else{
                    s++
                }
                i=r;
                b.element=l;
                b.row=0;
                b.column=i+1;
                var e=this._textwidth(f);
                var c="<div style='padding: 0; margin: 0; border: none; background: transparent;' id='columnCell"+n+"'>"+f+"</div>";
                l.append(c);
                l.find("#columnCell"+n).addClass(this.toThemeProperty("jqx-calendar-column-cell"));
                l.width(q);
                if(this.disabled){
                    l.find("#columnCell"+n).addClass(this.toThemeProperty("jqx-calendar-column-cell-disabled"))
                }
                if(e>0&&q>0){
                    while(e>l.width()){
                        if(f.length==0){
                            break
                        }
                        f=f.substring(0,f.length-1);
                        l.find("#columnCell"+n).html(f);
                        e=this._textwidth(f)
                    }
                }
                p[i]=b;
                h=new a.jqx._jqxDateTimeInput.getDateTime(new Date(h._addDays(1)))
            }
            if(parseInt(g.width())>parseInt(this.host.width())){
                g.width(this.host.width())
            }
            var v=a.data(this.element,x[0].id);
            v.columnCells=p
        },
        _textwidth:function(d){
            var c=a("<span>"+d+"</span>");
            c.addClass(this.toThemeProperty("jqx-calendar-column-cell"));
            a(this.host).append(c);
            var b=c.width();
            c.remove();
            return b
        },
        _textheight:function(d){
            var c=a("<span>"+d+"</span>");
            a(this.host).append(c);
            var b=c.height();
            c.remove();
            return b
        },
        _renderRowHeader:function(l){
            var g=this.getVisibleDate();
            var c=this.getFirstDayOfWeek(g);
            var f=c.dayOfWeek;
            var r=this.getWeekOfYear(c);
            var m=a("<table style='overflow: hidden; width: 100%; height: 100%;' cellspacing='0' cellpadding='1' id='rowHeader'><tr id='rowHeader1'><td id='headerCell1'></td></tr><tr id='rowHeader2'><td id='headerCell2'/></tr><tr id='rowHeader3'><td id='headerCell3'/></tr><tr id='rowHeader4'><td id='headerCell4'/></tr><tr id='rowHeader5'><td id='headerCell5'/></tr><tr id='rowHeader6'><td id='headerCell6'/></tr></table>");
            m.find("table").addClass(this.toThemeProperty("jqx-reset"));
            m.find("td").addClass(this.toThemeProperty("jqx-reset"));
            m.find("tr").addClass(this.toThemeProperty("jqx-reset"));
            m.addClass(this.toThemeProperty("jqx-calendar-row-header"));
            m.width(this.rowHeaderWidth);
            var h=l.find("#rowHeader");
            if(h!=null){
                h.remove()
            }
            l.find("#calendarRowHeader"+l[0].id).append(m);
            var d=c;
            var q=new Array();
            for(i=0;i<6;i++){
                var e=r.toString();
                var p=new a.jqx._jqxCalendar.cell(d.dateTime);
                var k=i+1;
                var o=m.find("#headerCell"+k);
                p.element=o;
                p.row=i;
                p.column=0;
                var b="<div style='background: transparent; border: none; padding: 0; margin: 0;' id ='headerCellContent"+k+"'>"+e+"</div>";
                o.append(b);
                o.find("#headerCellContent"+k).addClass(this.toThemeProperty("jqx-calendar-row-cell"));
                q[i]=p;
                d=new a.jqx._jqxDateTimeInput.getDateTime(new Date(d._addWeeks(1)));
                r=this.getWeekOfYear(d)
            }
            var n=a.data(this.element,l[0].id);
            n.rowCells=q
        },
        getFirstDayOfWeek:function(e){
            var d=e;
            if(this.firstDayOfWeek<0||this.firstDayOfWeek>6){
                this.firstDayOfWeek=6
            }
            var c=d.dayOfWeek-this.firstDayOfWeek;
            if(c<=0){
                c+=7
            }
            var b=a.jqx._jqxDateTimeInput.getDateTime(d._addDays(-c));
            return b
        },
        getVisibleDate:function(){
            var c=new a.jqx._jqxDateTimeInput.getDateTime(new Date(this.value.dateTime));
            if(c<this.minDate){
                c=this.minDate
            }
            if(c>this.maxDate){
                this.visibleDate=this.maxDate
            }
            var d=c.day;
            var b=a.jqx._jqxDateTimeInput.getDateTime(c._addDays(-d+1));
            c=b;
            return c
        },
        destroy:function(){
            this.host.removeClass()
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
            if(g==0||g==1||g==2||g==3||g==4||g==5||g==6){
                f.args.date=this.getDate();
                f.args.selectedDate=this._getSelectedDate()
            }
            var b=this.host.trigger(f);
            if(g==0||g==1){
                b=false
            }
            return b
        },
        propertyChangedHandler:function(b,c,h,f){
            if(this.isInitialized==undefined||this.isInitialized==false){
                return
            }
            if(c=="width"||c=="height"){
                var g=this.host.find("#View1"+this.element.id);
                if(g.length>0){
                    this.setCalendarSize();
                    if(this.height!=undefined&&!isNaN(this.height)){
                        g.height(this.height)
                    }else{
                        if(this.height!=null&&this.height.toString().indexOf("px")!=-1){
                            g.height(this.height)
                        }
                    }
                    if(this.width!=undefined&&!isNaN(this.width)){
                        g.width(this.width)
                    }else{
                        if(this.width!=null&&this.width.toString().indexOf("px")!=-1){
                            g.width(this.width)
                        }
                    }
                    var e=this.host.height()-this.titleHeight-this.columnHeaderHeight;
                    var d="View1"+this.element.id;
                    g.find("#cellsTable"+d).height(e);
                    g.find("#calendarRowHeader"+d).height(e);
                    this.refreshControl()
                }
                return
            }else{
                if(c=="theme"){
                    a.jqx.utilities.setTheme(h,f,this.host)
                }else{
                    this.render()
                }
            }
        }
    })
})(jQuery);
(function(a){
    a.jqx._jqxCalendar.cell=function(c){
        var b={
            dateTime:new a.jqx._jqxDateTimeInput.getDateTime(c),
            isToday:false,
            isWeekend:false,
            isOtherMonth:false,
            isVisible:true,
            isSelected:false,
            isHighlighted:false,
            element:null,
            row:-1,
            column:-1,
            tooltip:null
        };
        
        return b
    };
        
    a.jqx._jqxCalendar.monthView=function(c,h,d,b,f,e){
        var g={
            start:c,
            end:h,
            cells:d,
            rowCells:b,
            columnCells:f,
            element:e
        };
        
        return g
    }
})(jQuery);
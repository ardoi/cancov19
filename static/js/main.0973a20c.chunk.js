(this.webpackJsonpcancov19=this.webpackJsonpcancov19||[]).push([[0],{210:function(e,a,t){e.exports=t(419)},215:function(e,a,t){},216:function(e,a,t){},419:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),c=t(38),l=t.n(c),o=(t(215),t(216),t(217),t(22)),i=t(31),u=t(176),s=t(177),m=t(196),d=t(199),h=(t(234),t(40)),p=t(18),v=t.n(p),f=t(66),E=r.a.createContext("CXContext"),g=function(e){Object(d.a)(t,e);var a=Object(m.a)(t);function t(){var e;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=a.call.apply(a,[this].concat(r))).state={detailData:null,deathData:null,dim:null,loading:!1,hasCF:!1},e}return Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(!this.state.hasCF&&!this.state.loading){this.dimensions={},this.dimensionsD={};var a="https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=",t=a+"Old&range=C:G",n=a+"Dth&range=B:F";this.setState({loading:!0});var r=function(a){a.forEach((function(e){e.Date=v()(e["Announced\n"]+"-2020","D-MMM-YYYY")})),a=a.filter((function(e){return"RC"!==e.Prov}));var t=Object(f.a)(a),n=JSON.parse(JSON.stringify(a));n.forEach((function(e){e.Date=v()(e.Date)}));var r=Object(f.a)(n);return e.dimensionsD.date=t.dimension((function(e){return e.Date})),e.dimensionsD.dateN=r.dimension((function(e){return e.Date})),e.dimensionsD.prov=t.dimension((function(e){return e.Prov})),e.dimensionsD.provN=r.dimension((function(e){return e.Prov})),a},c=Object(h.c)(t).then((function(a){a.forEach((function(e){e.Date=v()(e.Date+"-2020","D-MMM-YYYY")})),a=a.filter((function(e){return"RC"!==e.Prov}));var t=Object(f.a)(a),n=JSON.parse(JSON.stringify(a));n.forEach((function(e){e.Date=v()(e.Date)}));var r=Object(f.a)(n);return e.dimensions.date=t.dimension((function(e){return e.Date})),e.dimensions.dateN=r.dimension((function(e){return e.Date})),e.dimensions.prov=t.dimension((function(e){return e.Prov})),e.dimensions.provN=r.dimension((function(e){return e.Prov})),a})).catch((function(e){return console.log("failed with url",e),Object(h.c)("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Old&range=C:G").then(r).catch((function(e){console.log("backuperror 1",e)}))})),l=Object(h.c)(n).then(r).catch((function(e){return console.log("failed with url2",e),Object(h.c)("https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Dth&range=B:F").then(r).catch((function(e){console.log("backuperror 2",e)}))}));Promise.all([c,l]).then((function(a){console.log("Done fetching data"),e.setState({loading:!1,hasCF:!0,detailData:a[0],deathData:a[1]})}))}}},{key:"render",value:function(){return this.state.hasCF?r.a.createElement(E.Provider,{value:{dimensions:this.dimensions,dimensionsD:this.dimensionsD}},r.a.createElement("div",{ref:this.parent},this.props.children)):null}}]),t}(n.Component),w=t(178),y=t(198),k=t(425),O=t(427),C=t(16),b=function(){return[[235,172,35],[184,0,88],[0,140,249],[0,110,0],[0,187,173],[209,99,230],[178,69,2],[255,146,135],[89,84,214],[0,198,248],[135,133,0],[0,167,108],[189,189,189]].map((function(e){return Object(C.g)(e[0],e[1],e[2]).darker().formatHex()}))},P=function(e,a){for(var t=[],n=0;n<e.length;n++)t.push({a1:e[n],a2:a[n]});t.sort((function(e,a){return e.a1.value-a.a1.value}));for(var r=0;r<t.length;r++)e[r]=t[r].a1,a[r]=t[r].a2},D={ON:14.71,QC:8.53,BC:5.11,AB:4.41,SK:1.18,NL:.52,NS:.98,MB:1.38,NB:.78,PE:.16,YT:.041,NT:.044,NU:.039};function j(){var e=window;return{width:e.innerWidth,height:e.innerHeight}}var x=function(e){var a=Object(w.css)({cursor:"pointer"});return r.a.createElement(y.a,Object.assign({},a,{onClick:function(){e.chart.filterAll(),o.redrawAll()}}),"reset")},N=function(e){var a,t=r.a.useContext(E),c=r.a.useState(null),l=Object(i.a)(c,2),o=l[0],u=l[1],s=r.a.useState({a:1,b:0}),m=Object(i.a)(s,2),d=m[0],h=m[1];"detail"===e.params.usedata?a=t.dimensions:"deaths"===e.params.usedata&&(a=t.dimensionsD);var p,v,f,g=r.a.useRef(null),w=function(){var e=Object(n.useState)(j()),a=Object(i.a)(e,2),t=a[0],r=a[1];return Object(n.useEffect)((function(){function e(){r(j())}return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),t}();return r.a.useEffect((function(){var t=e.chartFunction(g.current,a,e.params,w,d,h);t.render(),u(t)}),[e.params,w]),e.reset&&(p=r.a.createElement(x,{chart:o}),v=r.a.createElement(k.a,{content:"Pick province(s) to filter results and click Reset to restore defaults",trigger:r.a.createElement(y.a,{circular:!0,color:"teal"},"?")})),e.title&&(f=r.a.createElement(O.a,{as:"h3"},e.title,p,v)),r.a.createElement(n.Fragment,null,f,r.a.createElement("div",{ref:g}))},A=function(e,a,t,n,r,c){if(r.hasOwnProperty("chart")){var l=r.chart,i=n.width/1440*350,u=n.width/1440*300;return l.width(i).height(u),l}var s,m=(s=t.normalize?a.provN:a.prov).group(),d=b(),h=m.all();P(h,d);var p=o.rowChart(e),v=t.normalize,f=n.width/1440*350,E=n.width/1440*300;return p.width(f).height(E).margins({top:10,right:50,bottom:30,left:40}).dimension(s).group(m).elasticX(!0).labelOffsetX(-25).valueAccessor((function(e){return v?e.value/D[e.key]:e.value})).ordinalColors(d.slice(0,Object.keys(h).length).reverse()),p.xAxis().ticks(5),c({chart:p}),p},M=function(e){return r.a.createElement(N,{chartFunction:A,title:"Province Totals",reset:!0,params:e.params})},S=t(86),z=t(35),F=t(9),Y=function(e,a,t,n,r,c){var l,u,s;if(r.hasOwnProperty("chart")){var m=r.chart,d=n.width/1440*475,h=n.width/1440*350;return m.width(d).height(h),m}t.normalize?(l=a.dateN,u=a.provN.group(),s=l.group()):(l=a.date,u=a.prov.group(),s=l.group());var p=t.stacked,f=s,E=b();if(p){function g(e){return{all:function(){var a,t=e.all(),n={},r=[],c=Object(z.a)(t);try{for(c.s();!(a=c.n()).done;){for(var l=a.value,o=0,u=Object.entries(l.value);o<u.length;o++){var s=Object(i.a)(u[o],2),m=s[0],d=s[1];n[m]=(n[m]||0)+d}r.push({key:l.key,value:Object(S.a)({},n)})}}catch(h){c.e(h)}finally{c.f()}return r}}}f=g(s.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1,e}),(function(e,a){return e[a.Prov]=e[a.Prov]-1,e}),(function(){return{}})))}else{function g(e){return{all:function(){var a,t=e.all(),n=0,r=[],c=Object(z.a)(t);try{for(c.s();!(a=c.n()).done;){var l=a.value;n+=l.value,r.push({key:l.key,value:n})}}catch(o){c.e(o)}finally{c.f()}return r}}}f=g(s)}var w=u.all();P(w,E);var y=w[0].key,k=function(e){return function(a){return a.value[e]||0}},O=o.lineChart(e);p?O.dimension(l).group(f,y,k(y)):O.dimension(l).group(f);var C=n.width/1440*475,D=n.width/1440*350;if(O.renderArea(!0).elasticY(!0).width(C).height(D).brushOn(!1).clipPadding(10).margins({left:40,top:10,right:10,bottom:20}).renderDataPoints({radius:2,fillOpacity:1}).xyTipsOn(!0).x(Object(F.scaleTime)().domain([new Date(2020,2,1),v()().add(1,"day")])).ordinalColors(E).xAxis().ticks(8).tickFormat((function(e){return v()(e).format("DD/MM")})),p){var j,x=Object(z.a)(w.slice(1));try{for(x.s();!(j=x.n()).done;){var N=j.value.key;O.stack(f,N,k(N))}}catch(A){x.e(A)}finally{x.f()}}return c({chart:O}),O},I=function(e){return r.a.createElement(N,{chartFunction:Y,title:"Cumulative",params:e.params})},T=function(e,a,t){var n,r,c=a.date;t.total?(n=c.groupAll(),r=function(e){return e}):(n=c.group(),r=function(e){return e.value});var l=o.numberDisplay(e);return l.valueAccessor(r).ordering((function(e){return e.key})).group(n),l},R=function(e){return r.a.createElement(N,{chartFunction:T,title:"",params:e.params})},B=function(e,a,t,n,r,c){var l,i;if(r.hasOwnProperty("chart")){var u=r.chart,s=n.width/1440*475,m=n.width/1440*350;return u.width(s).height(m),u}t.normalize?(l=a.dateN,i=a.provN):(l=a.date,i=a.prov);var d=l.group(),h=t.stacked,p=d;h&&(p=d.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1,e}),(function(e,a){return e[a.Prov]=(e[a.Prov]||0)-1,e}),(function(){return{}})));var f=i.group().all(),E=function(e){return function(a){return a.value[e]||0}},g=b();P(f,g);var w=o.lineChart(e),y=f[0].key;h?w.dimension(l).group(p,y,E(y)):w.dimension(l).group(p);var k=n.width/1440*475,O=n.width/1440*350;if(w.renderArea(!0).elasticY(!0).width(k).height(O).brushOn(!1).clipPadding(10).margins({left:40,top:10,right:10,bottom:20}).renderDataPoints({radius:2,fillOpacity:1}).ordinalColors(g).x(Object(F.scaleTime)().domain([new Date(2020,2,1),v()().add(1,"day")])).xAxis().ticks(5).tickFormat((function(e){return v()(e).format("DD/MM")})),h){var C,D=Object(z.a)(f.slice(1));try{for(D.s();!(C=D.n()).done;){var j=C.value.key;w.stack(p,j,E(j))}}catch(x){D.e(x)}finally{D.f()}}return c({chart:w}),w},q=function(e){return r.a.createElement(N,{chartFunction:B,title:"Daily",params:e.params})},J=function(e,a,t,n,r,c){var l;if(r.hasOwnProperty("chart")){var u=r.chart,s=n.width/1440*475,m=n.width/1440*350;return u.width(s).height(m),u}var d,h;t.normalize?(d=a.dateN,h=a.provN):(d=a.date,h=a.prov);var p,f=d.group(),E=b(),g=f.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1/D[a.Prov],e}),(function(e,a){return e[a.Prov]=e[a.Prov]-1/D[a.Prov],e}),(function(){return{}}));var w=(l=g,{all:function(){var e,a=l.all(),t={},n=[],r=Object(z.a)(a);try{for(r.s();!(e=r.n()).done;){for(var c=e.value,o=0,u=Object.entries(c.value);o<u.length;o++){var s=Object(i.a)(u[o],2),m=s[0],d=s[1];t[m]=(t[m]||0)+d}n.push({key:c.key,value:Object(S.a)({},t)})}}catch(h){r.e(h)}finally{r.f()}return n}});p=w;var y=h.group().all();P(y,E);y[0].key;var k=o.compositeChart(e),O=[];y.forEach((function(e,a){var t,n=e.key,r=E[a];O.push(o.lineChart(k).dimension(d).group(p,n,(t=n,function(e){return e.value[t]||0})).colors(r))}));var C=n.width/1440*475,j=n.width/1440*350;return k.elasticY(!0).width(C).height(j).brushOn(!1).clipPadding(10).margins({left:50,top:10,right:10,bottom:20}).x(Object(F.scaleTime)().domain([new Date(2020,2,1),v()().add(1,"day")])).compose(O),k.xAxis().ticks(5).tickFormat((function(e){return v()(e).format("DD/MM")})),c({chart:k}),k},W=function(e){return r.a.createElement(N,{chartFunction:J,params:e.params})},G=function(e){var a,t=r.a.useContext(E);"detail"===e.params.usedata?a=t.dimensions.date:"deaths"===e.params.usedata&&(a=t.dimensionsD.date);var c=a.group().all(),l=v.a.max(c.map((function(e){return e.key}))).format("D-MMM");return r.a.createElement(n.Fragment,null,l)},U=t(426),K=t(194),L=t(195),V=t(429),H=t(114),X=t(115),Q=t(116),$=t(117),Z=function(e){var a=[{menuItem:"Stacked",pane:r.a.createElement(U.a.Pane,{attached:"top",key:1},r.a.createElement(I,{params:{stacked:!0,usedata:"detail"}}))},{menuItem:"Total",pane:r.a.createElement(U.a.Pane,{attached:"top",key:2},r.a.createElement(I,{params:{stacked:!1,usedata:"detail"}}))}],t=[{menuItem:"Stacked",pane:r.a.createElement(U.a.Pane,{attached:"top",key:3},r.a.createElement(q,{params:{stacked:!0,usedata:"detail"}}))},{menuItem:"Total",pane:r.a.createElement(U.a.Pane,{attached:"top",key:4},r.a.createElement(q,{params:{stacked:!1,usedata:"detail"}}))}],n=r.a.createElement(K.a,null,r.a.createElement(K.a.Row,{columns:16},r.a.createElement(K.a.Column,{width:4},r.a.createElement(K.a,null,r.a.createElement(L.a,{centered:!0,columns:1},r.a.createElement(K.a.Column,{width:6},r.a.createElement(V.a,{centered:!0,size:"small"},r.a.createElement(H.a,null,r.a.createElement(R,{params:{usedata:"detail",total:!0}})),r.a.createElement(X.a,null,"Total cases"))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(V.a,{size:"small"},r.a.createElement(H.a,null,r.a.createElement(R,{params:{usedata:"detail",total:!1,date:!0}})),r.a.createElement(X.a,null,"New cases"),r.a.createElement(X.a,null,"On"," ",r.a.createElement(G,{params:{usedata:"detail"}}))))),r.a.createElement(K.a.Column,{width:16},r.a.createElement(Q.a,null,r.a.createElement(M,{params:{usedata:"detail"}}))))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(U.a,{menu:{secondary:!0,pointing:!0},panes:a,renderActiveOnly:!1})),r.a.createElement(K.a.Column,{width:6},r.a.createElement(U.a,{menu:{secondary:!0,pointing:!0},panes:t,renderActiveOnly:!1}))),r.a.createElement(K.a.Row,{columns:2},r.a.createElement(K.a.Column,null))),c=[{menuItem:"Stacked",pane:r.a.createElement(U.a.Pane,{attached:"top",key:11},r.a.createElement(I,{params:{stacked:!0,usedata:"deaths"}}))},{menuItem:"Total",pane:r.a.createElement(U.a.Pane,{attached:"top",key:12},r.a.createElement(I,{params:{stacked:!1,usedata:"deaths"}}))}],l=[{menuItem:"Stacked",pane:r.a.createElement(U.a.Pane,{attached:"top",key:13},r.a.createElement(q,{params:{stacked:!0,usedata:"deaths"}}))},{menuItem:"Total",pane:r.a.createElement(U.a.Pane,{attached:"top",key:14},r.a.createElement(q,{params:{stacked:!1,usedata:"deaths"}}))}],o=r.a.createElement(K.a,null,r.a.createElement(K.a.Row,{columns:16},r.a.createElement(K.a.Column,{width:4},r.a.createElement(K.a,null,r.a.createElement(L.a,{centered:!0,columns:3},r.a.createElement(K.a.Column,{width:6},r.a.createElement(V.a,{size:"small"},r.a.createElement(H.a,null,r.a.createElement(R,{params:{usedata:"deaths",total:!0}})),r.a.createElement(X.a,null,"Total casualties"))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(V.a,{size:"small"},r.a.createElement(H.a,null,r.a.createElement(R,{params:{usedata:"deaths",total:!1,date:!0}})),r.a.createElement(X.a,null,"New casualties"),r.a.createElement(X.a,null,"On"," ",r.a.createElement(G,{params:{usedata:"deaths"}}))))),r.a.createElement(K.a.Column,{width:16},r.a.createElement(Q.a,null,r.a.createElement(M,{params:{usedata:"deaths"}}))))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(U.a,{menu:{secondary:!0,pointing:!0},panes:c,renderActiveOnly:!1})),r.a.createElement(K.a.Column,{width:6},r.a.createElement(U.a,{menu:{secondary:!0,pointing:!0},panes:l,renderActiveOnly:!1}))),r.a.createElement(K.a.Row,{columns:2},r.a.createElement(K.a.Column,null))),i=r.a.createElement(K.a,null,r.a.createElement(L.a,{centered:!0},r.a.createElement(O.a,{as:"h2"},"CASES PER 1M")),r.a.createElement(K.a.Row,{centered:!0,columns:5},r.a.createElement(K.a.Column,{width:4},r.a.createElement(Q.a,null,r.a.createElement(M,{params:{usedata:"detail",normalize:!0}}))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(Q.a,null,r.a.createElement(W,{params:{usedata:"detail",normalize:!0}}))))),u=r.a.createElement(K.a,null,r.a.createElement(L.a,{centered:!0},r.a.createElement(O.a,{as:"h2"},"CASUALTIES PER 1M")),r.a.createElement(K.a.Row,{centered:!0,columns:5},r.a.createElement(K.a.Column,{width:4},r.a.createElement(Q.a,null,r.a.createElement(M,{params:{usedata:"deaths",normalize:!0}}))),r.a.createElement(K.a.Column,{width:6},r.a.createElement(Q.a,null,r.a.createElement(W,{params:{usedata:"deaths",normalize:!0}}))))),s=[{menuItem:"Positive cases",pane:r.a.createElement(U.a.Pane,{attached:"top",key:1},n)},{menuItem:"Casualties",pane:r.a.createElement(U.a.Pane,{attached:"top",key:2},o)},{menuItem:"Cases per million",pane:r.a.createElement(U.a.Pane,{attached:"top",key:3},i)},{menuItem:"Casualties per million",pane:r.a.createElement(U.a.Pane,{attached:"top",key:4},u)}];return r.a.createElement("div",null,r.a.createElement(g,null,r.a.createElement(Q.a,{color:"black",inverted:!0},r.a.createElement(O.a,{color:"yellow",id:"title",textAlign:"center"},r.a.createElement($.a,{name:"heartbeat"}),"Canada Covid-19 data visualization")),r.a.createElement(Q.a,null,r.a.createElement(U.a,{menu:{secondary:!0,pointing:!0},panes:s,renderActiveOnly:!1})),r.a.createElement(Q.a,{color:"orange"},"Data source:"," ",r.a.createElement("a",{href:"https://virihealth.com/"},"ViriHealth"))))};var _=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Z,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(_,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[210,1,2]]]);
//# sourceMappingURL=main.0973a20c.chunk.js.map
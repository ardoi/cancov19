(this.webpackJsonpcancov19=this.webpackJsonpcancov19||[]).push([[0],{171:function(e,a,t){e.exports=t(358)},176:function(e,a,t){},177:function(e,a,t){},358:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(33),c=t.n(l),o=(t(176),t(177),t(178),t(21)),i=t(42),u=t(141),m=t(142),s=t(158),d=t(160),f=(t(195),t(55)),h=t(18),p=t.n(h),E=t(57),v=r.a.createContext("CXContext"),g=function(e){Object(d.a)(t,e);var a=Object(s.a)(t);function t(){var e;Object(u.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(e=a.call.apply(a,[this].concat(r))).state={detailData:null,deathData:null,loading:!1,hasCF:!1},e}return Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;if(!this.state.hasCF&&!this.state.loading){this.setState({loading:!0}),Object(f.c)("https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Detail").then((function(a){a.forEach((function(e){e.Date=p()(e.Date+"-2020","D-MMM-YYYY")})),a=a.filter((function(e){return"RC"!==e.Prov})),e.cf=E(a);var t=JSON.parse(JSON.stringify(a));t.forEach((function(e){e.Date=p()(e.Date)})),e.cfn=E(t),e.setState({detailData:a})})).then((function(){return Object(f.c)("https://docs.google.com/spreadsheets/d/1C59nxtgcnwGyo6lgypsgN18duxmwWigjeVdKY58t0mU/gviz/tq?tqx=out:csv&sheet=Dth").then((function(a){a.forEach((function(e){e.Date=p()(e["Announced\n"]+"-2020","D-MMM-YYYY")})),a=a.filter((function(e){return"RC"!==e.Prov})),e.cfd=E(a);var t=JSON.parse(JSON.stringify(a));t.forEach((function(e){e.Date=p()(e.Date)})),e.cfdn=E(t),e.setState({loading:!1,hasCF:!0,deathData:a})}))}))}}},{key:"render",value:function(){return this.state.hasCF?r.a.createElement(v.Provider,{value:{cf:this.cf,cfd:this.cfd,cfn:this.cfn,cfdn:this.cfdn}},r.a.createElement("div",{ref:this.parent},this.props.children)):null}}]),t}(n.Component),y=t(143),k=t(159),w=t(364),C=function(e){var a=Object(y.css)({cursor:"pointer"});return r.a.createElement(k.a,Object.assign({},a,{onClick:function(){e.chart.filterAll(),o.redrawAll()}}),"reset")},O=function(e){var a,t=r.a.useContext(v),l=r.a.useState(null),c=Object(i.a)(l,2),o=c[0],u=c[1];"detail"===e.params.usedata?(a=t.cf,e.params.normalize&&(a=t.cfn)):"deaths"===e.params.usedata&&(a=t.cfd,e.params.normalize&&(a=t.cfdn));var m,s,d=r.a.useRef(null);return r.a.useEffect((function(){var t=e.chartFunction(d.current,a,e.params);t.render(),u(t)}),[e.params]),e.reset&&(m=r.a.createElement(C,{chart:o})),e.title&&(s=r.a.createElement(w.a,{as:"h3"},e.title,m)),r.a.createElement(n.Fragment,null,s,r.a.createElement("div",{ref:d}))},P=t(15),b=function(){return[[235,172,35],[184,0,88],[0,140,249],[0,110,0],[0,187,173],[209,99,230],[178,69,2],[255,146,135],[89,84,214],[0,198,248],[135,133,0],[0,167,108],[189,189,189]].map((function(e){return Object(P.g)(e[0],e[1],e[2]).darker().formatHex()}))},D=function(e,a){for(var t=[],n=0;n<e.length;n++)t.push({a1:e[n],a2:a[n]});t.sort((function(e,a){return e.a1.value-a.a1.value}));for(var r=0;r<t.length;r++)e[r]=t[r].a1,a[r]=t[r].a2},j={ON:14.71,QC:8.53,BC:5.11,AB:4.41,SK:1.18,NL:.52,NS:.98,MB:1.38,NB:.78,PE:.16,YT:.041,NT:.044,NU:.039},x=function(e,a,t){var n=a.dimension((function(e){return e.Prov})),r=n.group(),l=b(),c=r.all();D(c,l);var i=o.rowChart(e),u=t.normalize;return i.width(350).height(300).margins({top:10,right:50,bottom:30,left:40}).dimension(n).group(r).elasticX(!0).labelOffsetX(-25).valueAccessor((function(e){return u?e.value/j[e.key]:e.value})).ordinalColors(l.slice(0,Object.keys(c).length).reverse()),i.xAxis().ticks(5),i},A=function(e){return r.a.createElement(O,{chartFunction:x,title:"Province Totals",reset:!0,params:e.params})},M=t(70),S=t(31),N=t(9),z=function(e,a,t){var n=a.dimension((function(e){return e.Date})),r=n.group(),l=t.stacked,c=r,u=b();if(l){function m(e){return{all:function(){var a,t=e.all(),n={},r=[],l=Object(S.a)(t);try{for(l.s();!(a=l.n()).done;){for(var c=a.value,o=0,u=Object.entries(c.value);o<u.length;o++){var m=Object(i.a)(u[o],2),s=m[0],d=m[1];n[s]=(n[s]||0)+d}r.push({key:c.key,value:Object(M.a)({},n)})}}catch(f){l.e(f)}finally{l.f()}return r}}}c=m(r.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1,e}),(function(e,a){return e[a.Prov]=e[a.Prov]-1,e}),(function(){return{}})))}else{function m(e){return{all:function(){var a,t=e.all(),n=0,r=[],l=Object(S.a)(t);try{for(l.s();!(a=l.n()).done;){var c=a.value;n+=c.value,r.push({key:c.key,value:n})}}catch(o){l.e(o)}finally{l.f()}return r}}}c=m(r)}var s=a.dimension((function(e){return e.Prov})).group().all();D(s,u);var d=s[0].key,f=function(e){return function(a){return a.value[e]||0}},h=o.lineChart(e);if(l?h.dimension(n).group(c,d,f(d)):h.dimension(n).group(c),h.renderArea(!0).elasticY(!0).width(475).height(350).brushOn(!1).clipPadding(10).margins({left:50,top:10,right:10,bottom:20}).renderDataPoints({radius:2,fillOpacity:1}).xyTipsOn(!0).x(Object(N.scaleTime)().domain([new Date(2020,2,1),p()().add(1,"day")])).ordinalColors(u).xAxis().ticks(8).tickFormat((function(e){return p()(e).format("DD/MM")})),l){var E,v=Object(S.a)(s.slice(1));try{for(v.s();!(E=v.n()).done;){var g=E.value.key;h.stack(c,g,f(g))}}catch(y){v.e(y)}finally{v.f()}}return h},F=function(e){return r.a.createElement(O,{chartFunction:z,title:"Cumulative",params:e.params})},T=function(e,a,t){var n,r,l=a.dimension((function(e){return e.Date}));t.total?(n=l.groupAll(),r=function(e){return e}):(n=l.group(),r=function(e){return e.value});var c=o.numberDisplay(e);return c.valueAccessor(r).ordering((function(e){return e.key})).group(n),c},Y=function(e){return r.a.createElement(O,{chartFunction:T,title:"",params:e.params})},I=function(e,a,t){var n=a.dimension((function(e){return e.Date})),r=n.group(),l=t.stacked,c=r;l&&(c=r.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1,e}),(function(e,a){return e[a.Prov]=(e[a.Prov]||0)-1,e}),(function(){return{}})));var i=a.dimension((function(e){return e.Prov})).group().all(),u=function(e){return function(a){return a.value[e]||0}},m=b();D(i,m);var s=o.lineChart(e),d=i[0].key;if(l?s.dimension(n).group(c,d,u(d)):s.dimension(n).group(c),s.renderArea(!0).elasticY(!0).width(475).height(350).brushOn(!1).clipPadding(10).margins({left:50,top:10,right:10,bottom:20}).renderDataPoints({radius:2,fillOpacity:1}).ordinalColors(m).x(Object(N.scaleTime)().domain([new Date(2020,2,1),p()().add(1,"day")])).xAxis().ticks(5).tickFormat((function(e){return p()(e).format("DD/MM")})),l){var f,h=Object(S.a)(i.slice(1));try{for(h.s();!(f=h.n()).done;){var E=f.value.key;s.stack(c,E,u(E))}}catch(v){h.e(v)}finally{h.f()}}return s},R=function(e){return r.a.createElement(O,{chartFunction:I,title:"Daily",params:e.params})},B=function(e,a,t){var n,r=a.dimension((function(e){return e.Date})),l=r.group(),c=b(),u=l.reduce((function(e,a){return e[a.Prov]=(e[a.Prov]||0)+1/j[a.Prov],e}),(function(e,a){return e[a.Prov]=e[a.Prov]-1/j[a.Prov],e}),(function(){return{}}));var m,s=(m=u,{all:function(){var e,a=m.all(),t={},n=[],r=Object(S.a)(a);try{for(r.s();!(e=r.n()).done;){for(var l=e.value,c=0,o=Object.entries(l.value);c<o.length;c++){var u=Object(i.a)(o[c],2),s=u[0],d=u[1];t[s]=(t[s]||0)+d}n.push({key:l.key,value:Object(M.a)({},t)})}}catch(f){r.e(f)}finally{r.f()}return n}});n=s;var d=a.dimension((function(e){return e.Prov})).group().all();D(d,c);d[0].key;var f=o.compositeChart(e),h=[];return d.forEach((function(e,a){var t,l=e.key,i=c[a];h.push(o.lineChart(f).dimension(r).group(n,l,(t=l,function(e){return e.value[t]||0})).colors(i))})),f.elasticY(!0).width(475).height(350).brushOn(!1).clipPadding(10).margins({left:50,top:10,right:10,bottom:20}).x(Object(N.scaleTime)().domain([new Date(2020,2,1),p()().add(1,"day")])).compose(h),f.xAxis().ticks(5).tickFormat((function(e){return p()(e).format("DD/MM")})),f},J=function(e){return r.a.createElement(O,{chartFunction:B,params:e.params})},q=function(e){var a,t=r.a.useContext(v);"detail"===e.params.usedata?a=t.cf:"deaths"===e.params.usedata&&(a=t.cfd);var l=a.dimension((function(e){return e.Date})).group().all(),c=p.a.max(l.map((function(e){return e.key}))).format("D-MMM");return r.a.createElement(n.Fragment,null,c)},W=t(363),H=t(155),K=t(156),U=t(365),V=t(97),X=t(98),G=t(99),L=t(100),Q=function(e){var a=[{menuItem:"Stacked",pane:r.a.createElement(W.a.Pane,{attached:"top",key:1},r.a.createElement(F,{params:{stacked:!0,usedata:"detail"}}))},{menuItem:"Total",pane:r.a.createElement(W.a.Pane,{attached:"top",key:2},r.a.createElement(F,{params:{stacked:!1,usedata:"detail"}}))}],t=[{menuItem:"Stacked",pane:r.a.createElement(W.a.Pane,{attached:"top",key:3},r.a.createElement(R,{params:{stacked:!0,usedata:"detail"}}))},{menuItem:"Total",pane:r.a.createElement(W.a.Pane,{attached:"top",key:4},r.a.createElement(R,{params:{stacked:!1,usedata:"detail"}}))}],n=r.a.createElement(H.a,null,r.a.createElement(H.a.Row,{columns:16},r.a.createElement(H.a.Column,{width:4},r.a.createElement(H.a,null,r.a.createElement(K.a,{centered:!0},r.a.createElement(H.a.Column,{width:8},r.a.createElement(U.a,{size:"small"},r.a.createElement(V.a,null,r.a.createElement(Y,{params:{usedata:"detail",total:!0}})),r.a.createElement(X.a,null,"Total cases"))),r.a.createElement(H.a.Column,{width:8},r.a.createElement(U.a,{size:"small"},r.a.createElement(V.a,null,r.a.createElement(Y,{params:{usedata:"detail",total:!1,date:!0}})),r.a.createElement(X.a,null,"New cases"),r.a.createElement(X.a,null,"On"," ",r.a.createElement(q,{params:{usedata:"detail"}}))))),r.a.createElement(H.a.Column,{width:16},r.a.createElement(G.a,null,r.a.createElement(A,{params:{usedata:"detail"}}))))),r.a.createElement(H.a.Column,{width:6},r.a.createElement(W.a,{menu:{secondary:!0,pointing:!0},panes:a,renderActiveOnly:!1})),r.a.createElement(H.a.Column,{width:6},r.a.createElement(W.a,{menu:{secondary:!0,pointing:!0},panes:t,renderActiveOnly:!1}))),r.a.createElement(H.a.Row,{columns:2},r.a.createElement(H.a.Column,null))),l=[{menuItem:"Stacked",pane:r.a.createElement(W.a.Pane,{attached:"top",key:11},r.a.createElement(F,{params:{stacked:!0,usedata:"deaths"}}))},{menuItem:"Total",pane:r.a.createElement(W.a.Pane,{attached:"top",key:12},r.a.createElement(F,{params:{stacked:!1,usedata:"deaths"}}))}],c=[{menuItem:"Stacked",pane:r.a.createElement(W.a.Pane,{attached:"top",key:13},r.a.createElement(R,{params:{stacked:!0,usedata:"deaths"}}))},{menuItem:"Total",pane:r.a.createElement(W.a.Pane,{attached:"top",key:14},r.a.createElement(R,{params:{stacked:!1,usedata:"deaths"}}))}],o=r.a.createElement(H.a,null,r.a.createElement(H.a.Row,{columns:16},r.a.createElement(H.a.Column,{width:4},r.a.createElement(H.a,null,r.a.createElement(K.a,{centered:!0},r.a.createElement(H.a.Column,{width:8},r.a.createElement(U.a,{size:"small"},r.a.createElement(V.a,null,r.a.createElement(Y,{params:{usedata:"deaths",total:!0}})),r.a.createElement(X.a,null,"Total deaths"))),r.a.createElement(H.a.Column,{width:8},r.a.createElement(U.a,{size:"small"},r.a.createElement(V.a,null,r.a.createElement(Y,{params:{usedata:"deaths",total:!1,date:!0}})),r.a.createElement(X.a,null,"New deaths"),r.a.createElement(X.a,null,"On"," ",r.a.createElement(q,{params:{usedata:"deaths"}}))))),r.a.createElement(H.a.Column,{width:16},r.a.createElement(G.a,null,r.a.createElement(A,{params:{usedata:"deaths"}}))))),r.a.createElement(H.a.Column,{width:6},r.a.createElement(W.a,{menu:{secondary:!0,pointing:!0},panes:l,renderActiveOnly:!1})),r.a.createElement(H.a.Column,{width:6},r.a.createElement(W.a,{menu:{secondary:!0,pointing:!0},panes:c,renderActiveOnly:!1}))),r.a.createElement(H.a.Row,{columns:2},r.a.createElement(H.a.Column,null))),i=r.a.createElement(H.a,null,r.a.createElement(K.a,{centered:!0},r.a.createElement(w.a,{as:"h2"},"CASES PER 1M")),r.a.createElement(H.a.Row,{centered:!0,columns:5},r.a.createElement(H.a.Column,{width:4},r.a.createElement(G.a,null,r.a.createElement(A,{params:{usedata:"detail",normalize:!0}}))),r.a.createElement(H.a.Column,{width:6},r.a.createElement(G.a,null,r.a.createElement(J,{params:{usedata:"detail",normalize:!0}}))))),u=r.a.createElement(H.a,null,r.a.createElement(K.a,{centered:!0},r.a.createElement(w.a,{as:"h2"},"DEATHS PER 1M")),r.a.createElement(H.a.Row,{centered:!0,columns:5},r.a.createElement(H.a.Column,{width:4},r.a.createElement(G.a,null,r.a.createElement(A,{params:{usedata:"deaths",normalize:!0}}))),r.a.createElement(H.a.Column,{width:6},r.a.createElement(G.a,null,r.a.createElement(J,{params:{usedata:"deaths",normalize:!0}}))))),m=[{menuItem:"Positive cases",pane:r.a.createElement(W.a.Pane,{attached:"top",key:1},n)},{menuItem:"Deaths",pane:r.a.createElement(W.a.Pane,{attached:"top",key:2},o)},{menuItem:"Normalized - cases",pane:r.a.createElement(W.a.Pane,{attached:"top",key:3},i)},{menuItem:"Normalized - deaths",pane:r.a.createElement(W.a.Pane,{attached:"top",key:3},u)}];return r.a.createElement("div",null,r.a.createElement(g,null,r.a.createElement(G.a,{color:"black",inverted:!0},r.a.createElement(w.a,{color:"yellow",id:"title",textAlign:"center"},r.a.createElement(L.a,{name:"heartbeat"}),"Canada Covid-19 data visualization")),r.a.createElement(G.a,null,r.a.createElement(W.a,{menu:{secondary:!0,pointing:!0},panes:m,renderActiveOnly:!1})),r.a.createElement(G.a,{color:"orange"},"Data source:"," ",r.a.createElement("a",{href:"https://virihealth.com/"},"ViriHealth"))))};var $=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Q,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement($,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[171,1,2]]]);
//# sourceMappingURL=main.e5aaf524.chunk.js.map
(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[3],{120:function(t,e,n){"use strict";n.r(e),n.d(e,"getCLS",(function(){return y})),n.d(e,"getFCP",(function(){return g})),n.d(e,"getFID",(function(){return C})),n.d(e,"getLCP",(function(){return k})),n.d(e,"getTTFB",(function(){return D}));var i,r,a,o,u=function(t,e){return{name:t,value:void 0===e?-1:e,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},c=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){if("first-input"===t&&!("PerformanceEventTiming"in self))return;var n=new PerformanceObserver((function(t){return t.getEntries().map(e)}));return n.observe({type:t,buffered:!0}),n}}catch(t){}},s=function(t,e){var n=function n(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(t(i),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},f=function(t){addEventListener("pageshow",(function(e){e.persisted&&t(e)}),!0)},m=function(t,e,n){var i;return function(r){e.value>=0&&(r||n)&&(e.delta=e.value-(i||0),(e.delta||void 0===i)&&(i=e.value,t(e)))}},d=-1,v=function(){return"hidden"===document.visibilityState?0:1/0},p=function(){s((function(t){var e=t.timeStamp;d=e}),!0)},l=function(){return d<0&&(d=v(),p(),f((function(){setTimeout((function(){d=v(),p()}),0)}))),{get firstHiddenTime(){return d}}},g=function(t,e){var n,i=l(),r=u("FCP"),a=function(t){"first-contentful-paint"===t.name&&(s&&s.disconnect(),t.startTime<i.firstHiddenTime&&(r.value=t.startTime,r.entries.push(t),n(!0)))},o=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],s=o?null:c("paint",a);(o||s)&&(n=m(t,r,e),o&&a(o),f((function(i){r=u("FCP"),n=m(t,r,e),requestAnimationFrame((function(){requestAnimationFrame((function(){r.value=performance.now()-i.timeStamp,n(!0)}))}))})))},h=!1,T=-1,y=function(t,e){h||(g((function(t){T=t.value})),h=!0);var n,i=function(e){T>-1&&t(e)},r=u("CLS",0),a=0,o=[],d=function(t){if(!t.hadRecentInput){var e=o[0],i=o[o.length-1];a&&t.startTime-i.startTime<1e3&&t.startTime-e.startTime<5e3?(a+=t.value,o.push(t)):(a=t.value,o=[t]),a>r.value&&(r.value=a,r.entries=o,n())}},v=c("layout-shift",d);v&&(n=m(i,r,e),s((function(){v.takeRecords().map(d),n(!0)})),f((function(){a=0,T=-1,r=u("CLS",0),n=m(i,r,e)})))},E={passive:!0,capture:!0},w=new Date,L=function(t,e){i||(i=e,r=t,a=new Date,F(removeEventListener),S())},S=function(){if(r>=0&&r<a-w){var t={entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+r};o.forEach((function(e){e(t)})),o=[]}},b=function(t){if(t.cancelable){var e=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,e){var n=function(){L(t,e),r()},i=function(){r()},r=function(){removeEventListener("pointerup",n,E),removeEventListener("pointercancel",i,E)};addEventListener("pointerup",n,E),addEventListener("pointercancel",i,E)}(e,t):L(e,t)}},F=function(t){["mousedown","keydown","touchstart","pointerdown"].forEach((function(e){return t(e,b,E)}))},C=function(t,e){var n,a=l(),d=u("FID"),v=function(t){t.startTime<a.firstHiddenTime&&(d.value=t.processingStart-t.startTime,d.entries.push(t),n(!0))},p=c("first-input",v);n=m(t,d,e),p&&s((function(){p.takeRecords().map(v),p.disconnect()}),!0),p&&f((function(){var a;d=u("FID"),n=m(t,d,e),o=[],r=-1,i=null,F(addEventListener),a=v,o.push(a),S()}))},P={},k=function(t,e){var n,i=l(),r=u("LCP"),a=function(t){var e=t.startTime;e<i.firstHiddenTime&&(r.value=e,r.entries.push(t),n())},o=c("largest-contentful-paint",a);if(o){n=m(t,r,e);var d=function(){P[r.id]||(o.takeRecords().map(a),o.disconnect(),P[r.id]=!0,n(!0))};["keydown","click"].forEach((function(t){addEventListener(t,d,{once:!0,capture:!0})})),s(d,!0),f((function(i){r=u("LCP"),n=m(t,r,e),requestAnimationFrame((function(){requestAnimationFrame((function(){r.value=performance.now()-i.timeStamp,P[r.id]=!0,n(!0)}))}))}))}},D=function(t){var e,n=u("TTFB");e=function(){try{var e=performance.getEntriesByType("navigation")[0]||function(){var t=performance.timing,e={entryType:"navigation",startTime:0};for(var n in t)"navigationStart"!==n&&"toJSON"!==n&&(e[n]=Math.max(t[n]-t.navigationStart,0));return e}();if(n.value=n.delta=e.responseStart,n.value<0||n.value>performance.now())return;n.entries=[e],t(n)}catch(t){}},"complete"===document.readyState?setTimeout(e,0):addEventListener("load",(function(){return setTimeout(e,0)}))}}}]);
//# sourceMappingURL=3.3b239430.chunk.js.map
webpackJsonp([3],{ErLY:function(a,b,c){"use strict";function d(a,b,c){window.innerWidth>C?g(a,b,c):window.innerWidth>=B&&window.innerWidth<=C?h(a,b,c):e(a,c)}function e(a,b){a.click(function(a){var c=u(w()(a.target)),d=w()(".sub-bar");w()(".active").removeClass("active"),c.addClass("active"),f(c,b)&&a.preventDefault(),o(d)&&n(d,!0),setTimeout(function(){i(c,c,b,!0)},100)})}function f(a,b){var c=a.data("link"),d=b.get(c);return!!d&&0<d.length}function g(a,b,c){a.mouseenter(function(a){var d=u(w()(a.target)),e=w()(".sub-bar");o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,!1)},100)}),w()(document).mousemove(function(a){var b=w()(".sub-bar"),c=w()(a.target);c.is("i")&&(c=c.parent());var d=c.prop("class");"nav-link"==d&&(c=c.parent()),d=c.prop("class"),0<Array.from(b).length&&"main-bar"!=d&&"sub-bar"!=d&&n(b,!1)})}function h(a,b,c){a.click(function(a){var d=u(w()(a.target)),e=w()(".sub-bar");f(d,c)&&a.preventDefault(),o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,null)},100)})}function i(a,b,c,d){var e=j(a,c,d);k(b,e,function(a){null===d?l(a,55,!1):d?l(a,"auto",d):(m(a),l(a,55,d))})}function j(a,b,c){var d=a.data("link"),e=b.get(d);if(e&&0!=e.length){var f=p(d,e);return"<div class=\"sub-bar\">"+r(c,d)+s(f)+"</div>"}}function k(a,b,c){if(b){a.append(b);var d=setInterval(function(){var a=w()(".sub-bar");o(a)&&(clearInterval(d),c(a))},10)}}function l(a,b,d){var e=d?1e3:500,f=d?2:1,g=d?1:2;c.i(z.a)(a,1,e/f/1e3+"s"),c.i(z.d)(a,"height",b,e/g/1e3+"s",{transitionType:"linear"})}function m(a){a.mouseleave(function(a){var b=w()(a.target);b.is("div")&&n(w()(a.target))})}function n(a,b){var d=b?750:100;c.i(z.a)(a,0,d/1e3+"s"),c.i(z.d)(a,"height","0","1s",{transitionType:"linear"}),setTimeout(function(){w()(".sub-bar").remove()},d/1e3)}function o(a){return 0!=Array.from(a).length}function p(a,b){return b.map(function(b,c){return"<a href=\""+q(a,b)+"\" id=\"nav-link-"+(c+1)+"\" class=\"nav-link\"><i class=\"fa fa-paw nav-icon\" aria-hidden=\"true\"></i>"+b+"</a>"})}function q(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"/"+a+"/"+b}function r(a,b){if(a||null===a){var c=b;return b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"<a href=\""+b+"\" id=\"nav-link-"+0+"\" class=\"nav-link\"><i class=\"fa fa-paw nav-icon\" aria-hidden=\"true\"></i>"+c+"</a>"}return""}function s(a){return a.reduce(function(a,b){return a+b})}function t(a){var b=new Map;return a.forEach(function(a){b.set(a.link,a.subPaths)}),b}function u(a){return a.is("i")?a.parent():a}var v=c("7t+N"),w=c.n(v),x=c("IQVL"),y=c.n(x),z=c("MvGc"),A=[{link:"about",subPaths:["What We Do","People","Rescues","Sponsors"]},{link:"involvement",subPaths:["What We Do","People","Rescues"]},{link:"events",subPaths:["What We Do","People"]},{link:"resources",subPaths:["What We Do"]},{link:"contact",subPaths:[]}],B=768,C=1024;w()(document).ready(function(){var a=t(A),b=w()(".nav-link"),c=w()(".nav-bar");d(b,c,a),w()(window).resize(function(){w()(".active").removeClass("active"),w()(".sub-bar").remove(),b.unbind("click").unbind("mouseenter"),d(b,c,a)})})},Ey7U:function(a,b,c){"use strict";function d(a){return 0<=m()(window).scrollTop()&&m()(window).scrollTop()<=window.innerHeight&&c.i(n.d)(a,"color","rgb(255, 255, 255)","2s"),!0}function e(){var a=m()(".before").find("img"),b=m()(".after").find("img"),d=m()(window).scrollTop()+window.innerHeight;d>b.offset().top+b.height()&&(c.i(n.b)(b.parent(),"0px","2s"),c.i(n.a)(b.parent(),1,"2s")),d>a.offset().top+a.height()&&(c.i(n.a)(a.parent(),1,"2s"),c.i(n.b)(a.parent(),"0px","2s"))}function f(a,b,d){c.i(n.g)(d),c.i(n.f)(b),c.i(n.e)(a)}Object.defineProperty(b,"__esModule",{value:!0});var g=c("ErLY"),h=c("tkm6"),i=c.n(h),j=c("hcFs"),k=c.n(j),l=c("7t+N"),m=c.n(l),n=c("MvGc");m()(document).ready(function(){var a=m()(".animal-image"),b=m()(".site-title"),g=m()(".nav-bar"),h=!1;f(a,b,g),m()(window).scroll(function(){c.i(n.c)(g,window.innerHeight),e(),h||(h=d(b))}),m()(window).resize(function(){c.i(n.c)(g,window.innerHeight)})})},IQVL:function(){},MvGc:function(a,b,c){"use strict";function d(a){j(a,1,"2s"),k(a,"50px","2s")}function e(a){j(a,1,"0.5s")}function f(a){j(a,1,"2s")}function g(a,b){if(window.innerWidth>q){var c=b-a.height();p()(window).scrollTop()>c?a.css(r):a.css(s)}else a.css(s)}function h(a,b,c,d,e){var f="ease-in-out";e&&e.hasOwnProperty("transitionType")&&(f=e.transitionType);var g=m(a),h=n(b,d,f,"0s");i(g,h);var j={};j[b]=c,j.transition=l(g),p()(a).css(j)}function i(a,b){var c=!1;a.forEach(function(a){a.name==b.name&&(c=!0,a=b)}),c||a.push(b)}function j(a,b,c){h(a,"opacity",b,c)}function k(a,b,c){h(a,"transform","translateY("+b+")",c)}function l(a){var b=a.reduce(function(a,b){return a+(b.name+" "+b.duration+" "+b.effect+" "+b.delay+", ")},"");return b.substring(0,b.length-2)}function m(a){var b=p()(a).css("transition");"all 0s ease 0s"==b&&(b=[]),b&&0<b.length&&(b=b.split(", "));var c=b.map(function(a){return a=a.split(" "),n(a)});return c}function n(b){var c=b,a=Array.from(arguments);return 1<a.length&&(c=a),{name:c[0],duration:void 0===c[1]?"0s":c[1],effect:void 0===c[2]?"linear":c[2],delay:void 0===c[3]?"0s":c[3]}}c.d(b,"f",function(){return d}),c.d(b,"g",function(){return e}),c.d(b,"e",function(){return f}),c.d(b,"c",function(){return g}),c.d(b,"a",function(){return j}),c.d(b,"b",function(){return k}),c.d(b,"d",function(){return h});var o=c("7t+N"),p=c.n(o),q=780,r={position:"fixed","z-index":58008,top:55},s={position:"static"}},hcFs:function(){},tkm6:function(){}},["Ey7U"]);
//# sourceMappingURL=home.1820dc1e.js.map
webpackJsonp([8],{A6qm:function(){},ErLY:function(a,b,c){"use strict";function d(a,b,c){window.innerWidth>C?g(a,b,c):window.innerWidth>=B&&window.innerWidth<=C?h(a,b,c):e(a,c)}function e(a,b){a.click(function(a){var c=u(w()(a.target)),d=w()(".sub-bar");w()(".active").removeClass("active"),c.addClass("active"),f(c,b)&&a.preventDefault(),o(d)&&n(d,!0),setTimeout(function(){i(c,c,b,!0)},100)})}function f(a,b){var c=a.data("link"),d=b.get(c);return!!d&&0<d.length}function g(a,b,c){a.mouseenter(function(a){var d=u(w()(a.target)),e=w()(".sub-bar");o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,!1)},100)}),w()(document).mousemove(function(a){var b=w()(".sub-bar"),c=w()(a.target);c.is("i")&&(c=c.parent());var d=c.prop("class");"nav-link"==d&&(c=c.parent()),d=c.prop("class"),0<Array.from(b).length&&"main-bar"!=d&&"sub-bar"!=d&&n(b,!1)})}function h(a,b,c){a.click(function(a){var d=u(w()(a.target)),e=w()(".sub-bar");f(d,c)&&a.preventDefault(),o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,null)},100)})}function i(a,b,c,d){var e=j(a,c,d);k(b,e,function(a){null===d?l(a,40,!1):d?l(a,"auto",d):(m(a),l(a,40,d))})}function j(a,b,c){var d=a.data("link"),e=b.get(d);if(e&&0!=e.length){var f=p(d,e);return"<div class=\"sub-bar\">"+r(c,d)+s(f)+"</div>"}}function k(a,b,c){if(b){a.append(b);var d=setInterval(function(){var a=w()(".sub-bar");o(a)&&(clearInterval(d),c(a))},10)}}function l(a,b,d){var e=d?1e3:500,f=d?2:1,g=d?1:2;c.i(z.e)(a,1,e/f/1e3+"s"),c.i(z.f)(a,"height",b,e/g/1e3+"s",{transitionType:"linear"})}function m(a){a.mouseleave(function(a){var b=w()(a.target);b.is("div")&&n(w()(a.target))})}function n(a,b){var d=b?750:100;c.i(z.e)(a,0,d/1e3+"s"),c.i(z.f)(a,"height","0","1s",{transitionType:"linear"}),setTimeout(function(){w()(".sub-bar").remove()},d/1e3)}function o(a){return 0!=Array.from(a).length}function p(a,b){return b.map(function(b,c){return"<a href=\""+q(a,b)+"\" id=\"nav-link-"+(c+1)+"\" class=\"nav-link\"> "+b+"</a>"})}function q(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"../"+b}function r(a,b){if(a||null===a){var c=b;return b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"<a href=\"../"+b+"\" id=\"nav-link-"+0+"\" class=\"nav-link\"> "+c+"</a>"}return""}function s(a){return a.reduce(function(a,b){return a+b})}function t(a){var b=new Map;return a.forEach(function(a){b.set(a.link,a.subPaths)}),b}function u(a){return a.is("i")?a.parent():a}var v=c("7t+N"),w=c.n(v),x=c("IQVL"),y=c.n(x),z=c("MvGc"),A=[{link:"about",subPaths:["What We Do","People","Sponsors"]},{link:"involvement",subPaths:["Individual","Coorporate"]},{link:"resources",subPaths:["What We Do"]}],B=768,C=1024;w()(document).ready(function(){var a=t(A),b=w()(".nav-link"),c=w()(".nav-bar");d(b,c,a),w()(window).resize(function(){w()(".active").removeClass("active"),w()(".sub-bar").remove(),b.unbind("click").unbind("mouseenter"),d(b,c,a)})})},IQVL:function(){},MvGc:function(a,b,c){"use strict";function d(a){768<window.innerWidth?a.click(function(){var a="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+a+"/donate"}):a.click(function(){if("matrix(1, 0, 0, 1, 0, 0)"==a.css("transform")){var b="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+b+"/donate"}else i(a,"transform","translateX(0)","0.5s")})}function e(a){k(a,1,"2s"),l(a,"50px","2s")}function f(a){k(a,1,"0.5s")}function g(a){k(a,1,"2s")}function h(a,b){if(window.innerWidth>v){var c=b-a.height();r()(window).scrollTop()>c?a.css(w):a.css(x)}else a.css(x)}function i(a,b,c,d,e){var f="ease-in-out";e&&e.hasOwnProperty("transitionType")&&(f=e.transitionType);var g=n(a),h=o(b,d,f,"0s");j(g,h);var i={};i[b]=c,i.transition=m(g),r()(a).css(i)}function j(a,b){var c=!1;a.forEach(function(a){a.name==b.name&&(c=!0,a=b)}),c||a.push(b)}function k(a,b,c){i(a,"opacity",b,c)}function l(a,b,c){i(a,"transform","translateY("+b+")",c)}function m(a){var b=a.reduce(function(a,b){return a+(b.name+" "+b.duration+" "+b.effect+" "+b.delay+", ")},"");return b.substring(0,b.length-2)}function n(a){var b=r()(a).css("transition");b&&"all 0s ease 0s"!=b||(b=[]),b&&0<b.length&&(b=b.split(", "));var c=b.map(function(a){return a=a.split(" "),o(a)});return c}function o(b){var c=b,a=Array.from(arguments);return 1<a.length&&(c=a),{name:c[0],duration:void 0===c[1]?"0s":c[1],effect:void 0===c[2]?"linear":c[2],delay:void 0===c[3]?"0s":c[3]}}function p(a){t.a.get(u).then(function(a){return a.data}).then(function(a){return Array.from(r()(r()(a)[20]).find(".list-table").find("tbody").find("tr"))}).then(function(a){return a.reduce(function(a,b){var c=Array.from(r()(b).find("td"));return c.forEach(function(b){a.push(b)}),a},[])}).then(function(a){return a.filter(function(a){return 0<r()(a).children().length})}).then(function(a){return a.reduce(function(a,b){return a.push({name:r()(b).find(".list-animal-name").text(),species:r()(b).find(".list-anima-species").text(),sex:r()(b).find(".list-animal-sexSN").text(),breed:r()(b).find(".list-animal-breed").text(),age:r()(b).find(".list-animal-age").text(),img:r()(b).find("img").prop("src")}),a},[])}).then(function(b){a(b)})}c.d(b,"c",function(){return e}),c.d(b,"d",function(){return f}),c.d(b,"b",function(){return g}),c.d(b,"a",function(){return h}),c.d(b,"e",function(){return k}),c.d(b,"h",function(){return l}),c.d(b,"f",function(){return i}),c.d(b,"g",function(){return p});var q=c("7t+N"),r=c.n(q),s=c("mtWM"),t=c.n(s),u="https://crossorigin.me/http://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=All&sex=A&agegroup=All&onhold=A&orderby=ID&colnum=3&AuthKey=4blm62x1v45atcg3s05c1f5jclaov1j8p6n50d85jve44b6bp8",v=780,w={position:"fixed","z-index":58008,top:40},x={position:"static"};r()(document).ready(function(){var a=r()(".motley-donate-btn");d(a),r()(window).resize(function(){d(a)})})},tkm6:function(){},vNB9:function(a,b,c){"use strict";function d(a,b,d){c.i(l.b)(d),c.i(l.c)(a),c.i(l.d)(b)}Object.defineProperty(b,"__esModule",{value:!0});var e=c("ErLY"),f=c("tkm6"),g=c.n(f),h=c("A6qm"),i=c.n(h),j=c("7t+N"),k=c.n(j),l=c("MvGc"),m=window.innerHeight;k()(document).ready(function(){var a=k()(".site-title"),b=k()(".nav-bar"),e=k()(".animal-image");d(a,b,e),k()(window).scroll(function(){c.i(l.a)(b,m)}),k()(window).resize(function(){c.i(l.a)(b,m)})})}},["vNB9"]);
//# sourceMappingURL=individual.cc1d72a5.js.map
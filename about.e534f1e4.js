webpackJsonp([4],{ErLY:function(a,b,c){"use strict";function d(a,b,c){window.innerWidth>A?g(a,b,c):window.innerWidth>=z&&window.innerWidth<=A?h(a,b,c):e(a,c)}function e(a,b){a.click(function(a){var c=t(v()(a.target)),d=v()(".sub-bar");v()(".active").removeClass("active"),c.addClass("active"),f(c,b)&&a.preventDefault(),o(d)&&n(d,!0),setTimeout(function(){i(c,c,b,!0)},100)})}function f(a,b){var c=a.data("link"),d=b.get(c);return!!d&&0<d.length}function g(a,b,c){a.mouseenter(function(a){var d=t(v()(a.target)),e=v()(".sub-bar");o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,!1)},100)}),v()(document).mousemove(function(a){var b=v()(".sub-bar"),c=v()(a.target);c.is("i")&&(c=c.parent());var d=c.prop("class");"nav-link"==d&&(c=c.parent()),d=c.prop("class"),0<Array.from(b).length&&"main-bar"!=d&&"sub-bar"!=d&&n(b,!1)})}function h(a,b,c){a.click(function(a){var d=t(v()(a.target)),e=v()(".sub-bar");f(d,c)&&a.preventDefault(),o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,null)},100)})}function i(a,b,c,d){var e=j(a,c,d);k(b,e,function(a){null===d?l(a,40,!1):d?l(a,"auto",d):(m(a),l(a,40,d))})}function j(a,b,c){var d=a.data("link"),e=b.get(d);if(e&&0!=e.length){var f=p(d,e);return"<div class=\"sub-bar\">"+r(c,d)+s(f)+"</div>"}}function k(a,b,c){if(b){a.append(b);var d=setInterval(function(){var a=v()(".sub-bar");o(a)&&(clearInterval(d),c(a))},10)}}function l(a,b,d){var e=d?1e3:500,f=d?2:1,g=d?1:2;c.i(y.e)(a,1,e/f/1e3+"s"),c.i(y.f)(a,"height",b,e/g/1e3+"s",{transitionType:"linear"})}function m(a){a.mouseleave(function(a){var b=v()(a.target);b.is("div")&&n(v()(a.target))})}function n(a,b){var d=b?750:100;c.i(y.e)(a,0,d/1e3+"s"),c.i(y.f)(a,"height","0","1s",{transitionType:"linear"}),setTimeout(function(){v()(".sub-bar").remove()},d/1e3)}function o(a){return 0!=Array.from(a).length}function p(a,b){return b.map(function(b,c){return"<a href=\"../"+q(a,b)+"\" id=\"nav-link-"+(c+1)+"\" class=\"nav-link\"> "+b+"</a>"})}function q(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),""+b}function r(a,b){if(a||null===a){var c=b;return b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"<a href=\"../"+b+"\" id=\"nav-link-"+0+"\" class=\"nav-link\"> "+c+"</a>"}return""}function s(a){return a.reduce(function(a,b){return a+b})}function t(a){return a.is("i")?a.parent():a}var u=c("7t+N"),v=c.n(u),w=c("IQVL"),x=c.n(w),y=c("MvGc"),z=768,A=1024,B=function(a){var b=new Map;return a.forEach(function(a){b.set(a.link,a.subPaths)}),b}([{link:"about",subPaths:["What We Do","Sponsors","Pets"]},{link:"involvement",subPaths:["Individual","Coorporate"]},{link:"resources",subPaths:["What We Do"]}]),C=v()(".nav-link"),D=v()(".nav-bar");d(C,D,B),v()(window).resize(function(){v()(".active").removeClass("active"),v()(".sub-bar").remove(),C.unbind("click").unbind("mouseenter"),d(C,D,B)})},IQVL:function(){},LB3k:function(){},MvGc:function(a,b,c){"use strict";function d(a){768<window.innerWidth?a.click(function(){var a="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+a+"/donate"}):a.click(function(){if("matrix(1, 0, 0, 1, 0, 0)"==a.css("transform")){var b="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+b+"/donate"}else i(a,"transform","translateX(0)","0.5s")})}function e(a){k(a,1,"2s"),l(a,"50px","2s")}function f(a){k(a,1,"0.5s")}function g(a){k(a,1,"2s")}function h(a,b){if(window.innerWidth>v){var c=b-a.height();r()(window).scrollTop()>c?a.css(w):a.css(x)}else a.css(x)}function i(a,b,c,d,e){var f="ease-in-out";e&&e.hasOwnProperty("transitionType")&&(f=e.transitionType);var g=n(a),h=o(b,d,f,"0s");j(g,h);var i={};i[b]=c,i.transition=m(g),r()(a).css(i)}function j(a,b){var c=!1;a.forEach(function(a){a.name==b.name&&(c=!0,a=b)}),c||a.push(b)}function k(a,b,c){i(a,"opacity",b,c)}function l(a,b,c){i(a,"transform","translateY("+b+")",c)}function m(a){var b=a.reduce(function(a,b){return a+(b.name+" "+b.duration+" "+b.effect+" "+b.delay+", ")},"");return b.substring(0,b.length-2)}function n(a){var b=r()(a).css("transition");b&&"all 0s ease 0s"!=b||(b=[]),b&&0<b.length&&(b=b.split(", "));var c=b.map(function(a){return a=a.split(" "),o(a)});return c}function o(b){var c=b,a=Array.from(arguments);return 1<a.length&&(c=a),{name:c[0],duration:void 0===c[1]?"0s":c[1],effect:void 0===c[2]?"linear":c[2],delay:void 0===c[3]?"0s":c[3]}}function p(a){t.a.get(u).then(function(a){return a.data}).then(function(a){return Array.from(r()(r()(a)[20]).find(".list-table").find("tbody").find("tr"))}).then(function(a){return a.reduce(function(a,b){var c=Array.from(r()(b).find("td"));return c.forEach(function(b){a.push(b)}),a},[])}).then(function(a){return a.filter(function(a){return 0<r()(a).children().length})}).then(function(a){return a.reduce(function(a,b){return a.push({name:r()(b).find(".list-animal-name").text(),species:r()(b).find(".list-anima-species").text(),sex:r()(b).find(".list-animal-sexSN").text(),breed:r()(b).find(".list-animal-breed").text(),age:r()(b).find(".list-animal-age").text(),img:r()(b).find("img").prop("src")}),a},[])}).then(function(b){a(b)})}c.d(b,"c",function(){return e}),c.d(b,"d",function(){return f}),c.d(b,"b",function(){return g}),c.d(b,"a",function(){return h}),c.d(b,"e",function(){return k}),c.d(b,"h",function(){return l}),c.d(b,"f",function(){return i}),c.d(b,"g",function(){return p});var q=c("7t+N"),r=c.n(q),s=c("mtWM"),t=c.n(s),u="https://crossorigin.me/http://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=All&sex=A&agegroup=All&onhold=A&orderby=ID&colnum=3&AuthKey=4blm62x1v45atcg3s05c1f5jclaov1j8p6n50d85jve44b6bp8",v=780,w={position:"fixed","z-index":58008,top:40},x={position:"static"},y=r()(".motley-donate-btn");d(y),r()(window).resize(function(){d(y)})},tkm6:function(){},x5KR:function(a,b,c){"use strict";function d(a){console.log(u()(a+"-modal"),a+"-modal"),u()("#"+a+"-modal").show()}function e(a){return 0<=u()(window).scrollTop()&&u()(window).scrollTop()<=window.innerHeight&&c.i(x.f)(a,"color","rgb(255, 255, 255)","2s"),!0}function f(a){960<window.innerWidth?h(a):g(a)}function g(a){a.click(function(a){var b=u()(a.target).find(".overlay");if("sponsor"==u()(a.target).prop("class")){var c=Array.from(u()(".overlay"));c.forEach(function(a){j({target:u()(a)})}),k(a),b.data("clicked","true")}else i(a)})}function h(a){a.mouseenter(k),a.mouseleave(j),a.click(i)}function i(a){for(var b=u()(a.target);"sponsor"!=b.prop("class");)b=b.parent();var c=b.data("link");window.location.href=c}function j(a){var b=u()(a.target),d=b.prop("class");return"sponsor"==d?b=u()(a.target).find(".overlay"):"overlay"!=d&&(b=u()(a.target).parent()),b.hide(),c.i(x.e)(b,0,"0.5s"),c.i(x.f)(b,"margin-top","0px","0.5s"),b}function k(a){var b=u()(a.target).find(".overlay");b.is("p")&&(b=b.parent()),b.show(),c.i(x.e)(b,1,"0.5s"),c.i(x.f)(b,"margin-top",-b.height(),"0.5s")}function l(a,b,c,d){var e=a.offset().top,f=a.height();if(b>e+f/A){var g=Array.from(u()(c));g.forEach(function(a){d(a)})}}function m(a){var b=Array.from(a);b.forEach(function(a){var b=u()(a).css("background-image").substring(5,u()(a).css("background-image").length-2),c=new Image;c.src=b,u()(c).one("load",function(){var b=c.width,d=c.height;u()(a).css({"padding-top":d/b*u()(a).width()}),u()(a).find(".overlay").css({height:d/b*u()(a).width()})})})}function n(a){var b=Array.from(a.children());b=b.slice(0,-1),b.forEach(function(a){u()(a).click(function(a){for(var b=u()(a.target);"video"!=b.prop("class");)b=b.parent();var c=b.data("id"),d=b.find(".thumbnail"),e=d.height(),f=d.width();d.remove(),b.find(".icon").remove(),b.append("<iframe style=\"background-color: black\" height=\""+e+"\" width=\""+f+"\" src=\"https://www.youtube.com/embed/"+c+"?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe>")})})}Object.defineProperty(b,"__esModule",{value:!0});var o=c("ErLY"),p=c("tkm6"),q=c.n(p),r=c("LB3k"),s=c.n(r),t=c("7t+N"),u=c.n(t),v=c("mtWM"),w=c.n(v),x=c("MvGc"),y=function(){function a(a,b){var c,d=[],e=!0,f=!1;try{for(var g,h=a[Symbol.iterator]();!(e=(g=h.next()).done)&&(d.push(g.value),!(b&&d.length===b));e=!0);}catch(a){f=!0,c=a}finally{try{!e&&h["return"]&&h["return"]()}finally{if(f)throw c}}return d}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),z=window.innerHeight,A=4,B=u()(".site-title"),C=u()(".nav-bar"),D=u()(".animal-image"),E=u()(".our-people"),F=u()(".employee"),G=u()(".close"),H=u()(".sponsors-container"),I=u()(".sponsor"),J=u()(".video-container"),K=u()(".livestream-container"),L=u()(".flex-btns"),M=!1;(function(a,b,d){c.i(x.b)(d),c.i(x.c)(a),c.i(x.d)(b)})(B,C,D),f(I),function(a,b,c){var d=Array.from(a.children()),e=y(d,2),f=e[0],g=e[1];u()(f).click(function(){u()(g).removeClass("active"),u()(f).addClass("active"),c.slideUp(500),setTimeout(function(){b.slideDown(500)},500)}),u()(g).click(function(){u()(f).removeClass("active"),u()(g).addClass("active"),b.slideUp(500),setTimeout(function(){c.slideDown(500)},500)})}(L,J,K),function(a,b){w.a.get("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=UCvou9yaekveOZsyzGQljrNA&maxResults=8&key=AIzaSyB3Z7lmRzaqRwPzoVtzks2ZaSQKABmMGQM").then(function(a){return a.data}).then(function(a){return a.items.reduce(function(a,b){return a.push({id:b.id.videoId,title:b.snippet.title,thumbnail:b.snippet.thumbnails.high.url}),a},[])}).then(function(c){var d=c.reduce(function(a,b,c){return a+("<div data-id=\""+b.id+"\" id=\"video-"+(c+1)+"\" class=\"video\">")+("<h6 class=\"title\">"+b.title+"</h6>")+("<img src=\""+b.thumbnail+"\" class=\"thumbnail\"/><img src=\"../public/imgs/youtube.svg\" alt=\"play icon\" class=\"icon\"/></div>")},"");d+="<div class=\"btn-container\"><a href=\"../pets\" class=\"motley-btn-main\">See All Pets</a></div>",a.append(d);var e=setInterval(function(){0<Array.from(a.children()).length&&(clearInterval(e),n(a),b())},10)})}(J,function(){u()(window).scroll(function(){var a=u()(window).scrollTop()+window.innerHeight;l(E,a,".employee",function(a){c.i(x.e)(a,1,"1s"),c.i(x.h)(a,"50px","1.5s")})})}),u()(window).scroll(function(){var a=u()(window).scrollTop()+window.innerHeight;c.i(x.a)(C,z),l(H,a,".sponsor",function(a){c.i(x.e)(a,1,"1s")}),M||(M=e(B))}),u()(window).resize(function(){c.i(x.a)(C,z),m(I),f(I)}),u()(document).ready(function(){m(I)}),F.click(function(a){var b=a.target;"employee"!=u()(a.target).prop("class")&&(b=u()(a.target).parent()),d(u()(b).prop("id"))}),G.click(function(){u()(".employee-modal").hide()})}},["x5KR"]);
//# sourceMappingURL=about.e534f1e4.js.map
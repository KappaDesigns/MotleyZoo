webpackJsonp([3],{ErLY:function(a,b,c){"use strict";function d(a,b,c){window.innerWidth>A?g(a,b,c):window.innerWidth>=z&&window.innerWidth<=A?h(a,b,c):e(a,c)}function e(a,b){a.click(function(a){var c=t(v()(a.target)),d=v()(".sub-bar");v()(".active").removeClass("active"),c.addClass("active"),f(c,b)&&a.preventDefault(),o(d)&&n(d,!0),setTimeout(function(){i(c,c,b,!0)},100)})}function f(a,b){var c=a.data("link"),d=b.get(c);return!!d&&0<d.length}function g(a,b,c){a.mouseenter(function(a){var d=t(v()(a.target)),e=v()(".sub-bar");o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,!1)},100)}),v()(document).mousemove(function(a){var b=v()(".sub-bar"),c=v()(a.target);c.is("i")&&(c=c.parent());var d=c.prop("class");"nav-link"==d&&(c=c.parent()),d=c.prop("class"),0<Array.from(b).length&&"main-bar"!=d&&"sub-bar"!=d&&n(b,!1)})}function h(a,b,c){a.click(function(a){var d=t(v()(a.target)),e=v()(".sub-bar");f(d,c)&&a.preventDefault(),o(e)&&n(e,!1),setTimeout(function(){i(d,b,c,null)},100)})}function i(a,b,c,d){var e=j(a,c,d);k(b,e,function(a){null===d?l(a,40,!1):d?l(a,"auto",d):(m(a),l(a,40,d))})}function j(a,b,c){var d=a.data("link"),e=b.get(d);if(e&&0!=e.length){var f=p(d,e);return"<div class=\"sub-bar\">"+r(c,d)+s(f)+"</div>"}}function k(a,b,c){if(b){a.append(b);var d=setInterval(function(){var a=v()(".sub-bar");o(a)&&(clearInterval(d),c(a))},10)}}function l(a,b,d){var e=d?1e3:500,f=d?2:1,g=d?1:2;c.i(y.f)(a,1,e/f/1e3+"s"),c.i(y.g)(a,"height",b,e/g/1e3+"s",{transitionType:"linear"})}function m(a){a.mouseleave(function(a){var b=v()(a.target);b.is("div")&&n(v()(a.target))})}function n(a,b){var d=b?750:100;c.i(y.f)(a,0,d/1e3+"s"),c.i(y.g)(a,"height","0","1s",{transitionType:"linear"}),setTimeout(function(){v()(".sub-bar").remove()},d/1e3)}function o(a){return 0!=Array.from(a).length}function p(a,b){return b.map(function(b,c){return"<a href=\"../"+q(a,b)+"\" id=\"nav-link-"+(c+1)+"\" class=\"nav-link\"> "+b+"</a>"})}function q(a,b){return a=a.toLowerCase(),b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),""+b}function r(a,b){if(a||null===a){var c=b;return b=b.toLowerCase(),b=b.replace(/\s+/g,"-"),"<a href=\"../"+b+"\" id=\"nav-link-"+0+"\" class=\"nav-link\"> "+c+"</a>"}return""}function s(a){return a.reduce(function(a,b){return a+b})}function t(a){return a.is("i")?a.parent():a}var u=c("7t+N"),v=c.n(u),w=c("IQVL"),x=c.n(w),y=c("MvGc"),z=768,A=1024,B=function(a){var b=new Map;return a.forEach(function(a){b.set(a.link,a.subPaths)}),b}([{link:"about",subPaths:["What We Do","Sponsors","Pets"]},{link:"involvement",subPaths:["Individual","Coorporate"]}]),C=v()(".nav-link"),D=v()(".nav-bar");d(C,D,B),v()(window).resize(function(){v()(".active").removeClass("active"),v()(".sub-bar").remove(),C.unbind("click").unbind("mouseenter"),d(C,D,B)})},Ey7U:function(a,b,c){"use strict";function d(a){return 0<=l()(window).scrollTop()&&l()(window).scrollTop()<=window.innerHeight&&c.i(m.g)(a,"color","rgb(255, 255, 255)","2s"),!0}function e(){var a=l()(".before").find("img"),b=l()(".after").find("img"),d=l()(window).scrollTop()+window.innerHeight;d>(b.offset().top+b.height())/2&&(c.i(m.h)(b.parent(),"0px","2s"),c.i(m.f)(b.parent(),1,"2s")),d>(a.offset().top+a.height())/2&&(c.i(m.f)(a.parent(),1,"2s"),c.i(m.h)(a.parent(),"0px","2s"))}Object.defineProperty(b,"__esModule",{value:!0});var f=c("ErLY"),g=c("tkm6"),h=c.n(g),i=c("hcFs"),j=c.n(i),k=c("7t+N"),l=c.n(k),m=c("MvGc"),n=l()(".animal-image"),o=l()(".site-title"),p=l()(".nav-bar"),q=!1;(function(a,b,d){c.i(m.e)(d),c.i(m.d)(b),c.i(m.c)(a)})(n,o,p),l()(window).scroll(function(){c.i(m.b)(p,window.innerHeight),e(),q||(q=d(o))}),l()(window).resize(function(){c.i(m.b)(p,window.innerHeight)})},IQVL:function(){},MvGc:function(a,b,c){"use strict";function d(a){768<window.innerWidth?a.click(function(){var a="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+a+"/donate"}):a.click(function(){if("matrix(1, 0, 0, 1, 0, 0)"==a.css("transform")){var b="MotleyZoo"==window.location.pathname.split("/")[2]?window.location.host+"/MotleyZoo":window.location.host;window.location.href="http://"+b+"/donate"}else i(a,"transform","translateX(0)","0.5s")})}function e(a){k(a,1,"2s"),l(a,"50px","2s")}function f(a){k(a,1,"0.5s")}function g(a){k(a,1,"2s")}function h(a,b){if(window.innerWidth>w){var c=b-a.height();r()(window).scrollTop()>c?a.css(x):a.css(y)}else a.css(y)}function i(a,b,c,d,e){var f="ease-in-out";e&&e.hasOwnProperty("transitionType")&&(f=e.transitionType);var g=n(a),h=o(b,d,f,"0s");j(g,h);var i={};i[b]=c,i.transition=m(g),r()(a).css(i)}function j(a,b){var c=!1;a.forEach(function(a){a.name==b.name&&(c=!0,a=b)}),c||a.push(b)}function k(a,b,c){i(a,"opacity",b,c)}function l(a,b,c){i(a,"transform","translateY("+b+")",c)}function m(a){var b=a.reduce(function(a,b){return a+(b.name+" "+b.duration+" "+b.effect+" "+b.delay+", ")},"");return b.substring(0,b.length-2)}function n(a){var b=r()(a).css("transition");b&&"all 0s ease 0s"!=b||(b=[]),b&&0<b.length&&(b=b.split(", "));var c=b.map(function(a){return a=a.split(" "),o(a)});return c}function o(b){var c=b,a=Array.from(arguments);return 1<a.length&&(c=a),{name:c[0],duration:void 0===c[1]?"0s":c[1],effect:void 0===c[2]?"linear":c[2],delay:void 0===c[3]?"0s":c[3]}}function p(a){t.a.post(u,v).then(function(b){var c=[];for(var d in b.data.data)c.push(b.data.data[d]);return a(c)})}c.d(b,"d",function(){return e}),c.d(b,"e",function(){return f}),c.d(b,"c",function(){return g}),c.d(b,"b",function(){return h}),c.d(b,"f",function(){return k}),c.d(b,"h",function(){return l}),c.d(b,"g",function(){return i}),c.d(b,"a",function(){return p});var q=c("7t+N"),r=c.n(q),s=c("mtWM"),t=c.n(s),u="https://api.rescuegroups.org/http/",v="{\"apikey\":\""+"punkDGhl"+"\",\"objectType\":\"animals\",\"objectAction\":\"publicSearch\",\"search\":{\"resultStart\": \"0\", \"resultLimit\": \"100\", \"resultSort\": \"animalID\",\"resultOrder\": \"desc\",\"filters\":[{\"fieldName\": \"animalStatus\",\"operation\": \"equals\",\"criteria\": \"Available\"},{\"fieldName\": \"animalOrgID\", \"operation\": \"equals\", \"criteria\":\"4850\"}],\"fields\":[\"animalID\",\"animalOrgID\",\"animalActivityLevel\",\"animalAdoptedDate\",\"animalAdoptionFee\",\"animalAgeString\",\"animalAltered\",\"animalAvailableDate\",\"animalBirthdate\",\"animalBirthdateExact\",\"animalBreed\",\"animalCoatLength\",\"animalColor\",\"animalColorID\",\"animalColorDetails\",\"animalCourtesy\",\"animalDeclawed\",\"animalDescription\",\"animalDescriptionPlain\",\"animalDistinguishingMarks\",\"animalEarType\",\"animalEnergyLevel\",\"animalExerciseNeeds\",\"animalEyeColor\",\"animalFence\",\"animalFound\",\"animalFoundDate\",\"animalFoundPostalcode\",\"animalGeneralAge\",\"animalGeneralSizePotential\",\"animalGroomingNeeds\",\"animalHousetrained\",\"animalIndoorOutdoor\",\"animalKillDate\",\"animalKillReason\",\"animalLocation\",\"animalLocationCoordinates\",\"animalLocationDistance\",\"animalLocationCitystate\",\"animalMicrochipped\",\"animalMixedBreed\",\"animalName\",\"animalSpecialneeds\",\"animalSpecialneedsDescription\",\"animalNeedsFoster\",\"animalNewPeople\",\"animalNotHousetrainedReason\",\"animalObedienceTraining\",\"animalOKWithAdults\",\"animalOKWithCats\",\"animalOKWithDogs\",\"animalOKWithKids\",\"animalOwnerExperience\",\"animalPattern\",\"animalPatternID\",\"animalAdoptionPending\",\"animalPrimaryBreed\",\"animalPrimaryBreedID\",\"animalRescueID\",\"animalSearchString\",\"animalSecondaryBreed\",\"animalSecondaryBreedID\",\"animalSex\",\"animalShedding\",\"animalSizeCurrent\",\"animalSizePotential\",\"animalSizeUOM\",\"animalSpecies\",\"animalSpeciesID\",\"animalSponsorable\",\"animalSponsors\",\"animalSponsorshipDetails\",\"animalSponsorshipMinimum\",\"animalStatus\",\"animalStatusID\",\"animalSummary\",\"animalTailType\",\"animalThumbnailUrl\",\"animalUptodate\",\"animalUpdatedDate\",\"animalUrl\",\"animalVocal\",\"animalYardRequired\",\"animalAffectionate\",\"animalApartment\",\"animalCratetrained\",\"animalDrools\",\"animalEagerToPlease\",\"animalEscapes\",\"animalEventempered\",\"animalFetches\",\"animalGentle\",\"animalGoodInCar\",\"animalGoofy\",\"animalHasAllergies\",\"animalHearingImpaired\",\"animalHypoallergenic\",\"animalIndependent\",\"animalIntelligent\",\"animalLap\",\"animalLeashtrained\",\"animalNeedsCompanionAnimal\",\"animalNoCold\",\"animalNoFemaleDogs\",\"animalNoHeat\",\"animalNoLargeDogs\",\"animalNoMaleDogs\",\"animalNoSmallDogs\",\"animalObedient\",\"animalOKForSeniors\",\"animalOKWithFarmAnimals\",\"animalOlderKidsOnly\",\"animalOngoingMedical\",\"animalPlayful\",\"animalPlaysToys\",\"animalPredatory\",\"animalProtective\",\"animalSightImpaired\",\"animalSkittish\",\"animalSpecialDiet\",\"animalSwims\",\"animalTimid\",\"fosterEmail\",\"fosterFirstname\",\"fosterLastname\",\"fosterName\",\"fosterPhoneCell\",\"fosterPhoneHome\",\"fosterSalutation\",\"locationAddress\",\"locationCity\",\"locationCountry\",\"locationUrl\",\"locationName\",\"locationPhone\",\"locationState\",\"locationPostalcode\",\"animalPictures\",\"animalVideos\",\"animalVideoUrls\"]}}",w=780,x={position:"fixed","z-index":58008,top:40},y={position:"static"},z=r()(".motley-donate-btn");d(z),r()(window).resize(function(){d(z)})},hcFs:function(){},tkm6:function(){}},["Ey7U"]);
//# sourceMappingURL=home.e3e7e3e4.js.map
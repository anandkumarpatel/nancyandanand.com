(this.webpackJsonpwedding=this.webpackJsonpwedding||[]).push([[0],{227:function(e,t,a){e.exports=a(488)},232:function(e,t,a){},236:function(e,t,a){e.exports=a.p+"static/media/right-png.0326a5b7.png"},248:function(e,t,a){e.exports=a.p+"static/media/curtain-l.ccba0843.jpg"},249:function(e,t,a){e.exports=a.p+"static/media/curtain-r.0bfa1359.jpg"},250:function(e,t,a){},278:function(e,t){},280:function(e,t){},291:function(e,t){},293:function(e,t){},318:function(e,t){},320:function(e,t){},321:function(e,t){},327:function(e,t){},329:function(e,t){},348:function(e,t){},360:function(e,t){},363:function(e,t){},368:function(e,t){},370:function(e,t){},393:function(e,t){},488:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(57),l=a.n(r),s=(a(232),a(17)),o=a(18),c=a(26),m=a(20),d=a(19),u=a(42),h=a(72),v=a(45),p=a(490),g=a(221),f=a(46),E=[{name:"Sonesta Select Atlanta Midtown Georgia Tech",link:"https://gc.synxis.com/rez.aspx?Hotel=32565&Chain=5157&group=2104PATELW_001",img:"https://res.cloudinary.com/sonesta/image/fetch/c_crop,x_0,y_242,w_1920,h_801,q_auto:good,f_auto,fl_force_strip.lossy.progressive/c_scale,w_1920/https%3A%2F%2Fwww.sonesta.com%2Fsites%2Fdefault%2Ffiles%2Fatlmn-low%2520res%2Fatlmn-low%2520res%2Fatlmn-king-guestroom_web.jpg"}],y=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=function(t){var a=t.name,n=t.link,r=t.img,l=i.a.createElement(i.a.Fragment,null,i.a.createElement(f.a.Text,null,"Use the link below to make a reservation in our room block before March 18, 2021.",i.a.createElement("br",null),"1132 Techwood Drive NW, Atlanta, GA 30318"),i.a.createElement(f.a.Link,{href:n},"Book Here"));return e.props.flags.paid&&(l=i.a.createElement(i.a.Fragment,null,i.a.createElement(f.a.Text,null,"We have taken care of your room here and will give you room details shortly."))),i.a.createElement(f.a,{key:a,bg:"dark",text:"white"},i.a.createElement(f.a.Img,{variant:"top",src:r}),i.a.createElement(f.a.Body,null,i.a.createElement(f.a.Title,null,a),l))};return"CM"!==e.props.hotel.name?null:i.a.createElement("div",{className:"section hotel pink"},i.a.createElement(u.a,null,i.a.createElement("h1",null," Hotels "),i.a.createElement(g.a,null,E.map(t))))}}]),a}(n.Component),b=a(222),w=a(71),k=a(87),C=a(73),N=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={inviteCode:""},n.change=n.change.bind(Object(c.a)(n)),n.click=n.click.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"change",value:function(e){this.setState({inviteCode:e.target.value})}},{key:"click",value:function(){this.state.inviteCode.trim()&&this.props.handle(this.state.inviteCode.trim())}},{key:"render",value:function(){return this.props.valid?i.a.createElement(u.a,{className:"invite-code rsvp-button"},i.a.createElement(C.a,{onSubmit:this.click},i.a.createElement(C.a.Group,{controlId:"inviteCode"},i.a.createElement(C.a.Label,null,"Lookup with your email or phone number"),i.a.createElement(C.a.Control,{value:this.state.inviteCode,name:"email",type:"invite-code",onChange:this.change,required:!0,placeholder:"Enter your email or phone number"})),i.a.createElement(k.a,{className:"rsvp-button",size:"lg",type:"submit",disabled:!this.state.inviteCode.trim()||this.state.inviteCode.length<3},"See Events"))):null}}]),a}(n.Component),j="https://invite.nancyandanand.com";(window&&window.location&&window.location.hostname).includes("localhost")&&(j="http://localhost:8080");var O=j,I=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"createEventCard",value:function(e,t,a,n,r,l,s){return i.a.createElement(b.a,{className:"event"},i.a.createElement("div",{className:"event-left"}),i.a.createElement(w.a,{sm:4,className:"map-parent"},i.a.createElement("a",{href:s,target:"_blank",rel:"noopener noreferrer"},i.a.createElement("div",{className:"map-overlay"})),i.a.createElement("iframe",{title:t,className:"map",name:"gMap",src:"https://www.google.com/maps/embed/v1/place?q=".concat(e,"&key=").concat("AIzaSyCqnOPWWqsgOJXtw2H_P6AjtYUJjPF0RD4")})),i.a.createElement(w.a,{className:"map-info"},i.a.createElement("h1",null,t),i.a.createElement("div",{className:"text-detail"},a,": ",n," ",i.a.createElement("br",null),r," ",i.a.createElement("br",null)),i.a.createElement("div",{className:"text-detail"},i.a.createElement("br",null),l)),i.a.createElement("div",{className:"event-border"}),i.a.createElement("div",{className:"event-right"}))}},{key:"getInviteUrl",value:function(){return window.location.hostname.includes("localhost"),"".concat(O,"/").concat(this.props.id)}},{key:"getPithi",value:function(){return this.props.events.pithi?this.createEventCard("place_id:ChIJZ4HcS7gL9YgRC32f7k8REi0","Grah Shanti and Pithi","April 9th","9:00 AM","Thakkar Household: 1568 Dunwoody Club Crossing Dunwoody, GA 30338","A ritual application of a paste made from turmeric, chickpea flour, and rose water to the bride face, arms and legs. The paste is meant to both brighten the skin and purify the body in preparation for the wedding.","https://goo.gl/maps/nS3pSofk9FDNfeQq7"):null}},{key:"getMehndi",value:function(){if(!this.props.events.mehndi)return null;var e="April 8th",t="https://goo.gl/maps/af8e3Ukov8DKBUno6",a="Saha Household: 12305 Clairmonte Ave Alpharetta, GA 30009",n="5:00 PM",i="place_id:ChIJ-UORrZF19YgRngKtPOtS9MA";return this.props.flags.afam&&(i="Shakti Mandir",e="April 8th",t="https://goo.gl/maps/5fioU4j91P6iazE4A",a="Shakti Mandir: 1450 Huie Rd, Lake City, GA 30260",n="5:00 PM"),this.createEventCard(i,"Mehndi",e,n,a,"Come get painted with Mehndi! Dinner will be provided.",t)}},{key:"getVidhi",value:function(){return this.props.events.vid?this.createEventCard("Shakti Mandir","Vidhi","April 9th","9:00 AM","1450 Huie Rd, Lake City, GA 30260","Come share your blessings at Mandap Muharat, Ganesh Pujan, Pithi & Grah Shanti. Lunch will be provided.","https://goo.gl/maps/5fioU4j91P6iazE4A"):null}},{key:"getPreEvents",value:function(){return this.props.flags.afam?i.a.createElement(i.a.Fragment,null,this.getMehndi(),this.getVidhi()):i.a.createElement(i.a.Fragment,null,this.getMehndi(),this.getPithi())}},{key:"getEvents",value:function(){return this.props.gotInvite?i.a.createElement("div",{className:"section white-marble"},i.a.createElement(u.a,{className:"events"},i.a.createElement("h1",null,"Events"),this.getPreEvents(),this.createEventCard("place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y","Garba","April 9th","7:00 pm","Ashiana: 5675 Jimmy Carter Blvd, Norcross, GA","This is your chance to mingle with the other guests before the big day. Garba is a folk dance that originates from the state of Gujarat in India, where Nancy's and Anand's families are from. Don't worry if you don't know it, it\u2019s quick and easy to pick up! Dress colorfully and be ready to dance the night away!","https://goo.gl/maps/YidKb36x7KoyfxsE9"),this.createEventCard("place_id:ChIJRwFXzj0E9YgRkpI_K4PvVeU","Wedding","April 10th","10:00 am","Park Tavern: 500 10th St NE, Atlanta, GA","The main event! We will start with the Bharat, which is the Groom's procession to the venue. Once at the venue, we will have a short Hindu ceremony followed by a traditional Gujarati lunch. Dress Indian.","https://g.page/park-tavern-atlanta?share"),this.createEventCard("place_id:ChIJ28DQdm8E9YgRnsZ4YZ94nRo","Reception","April 10th","7:00 pm","Fox Theater:  660 Peachtree St NE, Atlanta, GA","This is it - the final event. Come celebrate our first evening as husband and wife. There will be food, performances and more dancing. Dress sharp.","https://goo.gl/maps/Qc85TqNm8qa2HeH5A"),i.a.createElement(k.a,{href:this.getInviteUrl(),className:"invite-button",size:"lg"},"Click to RSVP"))):(this.props.logger("No id, do not show events"),i.a.createElement("div",{className:"section white-marble"},i.a.createElement(N,{valid:!this.props.id,handle:this.props.submitInviteCode})))}},{key:"render",value:function(){return this.getEvents()}}]),a}(n.Component),A=a(236),S=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"section names pink"},i.a.createElement("div",{className:"name-text"},i.a.createElement("img",{alt:"",className:"name-left",src:A}),i.a.createElement("h1",null,"Nancy "),i.a.createElement("h1",null,"& "),i.a.createElement("h1",null,"Anand "),i.a.createElement("h2",null,"Are getting married"),i.a.createElement("h2",null,"April 10 2021"),i.a.createElement("img",{alt:"",className:"name-right",src:A})))}}]),a}(n.Component),P=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){var e=this.basic();return this.props.isAttending&&(e=this.guest()),i.a.createElement("div",{className:"section white-marble"},i.a.createElement("div",{className:"postpone"},e))}},{key:"guest",value:function(){return i.a.createElement("div",null,"Updates",i.a.createElement("br",null),i.a.createElement("br",null),"Mask Policy:",i.a.createElement("br",null),"We are requesting all guests to wear masks when unable to maintain 6 feet distance from others outside your social bubble, particularly when inside.",i.a.createElement("br",null),"We will have some available in case anyone forgets!",i.a.createElement("br",null),i.a.createElement("br",null),"Mother nature will be celebrating with us so expect some rain.",i.a.createElement("br",null),"If you have any questions, feel free to reach out to us!",i.a.createElement("br",null),i.a.createElement("br",null),"Stay healthy,",i.a.createElement("br",null),"Anand & Nancy")}},{key:"basic",value:function(){return i.a.createElement("div",null,"Dear loved ones,",i.a.createElement("br",null),i.a.createElement("br",null),"We have rescheduled our wedding to April 10th 2021",i.a.createElement("br",null),"However due to the pandemic, we have made some changes to ensure the safety of our guests.",i.a.createElement("br",null),i.a.createElement("br",null),"While we wish we could celebrate with everyone, we have reduced the guest list.",i.a.createElement("br",null),"We request guests get vaccinated or tested before attending the events.",i.a.createElement("br",null),"We will be livestreaming the wedding events for anyone who cant make it.",i.a.createElement("br",null),"We will share the livestream details soon.",i.a.createElement("br",null),i.a.createElement("br",null),"If you have any questions, feel free to reach out to us!",i.a.createElement("br",null),i.a.createElement("br",null),"Stay healthy,",i.a.createElement("br",null),"Nancy & Anand")}}]),a}(n.Component),L=a(223),_=a(248),x=a(249),B=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={isOpen:!1,player:{}},n.clicked=n.clicked.bind(Object(c.a)(n)),n.ready=n.ready.bind(Object(c.a)(n)),n.end=n.end.bind(Object(c.a)(n)),n}return Object(o.a)(a,[{key:"clicked",value:function(){var e=this;if(!this.state.player)return setTimeout((function(){e.clicked()}),500);this.state.isOpen||(document.getElementById("curtain-l").classList.add("story-curtain-lt"),document.getElementById("curtain-r").classList.add("story-curtain-rt"),document.getElementById("bottom-text").classList.add("hide"),document.getElementById("nav").classList.add("hide"),document.getElementById("top").classList.add("hide"),document.getElementsByClassName("zola-registry-iframe")[0].classList.add("hide"),document.getElementById("story-static").classList.remove("hide")),this.setState({isOpen:!0}),this.state.player.playVideo()}},{key:"end",value:function(){var e=this;this.state.player.stopVideo(),setTimeout((function(){document.getElementById("curtain-l").classList.remove("story-curtain-lt"),document.getElementById("curtain-r").classList.remove("story-curtain-rt"),document.getElementById("bottom-text").classList.remove("hide"),document.getElementById("nav").classList.remove("hide"),document.getElementById("top").classList.remove("hide"),document.getElementsByClassName("zola-registry-iframe")[0].classList.remove("hide"),document.getElementById("story-static").classList.add("hide"),e.setState({isOpen:!1})}),1e3)}},{key:"render",value:function(){return i.a.createElement("div",{className:"story",onClick:this.clicked},i.a.createElement("div",{className:"story-stage"}),i.a.createElement("div",{className:"story-main"},i.a.createElement("div",{className:"story-image"},i.a.createElement(L.a,{videoId:"xiOp1cXy_8Q?controls=0",opts:{playerVars:{autoplay:0,controls:1,cc_load_policy:0,disablekb:1,enablejsapi:1,fs:0,iv_load_policy:3,modestbranding:1,playsinline:1,rel:0,showinfo:0}},onReady:this.ready,onEnd:this.end,className:"story-video",containerClassName:"story-video-warp"}),i.a.createElement("img",{id:"curtain-l",alt:"curtains",className:"story-curtain story-curtain-l",src:_}),i.a.createElement("img",{id:"curtain-r",alt:"curtains",className:"story-curtain story-curtain-r",src:x}),i.a.createElement("div",{id:"bottom-text",className:"bottom-text"},i.a.createElement("h1",null,"Click to start")),i.a.createElement("div",{id:"story-static",className:"story-image-static hide"}))))}},{key:"ready",value:function(e){this.setState({player:e.target})}}]),a}(n.Component),M=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(o.a)(a,[{key:"render",value:function(){if(!document.getElementById("zola-wjs")){var e,t=document.getElementsByTagName("script")[0];(e=document.createElement("script")).id="zola-wjs",e.async=!0,e.src="https://widget.zola.com/js/widget.js",t.parentNode.insertBefore(e,t)}return i.a.createElement(i.a.Fragment,null,i.a.createElement("a",{id:"registry",className:"zola-registry-embed",href:"www.zola.com/registry/nancyandanand","data-registry-key":"nancyandanand"},"Our Zola Wedding Registry"))}}]),a}(n.Component),R=(n.Component,a(250),a(251)),T=window&&window.location&&window.location.hostname,F=!1,G=!1,W=function(){},U={people:{anand:{isAttending:"?"},nancy:{isAttending:"?"}},hotel:{rate:"0",name:"CM"},didRSVP:!1,gotInvite:!0,submitted:!0,flags:{afam:"yes",paid:"yes"},events:{pithi:"yes",mehndi:"yes",vid:"yes",wdin:"yes",wed:"yes",res:"yes"},email:"anand@gmail.com",address:{street:"860 peachtree street NE unit 1814",city:"Atlanta",state:"Georgia",zip:"30308",country:"USA"}};T.includes("nancy"),"nancyandanand.com"===T&&(F=!1,G=!1);var z=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;if(Object(s.a)(this,a),n=t.call(this,e),window.location.pathname.length>1){var i=window.location.pathname.substring(1);window.localStorage.setItem("inviteid",i),window.location.pathname="/"}var r=window.localStorage.getItem("inviteid")||e.cookies.get("id")||null;return F&&(r="Mnx0ZXN0"),n.state={id:r,didRSVP:!1,hotel:{},people:{},address:{street:"",city:"",state:"",zip:"",country:""},events:{},flags:{},email:"",submitClicked:!1,updateCodeClicked:!1,backendUrl:"".concat(O,"/invite"),gotInvite:!1,invite:{}},n.handleEnterStage=n.handleEnterStage.bind(Object(c.a)(n)),n.submitInviteCode=n.submitInviteCode.bind(Object(c.a)(n)),n.getInvite(),n}return Object(o.a)(a,[{key:"submitInviteCode",value:function(e){var t=this;return W("submitInviteCode: ",e),this.props.cookies.set("id",e,{httpOnly:!1,domain:T,path:"/",sameSite:"none",secure:!0,maxAge:315569520}),this.setState({id:e,updateCodeClicked:!0},(function(){return t.getInvite()}))}},{key:"getUrl",value:function(){return this.state.backendUrl+"/"+this.state.id}},{key:"getInvite",value:function(){var e=this;return F?setTimeout((function(){e.setState(U)}),100):this.state.id?R(this.getUrl(),{json:!0}).then((function(t){var a=t.people,n=t.hotel,i=t.didRSVP,r=t.address,l=t.flags,s=t.events,o=t.email;window.localStorage.setItem("inviteid",e.state.id),G||window.FS.identify("".concat(e.state.id,"--").concat(Object.keys(a)[0])),W("XX setting invite",{people:a,hotel:n,didRSVP:i,address:r,flags:l,events:s,email:o}),e.setState({people:a,hotel:n,didRSVP:i,address:r,flags:l,events:s,email:o,gotInvite:!0,invite:JSON.parse(JSON.stringify({people:a,address:r,events:s,email:o}))})})).catch((function(t){if(window.onerror(t.message,t),W("XX get invite failed ".concat(t.message),t.statusCode),404===t.statusCode)return e.setState({id:""});setTimeout((function(){return e.getInvite()}),1e3)})):void W("No id, skipping")}},{key:"handleEnterStage",value:function(e){"above"!==e.currentPosition&&"inside"!==e.currentPosition||W("enter theatre, nav off",e),"inside"===e.currentPosition&&"above"===e.previousPosition&&W("leave theatre, run on nav")}},{key:"render",value:function(){var e=null;this.state.hotel.name&&(e=i.a.createElement(i.a.Fragment,null,i.a.createElement(v.a.Link,{href:"#events"},"Events"),i.a.createElement(v.a.Link,{href:"#hotels"},"Hotels")));return i.a.createElement("div",{className:"page"},i.a.createElement("div",{id:"top"},i.a.createElement("a",{href:"/",name:"home"},""),i.a.createElement("div",{className:"page-top"},i.a.createElement("a",{href:"https://livestream.com/accounts/12458818/events/9610217"},i.a.createElement(u.a,null,i.a.createElement("div",{className:"top-text"},i.a.createElement("h1",null,"The Adventure"),i.a.createElement("h2",null,"Continues")),i.a.createElement("div",{className:"livestream"},i.a.createElement("h2",null,"Watch the livesteam here"))),i.a.createElement("div",{className:"moving-clouds"}))),i.a.createElement(h.a,{id:"nav",collapseOnSelect:!0,expand:"sm",sticky:"top"},i.a.createElement(h.a.Brand,{href:"#home"},"#AnandFanciesNancy"),i.a.createElement(h.a.Toggle,null),i.a.createElement(h.a.Collapse,null,i.a.createElement("div",{className:"mr-auto"}),i.a.createElement(v.a,null,i.a.createElement(v.a.Link,{href:"#home"},"Home"),i.a.createElement(v.a.Link,{href:"#update"},"Update"),e,i.a.createElement(v.a.Link,{href:"#store"},"Registry"),i.a.createElement(v.a.Link,{href:"#ourstory"},"Our Story")))),i.a.createElement(S,null),i.a.createElement("a",{href:"/",name:"update",className:"spot"},""),i.a.createElement(P,{isAttending:this.state.gotInvite}),i.a.createElement("a",{href:"/",name:"events",className:"spot"},""),i.a.createElement(I,{submitInviteCode:this.submitInviteCode,logger:W,id:this.state.id,gotInvite:this.state.gotInvite,events:this.state.events,flags:this.state.flags}),i.a.createElement("a",{href:"/",name:"hotels",className:"spot"},""),i.a.createElement(y,{hotel:this.state.hotel,flags:this.state.flags}),i.a.createElement("a",{href:"/",name:"store"},"")),i.a.createElement(M,null),i.a.createElement("a",{href:"/",name:"ourstory"},""),i.a.createElement(B,null))}}]),a}(n.Component),H=Object(p.a)(z);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=a(491);l.a.render(i.a.createElement(D.a,null,i.a.createElement(H,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[227,1,2]]]);
//# sourceMappingURL=main.c36a3b04.chunk.js.map
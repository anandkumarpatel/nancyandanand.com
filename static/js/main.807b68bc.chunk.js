(this.webpackJsonpwedding=this.webpackJsonpwedding||[]).push([[0],{227:function(e,t,a){e.exports=a(488)},232:function(e,t,a){},236:function(e,t,a){e.exports=a.p+"static/media/right-png.0326a5b7.png"},248:function(e,t,a){e.exports=a.p+"static/media/curtain-l.ccba0843.jpg"},249:function(e,t,a){e.exports=a.p+"static/media/curtain-r.0bfa1359.jpg"},250:function(e,t,a){},278:function(e,t){},280:function(e,t){},291:function(e,t){},293:function(e,t){},318:function(e,t){},320:function(e,t){},321:function(e,t){},327:function(e,t){},329:function(e,t){},348:function(e,t){},360:function(e,t){},363:function(e,t){},368:function(e,t){},370:function(e,t){},393:function(e,t){},488:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(56),l=a.n(r),o=(a(232),a(20)),s=a(21),c=a(26),m=a(23),d=a(22),h=a(42),u=a(71),p=a(48),v=a(490),g=a(221),f=a(73),E=[{name:"Courtyard Marriott",link:"https://www.marriott.com/hotels/travel/atlmn-courtyard-atlanta-midtown-georgia-tech/?scid=bb1a189a-fec3-4d19-a255-54ba596febe2",img:"https://lh5.googleusercontent.com/p/AF1QipNvWj0LccNpYgRl-Z4CbhVzravLpvbWT5Yvt_77=h600"}],b=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){var e=this,t=function(t){var a=t.name,n=i.a.createElement(i.a.Fragment,null,"Hotel information will be updated shortly.");return e.props.flags.paid&&(n=i.a.createElement(i.a.Fragment,null,"We have taken care of your room here and will give you room details shortly.")),i.a.createElement(f.a,{key:a,bg:"dark",text:"white"},i.a.createElement(f.a.Body,null,i.a.createElement(f.a.Title,null,a),i.a.createElement(f.a.Text,null,n)))};return"CM"!==e.props.hotel.name?null:i.a.createElement("div",{className:"section hotel pink"},i.a.createElement(h.a,null,i.a.createElement("h1",null," Hotels "),i.a.createElement(g.a,null,E.map(t))))}}]),a}(n.Component),y=a(222),w=a(70),k=a(87),C=a(72),N=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={inviteCode:""},n.change=n.change.bind(Object(c.a)(n)),n.click=n.click.bind(Object(c.a)(n)),n}return Object(s.a)(a,[{key:"change",value:function(e){this.setState({inviteCode:e.target.value})}},{key:"click",value:function(){this.state.inviteCode.trim()&&this.props.handle(this.state.inviteCode.trim())}},{key:"render",value:function(){return this.props.valid?i.a.createElement(h.a,{className:"invite-code rsvp-button"},i.a.createElement(C.a,{onSubmit:this.click},i.a.createElement(C.a.Group,{controlId:"inviteCode"},i.a.createElement(C.a.Label,null,"Lookup with your email or phone number"),i.a.createElement(C.a.Control,{value:this.state.inviteCode,name:"email",type:"invite-code",onChange:this.change,required:!0,placeholder:"Enter your email or phone number"})),i.a.createElement(k.a,{className:"rsvp-button",size:"lg",type:"submit",disabled:!this.state.inviteCode.trim()||this.state.inviteCode.length<3},"See Events"))):null}}]),a}(n.Component),A="https://invite.nancyandanand.com";(window&&window.location&&window.location.hostname).includes("localhost")&&(A="http://localhost:8080");var j=A,O=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"createEventCard",value:function(e,t,a,n,r,l,o){return i.a.createElement(y.a,{className:"event"},i.a.createElement("div",{className:"event-left"}),i.a.createElement(w.a,{sm:4,className:"map-parent"},i.a.createElement("a",{href:o,target:"_blank",rel:"noopener noreferrer"},i.a.createElement("div",{className:"map-overlay"})),i.a.createElement("iframe",{title:t,className:"map",name:"gMap",src:"https://www.google.com/maps/embed/v1/place?q=".concat(e,"&key=").concat("AIzaSyCqnOPWWqsgOJXtw2H_P6AjtYUJjPF0RD4")})),i.a.createElement(w.a,{className:"map-info"},i.a.createElement("h1",null,t),i.a.createElement("div",{className:"text-detail"},a,": ",n," ",i.a.createElement("br",null),r," ",i.a.createElement("br",null)),i.a.createElement("div",{className:"text-detail"},i.a.createElement("br",null),l)),i.a.createElement("div",{className:"event-border"}),i.a.createElement("div",{className:"event-right"}))}},{key:"getInviteUrl",value:function(){return window.location.hostname.includes("localhost"),"".concat(j,"/").concat(this.props.id)}},{key:"getPithi",value:function(){return this.props.events.pithi?this.createEventCard("place_id:ChIJZ4HcS7gL9YgRC32f7k8REi0","Pithi","April 8th","TBA","Thakkar Household: 1568 Dunwoody Club Crossing Dunwoody, GA 30338","A ritual application of a paste made from turmeric, chickpea flour, and rose water to the bride and groom\u2019s faces, arms and legs. The paste is meant to both brighten the skin and purify the body in preparation for the wedding.","https://goo.gl/maps/nS3pSofk9FDNfeQq7"):null}},{key:"getMehndi",value:function(){if(!this.props.events.mehndi)return null;var e="April 8th",t="https://goo.gl/maps/af8e3Ukov8DKBUno6",a="Thakkar Household: 12305 Clairmonte Ave Alpharetta, GA 30009",n="TBA",i="place_id:ChIJ-UORrZF19YgRngKtPOtS9MA";return this.props.flags.afam&&(i="Shakti Mandir",e="April 8th",t="https://goo.gl/maps/5fioU4j91P6iazE4A",a="Shakti Mandir: 1450 Huie Rd, Lake City, GA 30260",n="5:00 PM"),this.createEventCard(i,"Mehndi",e,n,a,"Come get painted with Mehndi! Dinner will be provided.",t)}},{key:"getVidhi",value:function(){return this.props.events.vid?this.createEventCard("Shakti Mandir","Vidhi","April 9th","9:00 AM","1450 Huie Rd, Lake City, GA 30260","Come share your blessings at Mandap Muharat, Ganesh Pujan, Pithi & Grah Shanti. Lunch will be provided.","https://goo.gl/maps/5fioU4j91P6iazE4A"):null}},{key:"getPreEvents",value:function(){return this.props.flags.afam?i.a.createElement(i.a.Fragment,null,this.getMehndi(),this.getVidhi()):i.a.createElement(i.a.Fragment,null,this.getPithi(),this.getMehndi())}},{key:"getEvents",value:function(){return this.props.gotInvite?i.a.createElement("div",{className:"section white-marble"},i.a.createElement(h.a,{className:"events"},i.a.createElement("h1",null,"Events"),this.getPreEvents(),this.createEventCard("place_id:ChIJZ3_vhMem9YgRX3--sf9DM3Y","Garba","April 9th","7:00 pm","Ashiana: 5675 Jimmy Carter Blvd, Norcross, GA","This is your chance to mingle with the other guests before the big day. Garba is a folk dance that originates from the state of Gujarat in India, where Nancy and Anand's families are from. Do not worry if you don't know it, It\u2019s quick and easy to pick up! Dress colorfully and be ready to dance the night away!","https://goo.gl/maps/YidKb36x7KoyfxsE9"),this.createEventCard("place_id:ChIJRwFXzj0E9YgRkpI_K4PvVeU","Wedding","April 10th","10:00 am","Park Tavern: 500 10th St NE, Atlanta, GA","The main event! We will start with the Bharat, which is the Groom's procession to the venue. Once at the venue, we will have a short Hindu ceremony and will be followed by a traditional Gujarati lunch. Dress Indian.","https://g.page/park-tavern-atlanta?share"),this.createEventCard("place_id:ChIJ28DQdm8E9YgRnsZ4YZ94nRo","Reception","April 10th","7:00 pm","Fox Theater:  660 Peachtree St NE, Atlanta, GA","This is it - the final event. Come celebrate our first evening as husband and wife. There will be food, performances and more dancing. Dress sharp.","https://goo.gl/maps/Qc85TqNm8qa2HeH5A"),i.a.createElement(k.a,{href:this.getInviteUrl(),className:"invite-button",size:"lg"},"Click to RSVP"))):(this.props.logger("No id, do not show events"),i.a.createElement("div",{className:"section white-marble"},i.a.createElement(N,{valid:!this.props.id,handle:this.props.submitInviteCode})))}},{key:"render",value:function(){return this.getEvents()}}]),a}(n.Component),S=a(236),I=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"section names pink"},i.a.createElement("div",{className:"name-text"},i.a.createElement("img",{alt:"",className:"name-left",src:S}),i.a.createElement("h1",null,"Nancy "),i.a.createElement("h1",null,"& "),i.a.createElement("h1",null,"Anand "),i.a.createElement("h2",null,"Are getting married"),i.a.createElement("h2",null,"April 10 2021"),i.a.createElement("img",{alt:"",className:"name-right",src:S})))}}]),a}(n.Component),P=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"render",value:function(){return i.a.createElement("div",{className:"section white-marble"},i.a.createElement("div",{className:"postpone"},i.a.createElement("div",null,"Dear loved ones,",i.a.createElement("br",null),i.a.createElement("br",null),"We have rescheduled our wedding to April 10th 2021",i.a.createElement("br",null),"However due to the pandemic, we have made some changes to ensure the safety of our guests.",i.a.createElement("br",null),i.a.createElement("br",null),"While we wish we could celebrate with everyone, we have reduced the guest list.",i.a.createElement("br",null),"We request guests get vaccinated or tested before attending the events.",i.a.createElement("br",null),"We will be livestreaming the wedding events for anyone who cant make it.",i.a.createElement("br",null),"We will share the livestream details soon.",i.a.createElement("br",null),i.a.createElement("br",null),"If you have any questions, feel free to reach out to us!",i.a.createElement("br",null),i.a.createElement("br",null),"Stay healthy,",i.a.createElement("br",null),"Nancy & Anand")))}}]),a}(n.Component),M=a(223),R=a(248),T=a(249),x=(n.Component,a(250),a(251)),G=window&&window.location&&window.location.hostname,U=!1,H=!1,W=function(){},D={people:{anand:{isAttending:"?"},nancy:{isAttending:"?"}},hotel:{rate:"0",name:"CM"},didRSVP:!1,gotInvite:!0,submitted:!0,flags:{afam:"yes",paid:"yes"},events:{pithi:"yes",mehndi:"yes",vid:"yes",wdin:"yes",wed:"yes",res:"yes"},email:"anand@gmail.com",address:{street:"860 peachtree street NE unit 1814",city:"Atlanta",state:"Georgia",zip:"30308",country:"USA"}};G.includes("nancy"),"nancyandanand.com"===G&&(U=!1,H=!1);var L=function(e){Object(m.a)(a,e);var t=Object(d.a)(a);function a(e){var n;if(Object(o.a)(this,a),n=t.call(this,e),window.location.pathname.length>1){var i=window.location.pathname.substring(1);window.localStorage.setItem("inviteid",i),window.location.pathname="/"}var r=window.localStorage.getItem("inviteid")||e.cookies.get("id")||null;return U&&(r="Mnx0ZXN0"),n.state={id:r,didRSVP:!1,hotel:{},people:{},address:{street:"",city:"",state:"",zip:"",country:""},events:{},flags:{},email:"",submitClicked:!1,updateCodeClicked:!1,backendUrl:"".concat(j,"/invite"),gotInvite:!1,invite:{}},n.handleEnterStage=n.handleEnterStage.bind(Object(c.a)(n)),n.submitInviteCode=n.submitInviteCode.bind(Object(c.a)(n)),n.getInvite(),n}return Object(s.a)(a,[{key:"submitInviteCode",value:function(e){var t=this;return W("submitInviteCode: ",e),this.props.cookies.set("id",e,{httpOnly:!1,domain:G,path:"/",sameSite:"none",secure:!0,maxAge:315569520}),this.setState({id:e,updateCodeClicked:!0},(function(){return t.getInvite()}))}},{key:"getUrl",value:function(){return this.state.backendUrl+"/"+this.state.id}},{key:"getInvite",value:function(){var e=this;return U?setTimeout((function(){e.setState(D)}),100):this.state.id?x(this.getUrl(),{json:!0}).then((function(t){var a=t.people,n=t.hotel,i=t.didRSVP,r=t.address,l=t.flags,o=t.events,s=t.email;window.localStorage.setItem("inviteid",e.state.id),H||window.FS.identify("".concat(e.state.id,"--").concat(Object.keys(a)[0])),W("XX setting invite",{people:a,hotel:n,didRSVP:i,address:r,flags:l,events:o,email:s}),e.setState({people:a,hotel:n,didRSVP:i,address:r,flags:l,events:o,email:s,gotInvite:!0,invite:JSON.parse(JSON.stringify({people:a,address:r,events:o,email:s}))})})).catch((function(t){if(window.onerror(t.message,t),W("XX get invite failed ".concat(t.message),t.statusCode),404===t.statusCode)return e.setState({id:""});setTimeout((function(){return e.getInvite()}),1e3)})):void W("No id, skipping")}},{key:"handleEnterStage",value:function(e){"above"!==e.currentPosition&&"inside"!==e.currentPosition||W("enter theatre, nav off",e),"inside"===e.currentPosition&&"above"===e.previousPosition&&W("leave theatre, run on nav")}},{key:"render",value:function(){var e=null;this.state.id&&(e=i.a.createElement(i.a.Fragment,null,i.a.createElement(p.a.Link,{href:"#events"},"Events"),i.a.createElement(p.a.Link,{href:"#hotels"},"Hotels")));return i.a.createElement("div",{className:"page"},i.a.createElement("div",{id:"top"},i.a.createElement("a",{href:"/",name:"home"},""),i.a.createElement("div",{className:"page-top"},i.a.createElement(h.a,null,i.a.createElement("div",{className:"top-text"},i.a.createElement("h1",null,"The Adventure"),i.a.createElement("h2",null,"Continues"))),i.a.createElement("div",{className:"moving-clouds"})),i.a.createElement(u.a,{id:"nav",collapseOnSelect:!0,expand:"sm",sticky:"top"},i.a.createElement(u.a.Brand,{href:"#home"},"#TheAdventureContinues"),i.a.createElement(u.a.Toggle,null),i.a.createElement(u.a.Collapse,null,i.a.createElement("div",{className:"mr-auto"}),i.a.createElement(p.a,null,i.a.createElement(p.a.Link,{href:"#home"},"Home"),i.a.createElement(p.a.Link,{href:"#update"},"Update"),e,i.a.createElement(p.a.Link,{href:"#ourstory"},"Our Story")))),i.a.createElement(I,null),i.a.createElement("a",{href:"/",name:"update",className:"spot"},""),i.a.createElement(P,null),i.a.createElement("a",{href:"/",name:"events",className:"spot"},""),i.a.createElement(O,{submitInviteCode:this.submitInviteCode,logger:W,id:this.state.id,gotInvite:this.state.gotInvite,events:this.state.events,flags:this.state.flags}),i.a.createElement("a",{href:"/",name:"hotels",className:"spot"},""),i.a.createElement(b,{hotel:this.state.hotel,flags:this.state.flags}),i.a.createElement("a",{href:"/",name:"todo",className:"spot"},""),i.a.createElement("a",{href:"/",name:"ourstory"},"")))}}]),a}(n.Component),F=Object(v.a)(L);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=a(491);l.a.render(i.a.createElement(J.a,null,i.a.createElement(F,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[227,1,2]]]);
//# sourceMappingURL=main.807b68bc.chunk.js.map
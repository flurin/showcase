// Showcase, Simple display case for images. Copyright (c) 2008 Flurin Egger, DigitPaint, MIT Style License.
// Needs MooTools (http://mootools.net) (Core, Class, Class.Extras, Array, String, Function, Number, Element and Element.Event)
var $any;

var Showcase = new Class({
  labels : {
    next : "next &raquo;",
    previous : "&laquo previous",
    currentScreen: "This is screen:"
  },
  // Constructor
  // ==== Parameters:
  // el<id,element>:: Element or ID of the container element which contains Images 
  //                  or blocks of HTML with class "object"
  // showCaseTitleEl<id,element>:: The ID of the title element (will be injected into the navigation bar)
  // [labels<Hash>]:: Alternative labels for showcase navigation
  //--
	initialize : function(el,showcaseTitleEl){
		this.container = $(el);
		this.showcaseTitleEl = $(showcaseTitleEl);
		this.images = $A([]);
		this.container.getChildren().each(function(img){
			if(img.get('tag') == "img" || img.hasClass("object")){this.images.push(img); }
		}.bind(this));
		this.container.empty();
		
		var c = this._getWindowAnchor.attempt(this);
		if(c){ this.current = c -1; } else {	this.current = 0;	}

		this._create();
		this.navigate(this.current);	  
	},
	navigate : function(nr){
		if(nr > this.images.length){nr = 0;}
		if(nr < 0){nr = this.images.length - 1;}			
		this.current = nr;
		
		var img = this.images[nr];
		if(!img){return false;}
		
		var title = $any(img.getProperty("title"),img.getProperty("alt"));

		this.container.empty();
		this.container.adopt(img);
		this._setNrAndTitle(nr + 1,title);			
		return true;
	},
	next : function(){
		this.navigate(this.current + 1);
	},
	previous : function(){
		this.navigate(this.current - 1);			
	},
	_setNrAndTitle : function(nr,title){
		if(this.titleEl){this.titleEl.set("html",$any(title,""));}
		if(this.screenNrEl){this.screenNrEl.set("html",$any("" + nr, ""));}
	},
	_getWindowAnchor : function(){
		if(window.location.hash && window.location.hash.trim !== ""){
			return window.location.hash.replace("#","").toInt();
		} else {
			return 0;
		}		
	},
	_create : function(){
    // <div id="navigation">
    //  <h1 id="showcase-title">Your title here</h1>
    //  This is screen: <span id="screen-nr">0</span>
    //  <span id="screen-title">Screen title (will be replaced)</span>
    //  <span id="screen-navigation">
    //    <a href="#" onclick="s.previous();return false;">&lt; vorige</a>
    //    <span id="screen-pages"></span>
    //    <a href="#" onclick="s.next();return false;">volgende &gt;</a>
    //  </span>
    // </div>
    var navigation = new Element("div",{"id":"navigation"});
    this.showcaseTitleEl.inject(navigation);

    navigation.appendText(this.labels.currentScreen + " ");
    this.screenNrEl = new Element("span", {"id": "screen-nr"});
    this.screenNrEl.inject(navigation);
    navigation.appendText(" ");

    this.titleEl = new Element("span",{"id": "screen-title"});
    this.titleEl.inject(navigation);

    var screenNav = new Element("span", {"id": "screen-navigation"});
    screenNav.inject(navigation);
    
    screenNav.adopt(new Element("a",{"html": this.labels.previous,"href":"#","events": {"click": this.previous.bindWithEvent(this)}}));
    this.screenPages = new Element("span", {"id": "screen-pages","html": " "});
    screenNav.adopt(this.screenPages);
    screenNav.adopt(new Element("a",{"html": this.labels.next,"href":"#","events": {"click": this.next.bindWithEvent(this)}}));
        
    navigation.inject(document.body,"top");
	  this._createPages();
	},
	_createPages : function(){
		if(!this.screenPages){return false;}
		this.images.each(function(img,i){
			var l = new Element("a",{'href': '#'+(i+1), "html": "" + (i+1), "events": {"click": this.navigate.bind(this,i) }});
			this.screenPages.adopt(l);
		}.bind(this));
	}
	
});

$any = function(){
	var r = $A(arguments).filter(function(e){
		if(e && $type(e) == "string" && e.trim !== ""){
			return true;
		}
	},this);
	if(r.length > 0){	return r[0]; } else {	return ""; }
};
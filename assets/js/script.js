var works = [
    {
        id : 1,
        employer: "WebCanada Inc.",
        position: "Web Developer",
        website: "http://www.webcanada.com",
        start: "2013-10",
        end: "present"
    },
    {
        id : 2,
        employer: "SCMA",
        position: "Web Master",
        website: "http://www.scma.com",
        start: "2013-05",
        end: "2013-09"
    },
    {
        id : 3,
        employer: "MySelf",
        position: "Seasonal Python Tutor",
        start: "2012-09",
        end: "present"
    }
];

var portfolios = [
    {
        id : 1,
        name : "W Verbier - Elevator",
        tags : ["css", "ajax"],
        url : "http://www.starwoodpromos.com/w-verbier-elevator-display/",
        image : "images/w-verbier-elevator-display.jpg",
    },
    {
        id : 2,
        name : "Turnberry Adventures",
        tags : ["css", "cms"],
        url : "http://www.turnberryadventures.co.uk/",
        image : "images/turnberryadventure.jpg",
    },
    {
        id : 3,
        name : "SPG Hotescapes",
        tags : ["css3", "reactjs", "google map"],
        url : "http://www.spghotescapes.com/",
        image : "images/hotescapes.jpg",
    },
    {
        id : 4,
        name : "WooriChina",
        tags : ["wordpress", "cms", "bootstrap"],
        url : "http://www.woorichina.com",
        image : "images/woorichina.jpg",
    },
    {
        id : 5,
        name : "Email",
        tags : ["table", "css"],
    },
    {
        id : 6,
        name : "SPG Cravings",
        tags : ["css3", "reactjs", "google map"],
        url : "http://www.spgcravings.com/",
        image : "images/hotescapes.jpg",
    },
];


$(function() {
    'use strict';
    $('.percentage').each(function() {
        $(this).animate({
            'width': $(this).data('percentage'),
        });
    });
});

var Portfolio = React.createClass({
    componentDidMount: function() {
        var items;

        function validate_email(email) {
        	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        	return re.test(email);
        }
        
        
        function init_map() {
        	var mapOptions = {
        		zoom: 15,
        		streetViewControl: false,
        		mapTypeId: google.maps.MapTypeId.ROADMAP,
        		mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
        		center: new google.maps.LatLng(-37.81261128155935,144.96260404586792) // Replace these coordinates with yours
          }
          var map = new google.maps.Map(document.getElementById('map'), mapOptions);
          var image = 'images/gmap_default.png';
          var myLatLng = new google.maps.LatLng(-37.81261128155935,144.96260404586792); // Replace these coordinates with yours
          var beachMarker = new google.maps.Marker({
          	map: map,
          	position: myLatLng
          });
        }
        
        
        function load_map() {
         	var script = document.createElement("script");
         	script.type = "text/javascript";
         	script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=init_map";
         	document.body.appendChild(script);
        }
        
        
        $(function() {
        	/**/
        	/* portfolio slideshow */
        	/**/
        	$(document).on('click', '.item-portfolio .next, .item-portfolio-details .next', function() {
        		var active = $(this).siblings('div').find('.active');
        		if( active.next('img').length ) {
        			active.next().addClass('active').siblings().removeClass('active');
        		}
        		else {
        			active.siblings('img:first-child').addClass('active').siblings().removeClass('active');
        		}
        	});
        	
        	$(document).on('click', '.item-portfolio .prev, .item-portfolio-details .prev', function() {
        		var active = $(this).siblings('div').find('.active');
        		if( active.prev('img').length ) {
        			active.prev().addClass('active').siblings().removeClass('active');
        		}
        		else {
        			active.siblings('img:last-child').addClass('active').siblings().removeClass('active');
        		}
        	});
        	
        	
        	/**/
        	/* email item */
        	/**/
        	$('#item-email i').on('click', function() {
        		$('#item-email').addClass('active');
        		$('#item-email [name="name"]').focus();
        	});
        	
        	$('#item-email button[type="button"]').on('click', function() {
        		$('#item-email').removeClass('active');
        	});
        	
        	$('#item-email form').on('submit', function() {
        		if( $('#item-email button').text() == 'Ok' ) {
        			$('#item-email').removeClass('active');
        		}
        		else {
        			if( $('#item-email input[name="name"]').val() == '' ) {
        				$('#item-email input[name="name"]').focus();
        				$('#item-email .error').text('You must enter your name!');
        				return false;
        			}
        			if( $('#item-email input[name="email"]').val() == '' ) {
        				$('#item-email input[name="email"]').focus();
        				$('#item-email .error').text('You must enter your email!');
        				return false;
        			}
        			if( !validate_email($('#item-email input[name="email"]').val()) ) {
        				$('#item-email input[name="email"]').focus();
        				$('#item-email .error').text('You must enter valid email!');
        				return false;
        			}
        			if( $('#item-email [name="message"]').val() == '' ) {
        				$('#item-email [name="message"]').focus();
        				$('#item-email .error').text('You must enter message!');
        				return false;
        			}
        			
        			$.ajax( {
        				url: 'email.php',
        				type: 'POST',
        				data: { name: $('#item-email [name="name"]').val(), from: $('#item-email [name="email"]').val(), message: $('#item-email [name="message"]').val() }
        			}).done(function() {
        				$('#item-email .error').text('');
        				$('#item-email button[type="submit"]').hide();
        				$('#item-email .success').text('Your message sent!');
        				$('#item-email input, #item-email textarea').attr('readonly', true);
        			});			
        		}
        		
        		return false;		
        	});
        	
        	/**/
        	/* map item */
        	/**/
        	$('#item-map i').on('click', function() {
        		$('#item-map').addClass('active');
        	});
        	$('#item-map span').on('click', function() {
        		$('#item-map').removeClass('active');
        	});
        });
        
        
        $(window).load(function() {
        	/**/
        	/* isotope */
        	/**/
        	items = $('.page');
        	items.isotope({
        		itemSelector : '.item',
        		masonry: {columnWidth: 240},
        		filter: '.item-visible, .item-avatar, .item-nav, .item-wellcome',
        		getSortData: { sort: function($elem) {return parseInt( $elem.data('sort') || 4 );} },    
        		sortBy: 'sort'
        	});
        	$(window).bind('hashchange', function(event) {
        		var hashOptions = window.location.hash ? $.deparam.fragment(window.location.hash, true) : {};
        		var id = hashOptions['id'] || 0;
        		var page = hashOptions['page'] || 'home';
        		var filter = '.item-visible';
        		
        		if( hashOptions['page'] )
        			page = hashOptions['page'];
        		
        		$('#item-nav a[href="#page=' + page + '"]').addClass('active').parent().siblings().find('a').removeClass('active');
        		
        		if( page == 'home' ) {
        			 filter = '.item-visible';
        		}
        		else if( page == 'skills' ) {
        			 filter = '.item-skill';
        		}
        		else if( page == 'portfolio' ) {
        			 filter = '.item-portfolio';
        			 if( id ) {
        			 	filter = '#item-portfolio' + id;
        			 	elem = $(filter);
        			 	console.log(elem);
        			 	if( elem.prevAll('.item-portfolio-details').length ) {
        			 		id = elem.prevAll('.item-portfolio-details').eq(0).attr('id');
        			 		$('#item-next').attr('href', '#page=portfolio&id=' + id.substr(14));
        			 		filter += ', #item-next';
        			 	}
        			 	if( elem.nextAll('.item-portfolio-details').length ) {
        			 		id = elem.nextAll('.item-portfolio-details').eq(0).attr('id');
        			 		$('#item-prev').attr('href', '#page=portfolio&id=' + id.substr(14));
        			 		filter += ', #item-prev';
        			 	}
        			 	filter += ', #item-back-portfolio';
        			 }
        		}
        		else if( page == 'experiences' ) {
        			 filter = '.item-experience';
        		}
        		else if( page == 'blog' ) {
        			 filter = '.item-post';
        			 if( id ) {
        			 	filter = '#item-post' + id;
        			 	elem = $(filter);
        			 	if( elem.prevAll('.item-post-details').length ) {
        			 		id = elem.prevAll('.item-post-details').eq(0).attr('id');
        			 		$('#item-newer').attr('href', '#page=blog&id=' + id.substr(9));
        			 		filter += ', #item-newer';
        			 	}
        			 	if( elem.nextAll('.item-post-details').length ) {
        			 		id = elem.nextAll('.item-post-details').eq(0).attr('id');
        			 		$('#item-older').attr('href', '#page=blog&id=' + id.substr(9));
        			 		filter += ', #item-older';
        			 	}
        			 	filter += ', #item-back-blog';
        			 }
        		}
        		else if( page == 'contacts' ) {
        			 filter = '.item-social';
        		}
        		
        		items.isotope({
        			filter: '.item-avatar, .item-nav, .item-wellcome, ' + filter
        		});
        	}).trigger('hashchange');
        	
        	/**/
        	/* load more */
        	/**/
        	// $('#load-more-works').on('click', function() {
        	// 	page = $(this).data('page');
        	// 	loader = $('#load-more-works');
        			
        	// 	if( !page )
        	// 		return false;
        		
        	// 	$.get('ajax/portfolio-page' + page + '.html').done(function(data) {
        	// 		items.isotope('insert', $(data));
        	// 		loader.data('page', ++page);
        			
        	// 		$.get('ajax/portfolio-page' + page + '.html').fail(function() {
        	// 			loader.removeClass('item-portfolio');
        	// 			$(window).trigger('hashchange');
        	// 		});
        	// 	}).fail(function() {
        	// 		loader.removeClass('item-portfolio');
        	// 		$(window).trigger('hashchange');
        	// 	});
        		
        	// 	return false;
        	// });	
        	
        	// $('#load-more-posts').on('click', function() {
        	// 	page = $(this).data('page');
        	// 	loader = $('#load-more-posts');
        			
        	// 	if( !page )
        	// 		return false;
        		
        	// 	$.get('ajax/blog-page' + page + '.html?a').done(function(data) {
        	// 		items.isotope('insert', $(data));
        	// 		loader.data('page', ++page);
        			
        	// 		$.get('ajax/blog-page' + page + '.html').fail(function()
        	// 		{
        	// 			loader.removeClass('item-post');
        	// 			$(window).trigger('hashchange');
        	// 		});
        	// 	}).fail(function() {
        	// 		loader.removeClass('item-post');
        	// 		$(window).trigger('hashchange');
        	// 	});
        		
        	// 	return false;
        	// });
        	
        	
        	/**/
        	/* loader */
        	/**/
        	$('#loader').fadeOut('fast', function() {
        		$('#bg').fadeIn('fast');
        		$('#page').addClass('loaded');
        	});
        	
        	
        	/**/
        	/* map */
        	/**/
        	load_map();
        	
        	
        	/**/
        	/* images load */
        	/**/
        	$('img').each(function() {
        		if( $(this).data('src') )
        			$(this).attr('src', $(this).data('src'));
        	});
        });
    },
    render: function() {
        // var portfolios = this.props.data.map(function(portfolio) {
        //     return (
        //         <article className="block profolio" key={portfolio.id}>
        //             <h2>{portfolio.name}</h2>
        //             <h3 className="company">WebCanada Inc.</h3>
        //             <div className="work-info">
        //                 <a className="link" target="_blank" href={portfolio.url}>Go to Portfolio</a>
        //             </div>
        //         </article>
        //     );
        // });
        return (
            <div id="page" className="page">
    			<div data-sort="1" className="item item-small item-avatar">
    				<img src="https://www.tm-town.com/assets/default_male600x600-79218392a28f78af249216e097aaf683.png" alt=""/>
    			</div>
    			
    			<div data-sort="2" className="item item-large item-wellcome">
    				<h1>Hello! My name is <strong>Sam Li</strong></h1>
    				<p>I am web developer and this is my official website.</p>
    			</div>
    			
    			<div data-sort="3" className="item item-large item-nav">
    				<ul id="item-nav">
    					<li><a href="#page=home" className="active"><i className="icon-home"></i>Home</a></li>
    					<li><a href="#page=skills"><i className="icon-magic"></i>Skills</a></li>
    					<li><a href="#page=portfolio"><i className="icon-briefcase"></i>Portfolio</a></li>
    					<li><a href="#page=experiences"><i className="icon-comments-alt"></i>Experiences</a></li>
    					<li><a href="#page=blog"><i className="icon-file"></i>Blog</a></li>
    					<li><a href="#page=contacts"><i className="icon-phone"></i>Contacts</a></li>
    				</ul>
    			</div>
    			
    			<a href="#page=portfolio" id="item-back-portfolio" className="item item-small item-color-red item-back">
    				<i className="icon-remove-sign"></i>
    				<p>Back to portfolio items list</p>
    			</a>
    			
    			<a href="#page=blog" id="item-back-blog" className="item item-small item-color-red item-back">
    				<i className="icon-remove-sign"></i>
    				<p>Back to blog items list</p>
    			</a>
    			
    			<div className="item item-visible item-portfolio">
    				<div>
    					<img src="assets/images/w-verbier-elevator-display.jpg" alt="" className="active"/>
    				</div>
    				<span className="prev icon-chevron-left"></span>
    				<a href="#page=portfolio&id=1" className="zoom icon-fullscreen"></a>
    				<span className="next icon-chevron-right"></span>
    			</div>
    			
    			<div id="item-portfolio1" className="item item-large item-portfolio-details">
    				<div className="slideshow">
    					<div>
    						<img src="" data-src="assets/images/w-verbier-elevator-display.jpg" alt="" className="active"/>
    					</div>
    					<span className="prev icon-chevron-left"></span>
    					<span className="next icon-chevron-right"></span>
    				</div>
    				<div className="text">
    					<h1>W Verbier - Elevator</h1>
    					<h4>Working demo: <a href="http://www.starwoodpromos.com/w-verbier-elevator-display">Here</a></h4>
    					<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo. Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    				</div>
    			</div>
    			
    			<div className="item item-visible item-portfolio">
    				<div>
    					<img src="assets/images/turnberryadventure.jpg" alt="" className="active"/>
    				</div>
    				<span className="prev icon-chevron-left"></span>
    				<a href="#page=portfolio&id=2" className="zoom icon-fullscreen"></a>
    				<span className="next icon-chevron-right"></span>
    				<p>Project with 5 previews and 5 images</p>
    			</div>
    			
    			<div id="item-portfolio2" className="item item-large item-portfolio-details">
    				<div className="slideshow">
    					<div>
    						<img src="images/turnberryadventure.jpg" alt="" className="active"/>
    					</div>
    					<span className="prev icon-chevron-left"></span>
    					<span className="next icon-chevron-right"></span>
    				</div>
    				<div className="text">
    					<h1>Turnberry Adventures</h1>
    					<h4>Working demo: <a href="http://www.turnberryadventures.co.uk">Here</a></h4>
    					<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo. Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    					<h2>Example of h2 header</h2>
    					<h3>Example of h3 header</h3>
    				</div>
    			</div>
    			
    			<div className="item item-visible item-small item-portfolio">
    				<div>
    					<img src="assets/images/hotescapes.jpg" alt="" className="active"/>
    				</div>
    				<a href="#page=portfolio&id=3" className="zoom icon-fullscreen"></a>
    				<p>Project with single image</p>
    			</div>
    			
    			<div id="item-portfolio3" className="item item-large item-portfolio-details">
    				<div className="pic"><img src="assets/images/hotescapes.jpg" width="660" height="316" alt=""/></div>
    				<div className="text">
    					<h1>SPG Hotescapes</h1>
    					<h4>Working demo: <a href="http://www.spghotescapes.com">Here</a></h4>
    					<h2>Example of h2 header</h2>
    					<h3>Example of h3 header</h3>
    				</div>
    			</div>
    			
    			<div className="item item-visible item-portfolio">
    				<div>
    					<img src="assets/images/woorichina.jpg" alt="" className="active"/>
    				</div>
    				<a href="#page=portfolio&id=4" className="zoom icon-fullscreen"></a>
    				<p>Project with single image</p>
    			</div>
    			
    			<div id="item-portfolio4" className="item item-large item-portfolio-details">
    				<div className="pic"><img src="assets/images/woorichina.jpg" width="660" height="316" alt=""/></div>
    				<div className="text">
    					<h1>WooriChina</h1>
    					<h4>Working demo: <a href="http://www.woorichina.com">Here</a></h4>
    					<h2>Example of h2 header</h2>
    				</div>
    			</div>
    			
    			<a href="#page=blog&id=1" className="item item-visible item-post">
    				<h3>Blog post with image and comments</h3>
    				<img src="pics/post1-thumb.jpg" alt=""/>
    				<p><span><em className="icon-comment-alt"></em>&nbsp; 3 comments</span><em className="icon-time"></em>&nbsp; 2 hours ago</p>
    			</a>
    			
    			<div id="item-post1" className="item item-large item-post-details">
    				<div className="pic"><img src="" data-src="//voky.com.ua/frittata/pics/post1.jpg" alt=""/></div>
    				<div className="text">
    				<h1>Blog post with image and comments</h1>
    					<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo. Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    					<h2>Example of h2 header</h2>
    					<p>Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    					<h3>Example of h3 header</h3>
    					<p>Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    				</div>
    				<dl>
    					<dt>
    						<img src="pics/review1.jpg" alt=""/>
    						Jenna Williams
    						<span>5 days ago</span>
    					</dt>
    					<dd>Aliquam ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Proin nisi neque, facilisis semper rutrum.</dd>
    					<dt className="lv2">
    						<img src="pics/review3.jpg" alt=""/>
    						Mark Klarkson
    						<span>3 hours ago</span>
    					</dt>
    					<dd className="lv2">Justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Proin nisi neque, facilisis semper.</dd>
    					<dt>
    						<img src="pics/review2.jpg" alt=""/>
    						Jonh Richards
    						<span>13 days ago</span>
    					</dt>
    					<dd>Ipsum justo, rutrum eu ornare a, mattis ut leo. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Proin nisi neque.</dd>
    				</dl>
    				<form action="">
    					<h3>Leave a comment</h3>
    					<input type="text" maxlength="30" placeholder="Enter your name (max 30 characters)"/>
    					<input type="text" maxlength="50" placeholder="Enter your e-mail (max 50 characters)"/>
    					<textarea name="" cols="1" rows="1" placeholder="Enter your comment"></textarea>
    					<button type="submit">Submit</button>
    				</form>				
    			</div>
    			
    			<a href="https://twitter.com/vokycomua" target="_blank" className="item item-visible item-small item-color-cyan item-social">
    				<i className="icon-twitter"></i>
    				<p>Follow me on Twitter</p>
    			</a>
    			
    			<div className="item item-visible item-small item-color-red item-skill">
    				<div>
    					<em className="value100"></em>
    					<span>100%</span>
    				</div>
    				<p>HTML4 & HTML5</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-green item-skill">
    				<div>
    					<em className="value100"></em>
    					<span>100%</span>
    				</div>
    				<p>CSS2 & CSS3</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-blue item-skill">
    				<div>
    					<em className="value50"></em>
    					<span>50%</span>
    				</div>
    				<p>Photoshop</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-yellow item-skill">
    				<div>
    					<em className="value50"></em>
    					<span>50%</span>
    				</div>
    				<p>Fireworks</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-orange item-skill">
    				<div>
    					<em className="value25"></em>
    					<span>25%</span>
    				</div>
    				<p>Illustrator</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-pink item-skill">
    				<div>
    					<em className="value25"></em>
    					<span>25%</span>
    				</div>
    				<p>PHP4 & PHP5</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-purple item-skill">
    				<div>
    					<em className="value25"></em>
    					<span>25%</span>
    				</div>
    				<p>MySQL</p>
    			</div>
    			
    			<div className="item item-visible item-small item-color-cyan item-skill">
    				<div>
    					<em className="value75"></em>
    					<span>75%</span>
    				</div>
    				<p>JavaScript & jQuery</p>
    			</div>
    			
    			<div className="item item-visible item-experience">
    				<i className="icon-quote-right"></i>
    				<img src="https://media.licdn.com/media/p/3/000/054/131/3a10456.png" />
    				<dl>
    					<dt>web developer</dt>
    					<dt>Company:</dt>
    					<dd><a href="http://www.webcanada.com" className="external">web canada inc</a></dd>
    				</dl>
    				<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien.</p>
    			</div>
    			
    			<div className="item item-visible item-experience">
    				<i className="icon-quote-right"></i>
    				<img src="https://media.licdn.com/media/p/1/005/00e/25c/087b2c4.png" alt=""/>
    				<dl>
    					<dt>Summer student, Public Affairs and Communications</dt>
    					<dt>Company:</dt>
    					<dd><a href="http://www.scma.com" className="external">Purchasing Management Association of Canada</a></dd>
    				</dl>
    				<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Suspendisse augue tellus, sollicitudin ut tristique, nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo.</p>
    			</div>
    			
    			<div className="item item-visible item-experience">
    				<i className="icon-quote-right"></i>
    				<img src="https://media.licdn.com/media/p/1/000/062/26a/35dd5f4.png" alt=""/>
    				<dl>
    					<dt>Support Staff</dt>
    					<dt>Company:</dt>
    					<dd><a href="http://www.scsu.ca" className="external">Scarborough Campus Students' Union</a></dd>
    				</dl>
    				<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Suspendisse augue tellus, sollicitudin ut tristique, nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo.</p>
    			</div>
    			
    			<div className="item item-visible item-experience">
    				<i className="icon-quote-right"></i>
    				<img src="https://media.licdn.com/media/p/6/000/1af/2f4/30528eb.png" alt=""/>
    				<dl>
    					<dt>Web Developer in Creative Group</dt>
    					<dt>Company:</dt>
    					<dd><a href="http://www.ariad.ca" className="external">Ariad Communications</a></dd>
    				</dl>
    				<p>Donec aliquam feugiat tincidunt. In vitae nunc lacus. Proin nisi neque, facilisis semper rutrum a, fermentum ut sapien. Nulla ac velit non est sollicitudin facilisis. Suspendisse augue tellus, sollicitudin ut tristique, nullam viverra vestibulum interdum. Suspendisse augue tellus, sollicitudin ut tristique ac, ornare in leo.</p>
    			</div>
    			
    			<a href="http://www.facebook.com/voky.com.ua" target="_blank" className="item item-visible item-small item-color-blue item-social">
    				<i className="icon-facebook"></i>
    				<p>Visit my Facebook page</p>				
    			</a>
    			
    			<a href="http://dribbble.com/voky" target="_blank" className="item item-visible item-small item-color-pink item-social">
    				<i className="foundicon-dribbble"></i>
    				<p>Explore my Dribbble shots</p>
    			</a>
    			
    			<a className="item item-visible item-small item-color-orange item-social">
    				<i className="foundicon-rss"></i>
    				<p>Grab my RSS feed</p>
    			</a>
    			
    			<a href="#" className="item item-visible item-small item-color-red item-social">
    				<i className="foundicon-youtube"></i>
    				<p>Watch my YouTube videos</p>
    			</a>
    			
    			<a href="#" className="item item-visible item-small item-color-green item-social">
    				<i className="icon-google-plus"></i>
    				<p>View my Google Plus profile</p>
    			</a>
    			
    			<a className="item item-visible item-small item-color-cyan item-social">
    				<i className="foundicon-skype"></i>
    				<p>MarkusFisher</p>
    			</a>
    			
    			<a className="item item-visible item-small item-color-yellow item-social">
    				<i className="icon-phone"></i>
    				<p>Phone number</p>
    			</a>
    			
    			<a id="item-map" className="item item-visible item item-color-orange item-social item-map">
    				<i className="icon-map-marker"></i>
    				<p><span>close</span>250 Elizabeth Street, Melbourne, Australia</p>
    				<div id="map" className="map"></div>
    			</a>
    			
    			<div id="item-email" className="item item-visible item-color-purple item-social item-email">
    				<p>Drop me a Line</p>
    				<i className="icon-envelope"></i>
    				<form action="">
    					<input type="text" name="name" maxlength="30" placeholder="Enter your name"/>
    					<input type="text" name="email" maxlength="50" placeholder="Enter your e-mail"/>
    					<textarea name="message" cols="1" rows="1" placeholder="Enter your message"></textarea>
    					<button type="submit">Submit</button>
    					<button type="button">Close</button>
    					<div className="error"></div>
    					<div className="success"></div>
    				</form>
    			</div>
    			
    			<a href="#" data-sort="10" id="item-next" className="item item-small item-color-green item-next">
    				<i className="icon-circle-arrow-up"></i>
    				<p>View next work</p>
    			</a>
    			
    			<a href="#" data-sort="100" id="item-prev" className="item item-small item-color-green item-prev">
    				<i className="icon-circle-arrow-down"></i>
    				<p>View previous work</p>
    			</a>
    			<a href="#" data-sort="10" id="item-newer" className="item item-small item-color-green item-newer">
    				<i className="icon-circle-arrow-up"></i>
    				<p>View newer post</p>
    			</a>
    			<a href="#" data-sort="10" id="item-older" className="item item-small item-color-green item-older">
    				<i className="icon-circle-arrow-down"></i>
    				<p>View older post</p>
    			</a>
    		</div>
        );
    }
});

ReactDOM.render(
    <Portfolio data={portfolios} />,
    document.getElementById('container')
);
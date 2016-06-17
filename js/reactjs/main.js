var backgroundData = {
    
        experiences: {
            work:[
                {
                    id : 1,
                    employer: "WebCanada Inc.",
                    position: "Web Developer",
                    start: "2013-10",
                    end: "present"
                },
                {
                    id : 2,
                    employer: "SCMA",
                    position: "Web Master",
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
            ]
            ,
            education:[
                {
                    id : 1,
                    school: "University of Toronto",
                    type: "University",
                    study: "Computer Science",
                    start: "2009-09",
                    end: "2013-04"
                },
                {
                    id : 2,
                    school: "Guangzhou No.2 Middle School",
                    type: "High School",
                    study: "Everything!!!!",
                    start: "2005-09",
                    end: "2008-05"
                }
            ]
            
        }
    ,
    
    skills: {
        coding: [
            {
                id : 1,
                name: "PHP",
                color: "aqua",
                qualify: "80%"
            },
            {
                id : 2,
                name: "CSS",
                color: "green",
                qualify: "80%"
            },
            {
                id : 3,
                name: "HTML5",
                color: "yellow",
                qualify: "90%"
            },
            {
                id : 4,
                name: "JS",
                color: "red",
                qualify: "70%"
            }
        ],
        tool: [
            {
                id : 1,
                name: "Jira",
                color: "yellow",
                qualify: "93%"
            },
            {
                id : 2,
                name: "Trello",
                color: "green",
                qualify: "85%"
            },
            {
                id : 3,
                name: "Photoshop",
                color: "blue",
                qualify: "40%"
            }
        ],
        language: [
            {
                id : 1,
                name: "English",
                color: "aqua",
                qualify: "80%"
            },
            {
                id : 2,
                name: "Cantonese",
                color: "blue",
                qualify: "95%"
            },
            {
                id : 3,
                name: "Mandarin",
                color: "red",
                qualify: "90%"
            }
        ]
    }
    
    };

var portfolioData = [
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
    ];

var MainContent = React.createClass({
    componentDidMount: function() {
        jQuery('#mainpage_accordion_area').tabs('section > .section_body', {
			tabs: 'section > .section_header > .section_title',
			effect : 'slide',
			slideUpSpeed: 600,
			slideDownSpeed: 600,
			onClick: function (e, tabIndex) {
				var tabs = jQuery('#mainpage_accordion_area section > .section_header > .section_title');
				var tab = tabs.eq(tabIndex);
				
				var QRphone = $QRphone;
				var QRemail = $QRemail;
				var QRsite = $QRsite;
				var QRadress = $QRadress;
				if (tab.hasClass('resume_section_title')) {					// Resume
					jQuery('.widget_skills .skills_row').each(function(){
						var wd = jQuery(this).find('.progress').attr('data-process');
						var processNode = jQuery(this).find('.progress');
						if(processNode.width() === 0) {
							processNode.animate({'width': wd}, 700);
						} else {
							processNode.css('width', '0');
							processNode.animate({'width': wd}, 800);
						}
						jQuery('.svg').addClass('vis');
					});
					if(jQuery('#resume .section_body').css('display') === 'none'){
						jQuery('#resume .section_body').parent().removeClass('open');
					}
					else {
						jQuery('#resume .section_body').parent().addClass('open');
					}
				}
				return false;
			},
			currentClose: true,
			anotherClose: false,
			initialIndex: -1
		});
    },
    render: function() {
        return (
            <div>
                <Background data={this.props.backgroundData} />
                <Portfolio data={this.props.portfolioData} />
                <ContactForm />
                <User />
            </div>
        );
    }
});

ReactDOM.render(
    <MainContent backgroundData={backgroundData} portfolioData={portfolioData} />,
    document.getElementById("mainpage_accordion_area")
);

// document.body.animate([
//     {'background': 'red'},
//     {'background': 'green'}
//   ], 1000);
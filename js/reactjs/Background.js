var Skills = React.createClass({
    render: function() {
        var codings = this.props.data.coding.map(function(coding){
            return (
                <div className="skills_row" key={coding.id}><span className="caption">{coding.name}</span><span className="progressbar"><span data-process={coding.qualify} className={"progress " + coding.color}><span className="value">{coding.qualify}</span></span></span></div>
            );
        });
        var tools = this.props.data.tool.map(function(tool){
            return (
                <div className="skills_row" key={tool.id}><span className={"legend " + tool.color}></span><span className="caption">{tool.name}</span></div>
            );
        });
        var languages = this.props.data.language.map(function(language){
            return (
                <div className="skills_row" key={language.id}><span className="caption">{language.name}</span><span className="progressbar"><span data-process={language.qualify} className={"progress " + language.color}></span></span></div>
            );
        });
        return(
            <div className="sidebar resume_sidebar">
                <aside className="widget widget_skills">
                  <h3 className="widget_title">Programming skills</h3>
                  <div className="widget_inner style_1">
                    {codings}
                  </div>
                </aside>
                <aside className="widget widget_skills">
                  <h3 className="widget_title">Tool Skills</h3>
                  <div className="widget_inner style_2">
                    {tools}
                    <div className="svg"> <svg xmlns="http://www.w3.org/2000/svg" className="piechart">
                      <path d="M66,66 L130,66  A64,64 0 0,1 57,129 z" fill="#327ea3"></path>
                      <path d="M66,66 L57, 129 A64,64 0 0,1 2,60 z" fill="#4ca5d0"></path>
                      <path d="M66,66 L2,  60  A64,64 0 0,1 34,11 z" fill="#6ca338"></path>
                      <path d="M66,66 L34, 11  A64,64 0 0,1 103,14 z" fill="#ffbc38"></path>
                      <path d="M66,66 L103,14  A64,64 0 0,1 130,66 z" fill="#e82c0c"></path>
                      <circle cx="66" cy="66" r="40" fill="#ffffff"></circle>
                      </svg> </div>
                  </div>
                </aside>
                <aside className="widget widget_skills" >
                  <h3 className="widget_title">Language skills</h3>
                  <div className="widget_inner style_3">
                  {languages}
                  </div>
                </aside>
              </div>
        );
    }
});

var Experience = React.createClass({
    render: function() {
        var works = this.props.data.work.map(function(work){
            return (
                <article className="post resume_post resume_post_2 odd" key={work.id}>
                  <div className="post_header resume_post_header">
                    <div className="resume_period"> <span className="period_from">{work.start}</span> - <span className="period_to period_present">{work.end}</span> </div>
                    <h4 className="post_title"><span className="post_title_icon aqua"></span><a href="post-text.html">{work.employer}</a></h4>
                    <h5 className="post_subtitle">{work.position}</h5>
                  </div>
                  <div className="post_body resume_post_body">
                    <p></p>
                  </div>
                </article>
            );
        });
        var educations = this.props.data.education.map(function(education){
            return (
                <article className="post resume_post resume_post_1" key={education.id}>
                  <div className="post_header resume_post_header">
                    <div className="resume_period"> <span className="period_from">{education.start}</span> - <span className="period_to">{education.end}</span> </div>
                    <h4 className="post_title"><span className="post_title_icon green"></span><a href="post-text.html">{education.school}</a></h4>
                    <h5 className="post_subtitle">{education.study}</h5>
                  </div>
                  <div className="post_body resume_post_body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                  </div>
                </article>
            );
        });
        return (
            
            <div className="wrapper resume_wrapper">
                <div className="category resume_category resume_category_1">
                  <div className="category_header resume_category_header">
                    <h3 className="category_title"><span className="category_title_icon aqua"></span>Employment</h3>
                  </div>
                  <div className="category_body resume_category_body">
                    {works}
                  </div>

                </div>

                <div className="category resume_category resume_category_2 odd">
                  <div className="category_header resume_category_header">
                    <h3 className="category_title"><span className="category_title_icon green"></span>Education</h3>
                  </div>
                  <div className="category_body resume_category_body">
                    {educations}
                  </div>
                </div>
            </div>
        );
    }
});

var Background = React.createClass({
    getInitialState: function() {
        return {
        }
    },
    render: function() {
        var experienceData = this.props.data.experiences;
        var skillData = this.props.data.skills;
        return(
            <section className="section resume_section" id="resume">
                <div id="resume_buttons"> <a target="_blank" id="resume_link" href="print.html"><span className="label">Print</span><span className="fa-print icon"></span></a> <a target="_blank" id="resume_link_download"><span className="label">Download</span><span className="fa-download icon"></span></a> </div>
                <div className="section_header resume_section_header">
                  <h2 className="section_title resume_section_title" onClick={this.handleExpend}><a href="#"><span className="icon fa-align-left"></span><span className="section_name">Resume</span></a><span className="section_icon"></span></h2>
                </div>
                <div className="section_body" id="resume_section_body">
                    <div className="wrapper">
                        <Skills data={skillData} />
                        <Experience data={experienceData} />
                    </div>
                </div>
            </section>
        );
    }
});

window.Background = Background;
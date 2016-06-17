var socialLinks = [
    {key: "fb", title: "Facebook", link: "http://www.facebook.com"},
    {key: "tw", title: "Twitter", link: "http://www.twitter.com"},
    {key: "gplus", title: "Google+", link: "http://www.gplus.com"},
    {key: "lnkd", title: "Linkedin", link: "http://www.linkedin.com"},
    ];

var SocialLinks = React.createClass({
    render: function() {
        var socialNodes = this.props.data.map(function(socialLink){
            return (
                <li key={socialLink.key} className={socialLink.key}>
                    <a href={socialLink.link} target="_blank" title={socialLink.title}>{socialLink.title}</a>
                </li>
            );
        });
        return (
            <div className="social_links">
              <ul>
                {socialNodes}
              </ul>
            </div>
        );
    }
});

ReactDOM.render(
  <SocialLinks data={socialLinks} />,
  document.getElementById('header')
);
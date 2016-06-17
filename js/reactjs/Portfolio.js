var Portfolio = React.createClass({
    getInitialState: function() {
        return {
            expand: false,
            tags: [],
        }
    },
    
    filterTag: function(tag) {
        selectedTag = this.state.tags;
        if (selectedTag.indexOf(tag) != -1) {
            selectedTag.splice(selectedTag.indexOf(tag), 1);
        } else {
            selectedTag.push(tag);
        }
        this.setState({tags: selectedTag});
    },
    render: function() {
        var portfolios = this.props.data.map(function(portfolio){
            var tags = portfolio.tags.map(function(tag){
                return (
                    <a className="tag" key={tag}>{tag}</a>
                );
            });
            return (
                <article key={portfolio.id} className="post portfolio_post portfolio_post_1">
                    <div className="post_pic portfolio_post_pic"> <img src={portfolio.image} alt={portfolio.name} /> </div>
                    <h4 className="post_title"><a target="_blank" href={portfolio.url}>{portfolio.name}</a></h4>
                    <h5 className="post_subtitle">{tags}</h5>
                </article>
            );
        });
        return (
            <section className="section portfolio_section" id="portfolio">
                <div className="section_header portfolio_section_header">
                  <h2 className="section_title portfolio_section_title" onClick={this.handleExpend}><a href="#"><span className="icon fa-briefcase"></span><span className="section_name">Portfolio</span></a><span className="section_icon"></span></h2>
                </div>
                <div className="section_body" id="portfolio_section_body">
                    <div className="portfolio_wrapper">
                        <ul id="portfolio_iso_filters">
                          <li><a className="current" data-filter="*" href="#">All</a></li>
                          <li><a onclick={this.filterTag} href="#">Web</a></li>
                        </ul>
                        <div className="portfolio_items">
                            {portfolios}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
});

window.Portfolio = Portfolio;
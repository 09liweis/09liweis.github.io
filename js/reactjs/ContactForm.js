var ContactForm = React.createClass({
    getInitialState: function() {
        return {
            name: "",
            email: "",
            message: "",
            expand: false,
        };
    },
    handleNameChange: function(e) {
        this.setState({name: e.target.value})
    },
    handleEmailChange: function(e) {
        this.setState({email: e.target.value})
    },
    handleMessageChange: function(e) {
        this.setState({message: e.target.value})
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var name = this.state.name.trim();
        var email = this.state.email.trim();
        var message = this.state.message;
        return;
    },
    render: function() {
        return (
            <section className="section contact_section" id="contact">
                <div className="section_header contact_section_header">
                  <h2 className="section_title contact_section_title" onClick={this.handleExpand}><a href="#"><span className="icon fa-envelope"></span><span className="section_name">Contacts</span></a><span className="section_icon"></span></h2>
                </div>
                <div className="section_body" id="contact_section_body">
                  <div id="googlemap_data">
                  </div>
                  <div className="sidebar contact_sidebar">
                    <aside className="widget widget_qrcode_vcard" id="qrcode-vcard-widget-2">
                      <h3 className="widget_title">VCARD</h3>
                      <div className="widget_inner">
                        <div className="qrcode"></div>
                      </div>
                    </aside>
                  </div>
                  <div className="contact_form">
                    <div id="contact_form_data">
                        <div className="sc_contact_form">
                            <h3 className="title">Let's keep in touch</h3>
                            <form onSubmit={this.handleSubmit}>
                              <div className="field">
                                <label className="required" for="sc_contact_form_username">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="sc_contact_form_username"
                                    placeholder="Please enter name"
                                    value={this.state.name}
                                    onChange={this.handleNameChange}
                                />
                              </div>
                              <div className="field">
                                <label className="required" for="sc_contact_form_email">Email</label>
                                <input
                                    type="text"
                                    name="email"
                                    id="sc_contact_form_email"
                                    placeholder="Please enter email"
                                    value={this.state.email}
                                    onChange={this.handleEmailChange}
                                />
                              </div>
                              <div className="field message">
                                <label className="required" for="sc_contact_form_message">Your Message</label>
                                <textarea
                                    name="message"
                                    id="sc_contact_form_message"
                                    placeholder="Please enter message"
                                    value={this.state.message}
                                    onChange={this.handleMessageChange}
                                >
                                </textarea>
                              </div>
                              <div className="button"> <input className="enter" type="submit" value="submit"/></div>
                            </form>
                            <div className="result sc_infobox"></div>
                        </div>
                    </div>
                  </div>
                </div>
            </section>
        );
    }
});

window.ContactForm = ContactForm;
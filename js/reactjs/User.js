var UserAction = React.createClass({
    getInitialState: function() {
        return {
            email: "",
            password: "",
            action: this.props.action,
        };
    },
    
    handleEmailChange: function(e) {
        this.setState({email: e.target.value});
    },
    handlePasswordChange: function(e) {
        this.setState({password: e.target.value});
    },
    
    handleAction: function(e) {
        e.preventDefault();
        var email = this.state.email.trim();
        var password = this.state.password;
        this.props.handleAction({email: email, password: password, action: this.props.action});
    },
    
    render: function() {
        var emailInput = this.props.action != "logout" ? <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/> : "";
        var passwordInput = this.props.action != "logout" ? <input type="password" id="password" name="password" onChange={this.handlePasswordChange} /> : "";
        return (
            <form id={this.props.action} onSubmit={this.handleAction}>
                <label>{this.props.action}</label>
                {emailInput}
                {passwordInput}
                <input value={this.props.action} type="submit" />
            </form>
        );
    }
});

var UserComments = React.createClass({
    getInitialState: function() {
        return {
            
        }
    },
    render : function() {
        var comments = this.props.comments.map(function(comment){
            return (
                <div className="user-comment" key={comment.id}>
                {comment.content}
                </div>
            );
        });
        return (
            <div id="user-comments">
            <h2>Comments</h2>
            {comments}
            </div>
        );
    }
});

var AddComment = React.createClass({
    getInitialState: function() {
        return {
            user_id: this.props.user_id,
            content: "",
            action: "addComment"
        }
    },
    handleContentChange: function(e) {
        this.setState({content: e.target.value});
    },
    handleCommentSubmit: function(e) {
        e.preventDefault();
        this.props.handleCommentSubmit(this.state);
    },
    render: function() {
        return (
            <form id="add-comment" onSubmit={this.handleCommentSubmit}>
                <label>Add Comment</label>
                <textarea value={this.state.content} onChange={this.handleContentChange}></textarea>
                <input value="Add Comment" type="submit" />
            </form>
        );
    }
});

var User = React.createClass({
    getInitialState: function() {
        if (document.cookie === "") {
            return {
                uesr_id: "",
                user_email: "",
                comments: [],
                expand: false,
            };
        } else {
            var cookiesObj = this.parseCookie();
            return {
                user_id: cookiesObj.user_id,
                user_email: cookiesObj.user_email,
                comments: [],
                expand: false,
            };
        }
    },
    
    getComments: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/user/index.php");
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                this.setState({
                    user_id: this.state.user_id,
                    user_email: this.state.user_email,
                    comments: data
                });
            }
        }.bind(this)
        xhr.send("&action=getComments");
    },
    
    handleCommentSubmit: function(comment) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/user/index.php");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var postMsg;
        for (var property in comment) {
            postMsg += "&" + property + "=" + comment[property];
        }
        console.log(comment);
        console.log(postMsg);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var comments = this.state.comments;
                comments.push(comment);
                this.setState({
                    user_id: this.state.user_id,
                    user_email: this.state.user_email,
                    comments: comments
                });
            } else {
            }
        }.bind(this);
        xhr.send(postMsg);
    },
    
    handleAction: function(user) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/user/index.php");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        var postMsg;
        for (var property in user) {
            postMsg += "&" + property + "=" + user[property];
        }

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText);
                document.cookie = "user_id=" + data.id + ";";
                document.cookie = "user_email=" + data.email + ";";
                this.setState({
                    user_id: data.id,
                    user_email: data.email,
                    comments: this.state.comments});
            } else {
            }
        }.bind(this);
        xhr.send(postMsg);
    },
    
    handleLogout: function() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/user/index.php");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var data = JSON.parse(xhr.responseText);
                console.log(data);
                document.cookie = "user_id=;";
                document.cookie = "user_email=;";
                this.setState({
                    user_id: "", 
                    user_email: "", 
                    comments: this.state.comments
                });
            }
        }.bind(this);
        xhr.send("&action=logout");
        
    },
    
    componentDidMount: function() {
        var cookiesObj = this.parseCookie();
        this.getComments();
    },
    
    parseCookie: function() {
        var cookies = document.cookie.split(";")
        var cookiesObj = {};
        for (var index in cookies) {
            var cookie = cookies[index].split("=");
            cookiesObj[cookie[0].trim()] = cookie[1].trim();
        }
        return cookiesObj;
    },
    
    render: function() {
        var registerBlock = this.state.user_email ? "" : <UserAction handleAction={this.handleAction} action="register" />;
        var loginBlock = this.state.user_email ? "" : <UserAction handleAction={this.handleAction} action="login" />;
        var logoutBlock = this.state.user_email ? <UserAction handleAction={this.handleLogout} action="logout" /> : "";
        return (
            <section className="section contact_section" id="user">
                <div className="section_header contact_section_header">
                    <h2 className="section_title contact_section_title" onClick={this.handleExpand}>
                        <a href="#">
                            <span className="icon fa-envelope"></span>
                            <span className="section_name">User</span>
                        </a>
                        <span className="section_icon"></span>
                    </h2>
                </div>
                <div className="section_body" id="user_section_body">
                    <div id="user-wrapper">
                        {registerBlock}
                        {loginBlock}
                        {logoutBlock}
                        <div id="user-profile">
                            <span id="user_id">{this.state.user_id}</span>
                            <span id="user_email">{this.state.user_email}</span>
                        </div>
                        <UserComments comments={this.state.comments} />
                        <AddComment handleCommentSubmit={this.handleCommentSubmit} user_id={this.state.user_id}/>
                    </div>
                </div>
            </section>
        );
    },
});

window.User = User;
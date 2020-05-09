const React = require('react');

class GetButton extends React.Component{

    foobar=(event)=>{
        alert("clicked");
    }

    render(){
        // ReactDOM.render(this.content,document.getElementById)
        return(
            <button class="get-button" onClick={this.foobar}>Clickable</button>
        )
    }
}

module.exports= GetButton;
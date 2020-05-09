const React = require('react')

class Header extends React.Component{
    render(){
        return(
            <div>
            <h2 className="sub-page-title">Annasthesia's Marvelous Musical Automat</h2>
            <div className="mini-nav">
            <a href="/tracklist" className="big-button">Home</a>
            <a href="/tracklist/tagsearch" className="big-button">Tag Search</a>
            <a href="/tracklist/newtrack" className="big-button">Add New Track</a>
            </div>
            </div>
        )
    }
}

module.exports = Header;
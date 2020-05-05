const React = require('react');

class Index extends React.Component{
    render(){
        const {tracks} = this.props;
        return(
            <div>
                <h1>Annasthesia's Marvelous Musical Automat</h1>
                <ul>
                    {
                        tracks.map((track,index)=>{
                            return(
                                <li>
                                    <h3><a href={`/tracklist/track/${track.id}`}>{track.title}</a></h3>
                                    <p>{track.url}</p>
                                    <p>{track.genre}</p>
                                    <form action={`/tracklist/${track._id}?_method=DELETE`} method="POST">
                                        <input type="submit" value="delete"/>
                                    </form>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

module.exports = Index;
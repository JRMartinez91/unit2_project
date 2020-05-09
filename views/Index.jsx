const React = require('react');
const ReactDOM = require('react-dom')
const test = require('../scratchpad/test')
// const GetButton = require('./GetButton')

const handleClick=(e)=> {
e.preventDefault();
console.log('The link was clicked.');
} 

class Index extends React.Component{

// componentDidMount () {
//     const script = document.createElement("script");
//     script.src = "click_copy.js";
//     script.async = true;
//     document.body.appendChild(script);
// }
    constructor(props) {
    super(props);
    this.sayHello = this.sayHello.bind(this);
  }

  sayHello() {
    alert('Hello!');
  }

    testFunc(){
        alert("this is a test!")
    }

    render(){
        const {jukebox, searchParameter} = this.props;

        const artistDisplay = (searchParameter,artist) =>{
            if(searchParameter !== "artist"){
                return `Artist: ${artist}`
            }
        }
        const genreDisplay = (searchParameter,genre) => {
            if(searchParameter !== "genre"){
                return `Genre: ${genre}`
            }
        }
        const sourceDisplay = (searchParameter,source)=>{
            if(searchParameter !== "source"){
                return `Source: ${source}`
            }
        }

        return(
            <>
            <head>
                <link href="/style.css" rel="stylesheet"></link>
                <script src="../click_copy.js"></script>

            </head>
            <body>
                <h1>Annasthesia's Marvelous Musical Automat</h1>
                <nav>
                    <a className="big-button" href="/tracklist/newtrack">Add New Track</a>
                    <a className="big-button" href="/tracklist?search=genre">Sort by Genre</a>
                    <a className="big-button" href="/tracklist?search=artist">Sort by Artist</a>
                    <a className="big-button" href="/tracklist?search=source">Sort by Source</a>
                    <a className="big-button" href="/tracklist/tagsearch">Tag Search</a>
                </nav>
                <div>
                    {
                        //jukebox is an array-of-arrays that contains each group category as an element
                        jukebox.map((group,index)=>{
                            return(
                                <div className="outer-group-box">
                                    {/* we can asssume the first song in the category has the correct group name on hand. */}
                                    <h2 className="group-name">{group[0][searchParameter]}</h2>
                                    <div className="inner-group-box">
                                    {
                                        // each genre category is an array of tracks
                                        group.map((track,index)=>{
                                        return(
                                            <>
                                            <div className="title-card">
                                                <h3>{track.title}</h3>
                                                <textarea className="url-display">{"!play "+track.url}</textarea>
                                                {/* <a href="#" class="copy-button" onClick={()=>{alert("this is a test!")}}>It's a button!</button> */}
                                                {/* <p>{track.url}</p> */}
                                                {/* <p>{track.genre}</p> */}
                                                <div className="info-bar">
                                                    <div className="info-bar-box">{artistDisplay(searchParameter,track.artist)}</div>
                                                    <div className="info-bar-box">{sourceDisplay(searchParameter,track.source)}</div>
                                                    <div className="info-bar-box">{genreDisplay(searchParameter,track.genre)}</div>
                                                </div>
                                                <div className="options-bar">
                                                <a href={`/tracklist/track/${track.id}`} className="option-button view-button">View</a>
                                                <a href={`/tracklist/track/${track._id}/edit`} className="option-button edit-button">Edit</a>
                                                <form action={`/tracklist/${track._id}?_method=DELETE`} method="POST">
                                                    <input type="submit" value="Delete" className="option-button delete-button"/>
                                                </form>
                                                </div>
                                            </div>
                                            {/* // heres where the backside of the title card would go
                                            // with the options buttons and the information; */}
                                            </>
                                            )
                                        }) // end mapping over tracks
                                    }  
                                    </div>
                                </div>
                            ) 
                        }) //end mapping over groups
                    }
                </div> {/* end list of all tracks div */}
            </body>
            </>
        )
    }
}

module.exports = Index;
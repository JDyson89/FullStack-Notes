import React, {Component} from 'react';

class Songs extends Component {
    constructor(){
        super()
        this.state ={
            songs: [],
            artists: [],
        }
    } 

    componentDidMount() {
        this.getAllSongs();
        this.getAllArtists();
    } 

    getAllArtists = () => {
        fetch('http://localhost:3030/artists', {method: 'GET'})
        .then(res => res.json())
        .then(res => this.setState({artists: res}))
        .catch((error) => console.log(error))
    }

    addArtist = () => {
        let newArtists ={
            artists_name: this.state.artists_name,
            age: this.state.artists_age,
            genre: this.state.artists_genre
        }
        fetch('http://localhost:3030/artists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newArtists)
        })
        .then(this.getAllArtists)
        .catch(error => console.log(error))   
    }

    updateChange = (e) => {
        console.log([e.target.name], e.target.value)
        this.setState({[e.target.name]: e.target.value})
    }

    getAllSongs = () => {
        fetch('http://localhost:3030/songs', {method: 'GET'})
        .then(res => res.json())
        .then(res => this.setState({songs: res}))
        .catch((error) => console.log(error))
    }

    addSong = () => {
        let newSong ={
            song_name: this.state.songName,
            downloads: this.state.downloads
        }
        fetch('http://localhost:3030/songs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong)
        })
        .then(this.getAllSongs)
        .catch(error => console.log(error))
        
    } 

    render(){
        console.log(this.state)
        return (
            <div>
                <h1>Add Artist:</h1>
                <label>Artist Name:</label>
                <input name='artists_name' onChange={this.updateChange}></input>
                <label>Artist Age:</label>
                <input name='artists_age' onChange={this.updateChange}></input>
                <label>Artist Genre:</label>
                <input name='artists_genre' onChange={this.updateChange}></input>
                <button onClick={this.addArtist}>Submit</button>
                <h1>Add Songs:</h1>
                <label>Song Name:</label>
                <input name='songName' onChange={this.updateChange}></input>
                <label>Downloads:</label>
                <input name='downloads' onChange={this.updateChange}></input>
                <button onClick={this.addSong}>Submit</button>
                {this.state.songs.map(song => <h1 key={song.id}>{song.song_name}</h1>)}
                {this.state.artists.map(artists => <h1 key={artists.id}>{artists.artists_name}</h1>)}
            </div>
        )
    }
}

export default Songs
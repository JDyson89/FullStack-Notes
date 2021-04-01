const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: 'postgres',
    port: 5432,
});

//grabbing all songs
const getSongs = (request, response) => {
    pool.query("SELECT * FROM songs", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};

//grabbing songs from songs table  
const addSongs = (request, response) => {
    const { song_name, downloads } = request.body;
    pool.query(
        `INSERT INTO songs (song_name, downloads) VALUES ($1, $2)`,
        [song_name, downloads],
        (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results.rows);
        }
    );
};

  //grabbing artists
const getArtists = (request, response) => {
    console.log('got here')
        pool.query('SELECT * FROM artists', (error, results) => {
            console.log('wait')
            if(error) {
                console.log(error)
                throw error;
            }
            console.log('come on')
            response.status(200).json(results.rows);
            console.log('two')
        });
    };

//grabbing artists table and columns
const addArtists = (request, response) => {
    const { artists_name, age, genre } = request.body;
    pool.query(
        `INSERT INTO artists (artists_name, age, genre) VALUES ($1, $2, $3)`,
        [artists_name, age, genre],
        (error, results) => {
            if (error) {
                throw error;
            }
            response.status(200).json(results.rows);
        }
    );
};

module.exports = {
    getSongs,
    addSongs,
    getArtists,
    addArtists,
};
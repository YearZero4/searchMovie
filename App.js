const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express()
const PORT = process.env.PORT || 3010;
module.exports = app;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

async function search(name_movie) {
 try {
  const url = `https://api.themoviedb.org/3/search/movie?query=${name_movie}&api_key=fe21738233ba5e83ceb90796e5f9fb2c`;
  const response = await axios.get(url);
  return response.data;
 } catch (error) {
  console.error('Error:', error);
  return null;
 }
}


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'statics')));
app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'views', 'search.html'));
})

app.get('/results', async (req, res) => {
 const movieName = req.query.movie;
 if (!movieName) {
  return res.redirect('/');
 }
 const movies = await search(movieName);
 res.render('results', {
  movies,
  movieName
 });
});

if (require.main === module) {
 app.listen(PORT, () => {
   console.log(`SERVICIO ESCUCHANDO EN EL PUERTO => ${PORT}`);
 });
}

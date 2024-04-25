// TMDB Top Rated
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWMxYTc2M2IwMmUxYWRmOWM2OTQ3YWVlMTI4NDg2NSIsInN1YiI6IjY2MjcxMGExYjI2ODFmMDFhOTc1NmFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qnqvi1k5jWXfuPhpyJI2ULbgjv3eeZRZvNsVR3lPt1s',
  },
};

// API로부터 데이터 가져오는 fetch 유형
fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  options
)
  .then((response) => response.json())
  .then((data) => {
    let rows = data['results'];
    const cardList = document.querySelector('.cardContainer');
    cardList.innerHTML = '';

    rows
      .forEach((a) => {
        let _title = a['title'];
        let _overview = a['overview'];
        let _poster_path = a['poster_path'];
        let _vote_average = a['vote_average'];
        let _id = a['id'];

        let temp_html = `
        <div class="movie_card">
        <div class="movie_card" data-id="${_id}">
        <img class="movie_img" src="https://image.tmdb.org/t/p/w500${_poster_path}">
        <h3 class="movie_title">${_title}</h3>
        <p class="movie_detail">${_overview}</p>
        <p class="movie_star">Rating: ${_vote_average}</p>
        </div>
      </div>
        `;
        cardList.insertAdjacentHTML('beforeend', temp_html);

        const movieCards = document.querySelectorAll('.movie_card'); // :CSS 선택자를 이용하여 모든 요소를 선택합니다.
        movieCards.forEach((card) => {
          card.addEventListener('click', function () {
            let movieId = this.getAttribute('data-id'); // : 해당 요소의 속성 값을 가져옵니다.
            alert(`영화 id: ${movieId}`);
            history.back();
          });
        });
      })
      .catch((err) => console.error(err));
  });

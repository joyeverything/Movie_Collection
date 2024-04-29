// TMDB Top Rated
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWMxYTc2M2IwMmUxYWRmOWM2OTQ3YWVlMTI4NDg2NSIsInN1YiI6IjY2MjcxMGExYjI2ODFmMDFhOTc1NmFhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Qnqvi1k5jWXfuPhpyJI2ULbgjv3eeZRZvNsVR3lPt1s"
  }
};

// API로부터 데이터 가져오는 fetch 유형
fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
  .then((response) => response.json())
  .then((data) => {
    let rows = data["results"];

    const cardList = document.querySelector(".cardContainer");
    cardList.innerHTML = "";

    function showMovies(movieList) {
      movieList.forEach((a) => {
        let _title = a["title"];
        let _overview = a["overview"];
        let _poster_path = a["poster_path"];
        let _vote_average = a["vote_average"];
        let _id = a["id"];

        let temp_html = `
        <div class="movie_cardBox">
        <div class="movie_card" data-id="${_id}">
        <img class="movie_img" src="https://image.tmdb.org/t/p/w500${_poster_path}">
        <h3 class="movie_title">${_title}</h3>
        <p class="movie_detail">${_overview}</p>
        <p class="movie_star">Rating: ${_vote_average}</p>
        </div>
      </div>
        `;

        cardList.insertAdjacentHTML("beforeend", temp_html);
      });
    }
    showMovies(rows);

    // 검색 기능
    const searchInput = document.getElementById("main_input");
    const searchBtn = document.getElementById("main_button");

    searchBtn.addEventListener("click", (e) => {
      //검색 버튼에 클릭 이벤트 리스너 추가
      e.preventDefault(); //기본 동작 막음(페이지 새로고침 방지)
      const keyword = searchInput.value.trim().toLowerCase(); // 검색어 소문자 변환, 앞뒤 공백 제거 -> 일관성 있게 처리

      // 입력된 검색어와 일치하는 영화만 필터링하여 다시 렌더링
      const filteredMovies = rows.filter((movie) => movie.title.toLowerCase().includes(keyword));
      cardList.innerHTML = ""; // 기존 카드 모두 지우고
      filteredMovies.length > 0 ? showMovies(filteredMovies) : alert("검색 결과가 없습니다.");
    });

    // 카드 눌렀을 때 id alert 창
    const movieCards = document.querySelectorAll(".movie_card"); // :CSS 선택자를 이용하여 모든 요소를 선택합니다.
    movieCards.forEach((card) => {
      card.addEventListener("click", function () {
        let movieId = this.getAttribute("data-id"); // : 해당 요소의 속성 값을 가져옵니다.
        alert(`영화 id: ${movieId}`);
      });
    });
  });

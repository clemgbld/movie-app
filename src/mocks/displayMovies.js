import { rest } from "msw";
import { setupServer } from "msw/node";

export const server = setupServer(
  rest.get("https://api.themoviedb.org/3/discover/movie", (req, res, ctx) => {
    return res(
      ctx.json({
        page: 1,
        results: [
          {
            poster_path: "/53WqEWbwQQ3WsO6cOWkzNbym43.jpg",
            adult: false,
            overview: "test overview",
            realease_date: "2022",
            id: 550,
            original_title: "test movie",
            original_language: "english",
            title: "test movie",
            backdrop_path: "/53WqEWbwQQ3WsO6cOWkzNbym43.jpg",
            popularity: 45,
            vote_count: 55,
            video: false,
            vote_average: 6.1,
          },
        ],
        total_results: 1,
        total_pages: 1,
      })
    );
  })
);

export const serverOveride = (statusCode, message) => {
  server.use(
    rest.get("https://api.themoviedb.org/3/discover/movie", (req, res, ctx) => {
      return res(
        ctx.status(statusCode),
        ctx.json({
          status_code: statusCode,
          status_message: message,
        })
      );
    })
  );
};

export const serverOverideWithNoImages = () => {
  server.use(
    rest.get(`https://api.themoviedb.org/3/discover/movie`, (req, res, ctx) => {
      return res(
        ctx.json({
          page: 1,
          results: [
            {
              poster_path: null,
              adult: false,
              overview: "test overview",
              realease_date: "2022",
              id: 550,
              original_title: "test movie",
              original_language: "english",
              title: "test movie",
              backdrop_path: null,
              popularity: 45,
              vote_count: 55,
              video: false,
              vote_average: 6.1,
            },
          ],
          total_results: 1,
          total_pages: 1,
        })
      );
    })
  );
};

import {
  server,
  serverOveride,
  serverOverideWithNoImages,
  serverOverideForCaching,
} from "../../../../mocks/showDetails";
import { retrieveMovieDetailsSUT } from "./sut-builder";
import {
  fakeMovieId,
  fakeMovieIdCaching,
} from "../../../../mocks/fixtures/fakeMovieId";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("show the details(synopsis, background ect...) of the selected movie", () => {
  describe("get the details of a movie", () => {
    it("the list of film should be empty initially", () => {
      const { selectStatusDetails } = retrieveMovieDetailsSUT().build();
      expect(selectStatusDetails()).toBe("idle");
    });

    it("should have no data initially", () => {
      const { selectDetails } = retrieveMovieDetailsSUT().build();
      expect(selectDetails()).toEqual({});
    });

    it("should be able to retreive the details of the movie with his data corecty formated", async () => {
      const { retrieveMovieDetails, selectDetails, selectStatusDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      expect(selectStatusDetails()).toBe("idle");
      expect(selectDetails()).toEqual({
        adult: false,
        backdrop_path:
          "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        belongs_to_collection: null,
        budget: 63000000,
        genres: [
          {
            id: 18,
            name: "Drama",
          },
        ],
        homepage: "",
        id: 550,
        imdb_id: "tt0137523",
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 0.5,
        poster_path:
          "https://image.tmdb.org/t/p/w220_and_h330_face/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        production_companies: [
          {
            id: 508,
            logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
            name: "Regency Enterprises",
            origin_country: "US",
          },
          {
            id: 711,
            logo_path: null,
            name: "Fox 2000 Pictures",
            origin_country: "",
          },
          {
            id: 20555,
            logo_path: null,
            name: "Taurus Film",
            origin_country: "",
          },
          {
            id: 54050,
            logo_path: null,
            name: "Linson Films",
            origin_country: "",
          },
          {
            id: 54051,
            logo_path: null,
            name: "Atman Entertainment",
            origin_country: "",
          },
          {
            id: 54052,
            logo_path: null,
            name: "Knickerbocker Films",
            origin_country: "",
          },
          {
            id: 25,
            logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            name: "20th Century Fox",
            origin_country: "US",
          },
        ],
        production_countries: [
          {
            iso_3166_1: "US",
            name: "United States of America",
          },
        ],
        release_date: "1999-10-12",
        revenue: 100853753,
        runtime: "2h19",
        spoken_languages: [
          {
            iso_639_1: "en",
            name: "English",
          },
        ],
        status: "Released",
        tagline:
          "How much can you know about yourself if you've never been in a fight?",
        title: "Fight Club",
        video: false,
        vote_average: 78,
        vote_count: 3439,
        year: "1999",
      });
    });

    it("should be able to retrieve the details of the movie with his data corecty formated when there is no backdropPath and/or no posterPath", async () => {
      serverOverideWithNoImages();

      const { retrieveMovieDetails, selectDetails, selectStatusDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      expect(selectStatusDetails()).toBe("idle");
      expect(selectDetails()).toEqual({
        adult: false,
        backdrop_path: "/img/no-backdrop.jpg",
        belongs_to_collection: null,
        budget: 63000000,
        genres: [
          {
            id: 18,
            name: "Drama",
          },
        ],
        homepage: "",
        id: 550,
        imdb_id: "tt0137523",
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 0.5,
        poster_path: "/img/no-image.PNG",
        production_companies: [
          {
            id: 508,
            logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
            name: "Regency Enterprises",
            origin_country: "US",
          },
          {
            id: 711,
            logo_path: null,
            name: "Fox 2000 Pictures",
            origin_country: "",
          },
          {
            id: 20555,
            logo_path: null,
            name: "Taurus Film",
            origin_country: "",
          },
          {
            id: 54050,
            logo_path: null,
            name: "Linson Films",
            origin_country: "",
          },
          {
            id: 54051,
            logo_path: null,
            name: "Atman Entertainment",
            origin_country: "",
          },
          {
            id: 54052,
            logo_path: null,
            name: "Knickerbocker Films",
            origin_country: "",
          },
          {
            id: 25,
            logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            name: "20th Century Fox",
            origin_country: "US",
          },
        ],
        production_countries: [
          {
            iso_3166_1: "US",
            name: "United States of America",
          },
        ],
        release_date: "1999-10-12",

        revenue: 100853753,
        runtime: null,
        spoken_languages: [
          {
            iso_639_1: "en",
            name: "English",
          },
        ],
        status: "Released",
        tagline:
          "How much can you know about yourself if you've never been in a fight?",
        title: "Fight Club",
        video: false,
        vote_average: 78,
        vote_count: 3439,
        year: "1999",
      });
    });

    it("should set the status to loading before receiving the data", () => {
      const { retrieveMovieDetails, selectStatusDetails } =
        retrieveMovieDetailsSUT().build();

      retrieveMovieDetails(fakeMovieId);

      expect(selectStatusDetails()).toBe("loading");
    });

    it("should handle 401 error", async () => {
      serverOveride(401, "401 Unauthorized Error");
      const { selectErrorMessage, selectStatusDetails, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      expect(selectStatusDetails()).toBe("rejected");
      expect(selectErrorMessage()).toBe("401 Unauthorized Error");
    });

    it("should handle 401 error", async () => {
      serverOveride(404, "404 not found Error");

      const { selectErrorMessage, selectStatusDetails, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      expect(selectStatusDetails()).toBe("rejected");
      expect(selectErrorMessage()).toBe("404 not found Error");
    });
  });

  describe("Caching system", () => {
    it("the cache should be empty initially", () => {
      const { selectCache } = retrieveMovieDetailsSUT().build();

      expect(selectCache()).toEqual({});
    });

    it("should add data to the cache if it's not already in it", async () => {
      const { selectCache, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      expect(selectCache()).toEqual({
        [fakeMovieId]: {
          adult: false,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          belongs_to_collection: null,
          budget: 63000000,
          genres: [
            {
              id: 18,
              name: "Drama",
            },
          ],
          homepage: "",
          id: 550,
          imdb_id: "tt0137523",
          original_language: "en",
          original_title: "Fight Club",
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
          popularity: 0.5,
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          production_companies: [
            {
              id: 508,
              logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
              name: "Regency Enterprises",
              origin_country: "US",
            },
            {
              id: 711,
              logo_path: null,
              name: "Fox 2000 Pictures",
              origin_country: "",
            },
            {
              id: 20555,
              logo_path: null,
              name: "Taurus Film",
              origin_country: "",
            },
            {
              id: 54050,
              logo_path: null,
              name: "Linson Films",
              origin_country: "",
            },
            {
              id: 54051,
              logo_path: null,
              name: "Atman Entertainment",
              origin_country: "",
            },
            {
              id: 54052,
              logo_path: null,
              name: "Knickerbocker Films",
              origin_country: "",
            },
            {
              id: 25,
              logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
              name: "20th Century Fox",
              origin_country: "US",
            },
          ],
          production_countries: [
            {
              iso_3166_1: "US",
              name: "United States of America",
            },
          ],
          release_date: "1999-10-12",
          revenue: 100853753,
          runtime: "2h19",
          spoken_languages: [
            {
              iso_639_1: "en",
              name: "English",
            },
          ],
          status: "Released",
          tagline:
            "How much can you know about yourself if you've never been in a fight?",
          title: "Fight Club",
          video: false,
          vote_average: 78,
          vote_count: 3439,
          year: "1999",
        },
      });
    });

    it("shouldn't add the same data twice to the cache", async () => {
      const { selectCache, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      await retrieveMovieDetails(fakeMovieId);

      expect(selectCache()).toEqual({
        [fakeMovieId]: {
          adult: false,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          belongs_to_collection: null,
          budget: 63000000,
          genres: [
            {
              id: 18,
              name: "Drama",
            },
          ],
          homepage: "",
          id: 550,
          imdb_id: "tt0137523",
          original_language: "en",
          original_title: "Fight Club",
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
          popularity: 0.5,
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          production_companies: [
            {
              id: 508,
              logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
              name: "Regency Enterprises",
              origin_country: "US",
            },
            {
              id: 711,
              logo_path: null,
              name: "Fox 2000 Pictures",
              origin_country: "",
            },
            {
              id: 20555,
              logo_path: null,
              name: "Taurus Film",
              origin_country: "",
            },
            {
              id: 54050,
              logo_path: null,
              name: "Linson Films",
              origin_country: "",
            },
            {
              id: 54051,
              logo_path: null,
              name: "Atman Entertainment",
              origin_country: "",
            },
            {
              id: 54052,
              logo_path: null,
              name: "Knickerbocker Films",
              origin_country: "",
            },
            {
              id: 25,
              logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
              name: "20th Century Fox",
              origin_country: "US",
            },
          ],
          production_countries: [
            {
              iso_3166_1: "US",
              name: "United States of America",
            },
          ],
          release_date: "1999-10-12",
          revenue: 100853753,
          runtime: "2h19",
          spoken_languages: [
            {
              iso_639_1: "en",
              name: "English",
            },
          ],
          status: "Released",
          tagline:
            "How much can you know about yourself if you've never been in a fight?",
          title: "Fight Club",
          video: false,
          vote_average: 78,
          vote_count: 3439,
          year: "1999",
        },
      });
    });

    it("should be able to add multiple data to the cache", async () => {
      const { selectCache, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      serverOverideForCaching();

      await retrieveMovieDetails(fakeMovieIdCaching);

      expect(selectCache()).toEqual({
        [fakeMovieId]: {
          adult: false,
          backdrop_path:
            "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          belongs_to_collection: null,
          budget: 63000000,
          genres: [
            {
              id: 18,
              name: "Drama",
            },
          ],
          homepage: "",
          id: 550,
          imdb_id: "tt0137523",
          original_language: "en",
          original_title: "Fight Club",
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
          popularity: 0.5,
          poster_path:
            "https://image.tmdb.org/t/p/w220_and_h330_face/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
          production_companies: [
            {
              id: 508,
              logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
              name: "Regency Enterprises",
              origin_country: "US",
            },
            {
              id: 711,
              logo_path: null,
              name: "Fox 2000 Pictures",
              origin_country: "",
            },
            {
              id: 20555,
              logo_path: null,
              name: "Taurus Film",
              origin_country: "",
            },
            {
              id: 54050,
              logo_path: null,
              name: "Linson Films",
              origin_country: "",
            },
            {
              id: 54051,
              logo_path: null,
              name: "Atman Entertainment",
              origin_country: "",
            },
            {
              id: 54052,
              logo_path: null,
              name: "Knickerbocker Films",
              origin_country: "",
            },
            {
              id: 25,
              logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
              name: "20th Century Fox",
              origin_country: "US",
            },
          ],
          production_countries: [
            {
              iso_3166_1: "US",
              name: "United States of America",
            },
          ],
          release_date: "1999-10-12",
          revenue: 100853753,
          runtime: "2h19",
          spoken_languages: [
            {
              iso_639_1: "en",
              name: "English",
            },
          ],
          status: "Released",
          tagline:
            "How much can you know about yourself if you've never been in a fight?",
          title: "Fight Club",
          video: false,
          vote_average: 78,
          vote_count: 3439,
          year: "1999",
        },

        [fakeMovieIdCaching]: {
          adult: false,
          backdrop_path: "/img/no-backdrop.jpg",
          belongs_to_collection: null,
          budget: 63000000,
          genres: [
            {
              id: 18,
              name: "Drama",
            },

            {
              id: 19,
              name: "Action",
            },
          ],
          homepage: "",
          id: 551,
          imdb_id: "tt0137523",
          original_language: "en",
          original_title: "Fight Club",
          overview:
            'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
          popularity: 0.5,
          poster_path: "/img/no-image.PNG",
          production_companies: [
            {
              id: 508,
              logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
              name: "Regency Enterprises",
              origin_country: "US",
            },
            {
              id: 711,
              logo_path: null,
              name: "Fox 2000 Pictures",
              origin_country: "",
            },
            {
              id: 20555,
              logo_path: null,
              name: "Taurus Film",
              origin_country: "",
            },
            {
              id: 54050,
              logo_path: null,
              name: "Linson Films",
              origin_country: "",
            },
            {
              id: 54051,
              logo_path: null,
              name: "Atman Entertainment",
              origin_country: "",
            },
            {
              id: 54052,
              logo_path: null,
              name: "Knickerbocker Films",
              origin_country: "",
            },
            {
              id: 25,
              logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
              name: "20th Century Fox",
              origin_country: "US",
            },
          ],
          production_countries: [
            {
              iso_3166_1: "US",
              name: "United States of America",
            },
          ],
          release_date: "1999-10-12",
          revenue: 100853753,
          runtime: "2h19",
          spoken_languages: [
            {
              iso_639_1: "en",
              name: "English",
            },
          ],
          status: "Released",
          tagline:
            "How much can you know about yourself if you've never been in a fight?",
          title: "Fight Club",
          video: false,
          vote_average: 78,
          vote_count: 3439,
          year: "1999",
        },
      });
    });

    it("should be able to update data with elment from the cache", async () => {
      const { selectDetails, retrieveMovieDetails } =
        retrieveMovieDetailsSUT().build();

      await retrieveMovieDetails(fakeMovieId);

      serverOverideForCaching();

      await retrieveMovieDetails(fakeMovieIdCaching);

      await retrieveMovieDetails(fakeMovieId);

      expect(selectDetails()).toEqual({
        adult: false,
        backdrop_path:
          "https://image.tmdb.org/t/p/original/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        belongs_to_collection: null,
        budget: 63000000,
        genres: [
          {
            id: 18,
            name: "Drama",
          },
        ],
        homepage: "",
        id: 550,
        imdb_id: "tt0137523",
        original_language: "en",
        original_title: "Fight Club",
        overview:
          'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
        popularity: 0.5,
        poster_path:
          "https://image.tmdb.org/t/p/w220_and_h330_face/fCayJrkfRaCRCTh8GqN30f8oyQF.jpg",
        production_companies: [
          {
            id: 508,
            logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
            name: "Regency Enterprises",
            origin_country: "US",
          },
          {
            id: 711,
            logo_path: null,
            name: "Fox 2000 Pictures",
            origin_country: "",
          },
          {
            id: 20555,
            logo_path: null,
            name: "Taurus Film",
            origin_country: "",
          },
          {
            id: 54050,
            logo_path: null,
            name: "Linson Films",
            origin_country: "",
          },
          {
            id: 54051,
            logo_path: null,
            name: "Atman Entertainment",
            origin_country: "",
          },
          {
            id: 54052,
            logo_path: null,
            name: "Knickerbocker Films",
            origin_country: "",
          },
          {
            id: 25,
            logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png",
            name: "20th Century Fox",
            origin_country: "US",
          },
        ],
        production_countries: [
          {
            iso_3166_1: "US",
            name: "United States of America",
          },
        ],
        release_date: "1999-10-12",
        revenue: 100853753,
        runtime: "2h19",
        spoken_languages: [
          {
            iso_639_1: "en",
            name: "English",
          },
        ],
        status: "Released",
        tagline:
          "How much can you know about yourself if you've never been in a fight?",
        title: "Fight Club",
        video: false,
        vote_average: 78,
        vote_count: 3439,
        year: "1999",
      });
    });
  });
});

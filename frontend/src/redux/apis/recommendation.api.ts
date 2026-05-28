import baseApi from "../base_api/base.api";

const recommendationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPersonalizedRecommendations: build.query<Post[], void>({
      query: () => ({
        url: "/recommendations/personalized",
        method: "GET",
      }),

      providesTags: ["Recommendation"],
    }),
  }),
});

export const { useGetPersonalizedRecommendationsQuery } = recommendationApi;

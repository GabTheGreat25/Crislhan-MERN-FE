import { UserApi, ProductAPI } from "./services";

export const generateEndpoints = (builder) => {
  const endpoints = {};
  const combinedApis = { ...UserApi, ...ProductAPI };

  Object.keys(combinedApis).forEach((key) => {
    endpoints[key] = combinedApis[key](builder);
  });

  return endpoints;
};

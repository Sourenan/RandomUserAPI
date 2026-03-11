export type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
};

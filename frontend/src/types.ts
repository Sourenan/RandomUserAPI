export type LocationStreet = {
  number: number;
  name: string;
};

export type LocationCoordinates = {
  latitude: string;
  longitude: string;
};

export type LocationTimezone = {
  offset: string;
  description: string;
};

export type Location = {
  street: LocationStreet;
  city: string;
  state: string;
  country: string;
  postcode: string | number;
  coordinates: LocationCoordinates;
  timezone: LocationTimezone;
};

export type User = {
  login: { uuid: string };
  name: { first: string; last: string };
  picture: { thumbnail: string; large: string };
  location: Location;
};

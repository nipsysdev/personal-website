export interface AppRoute {
  viewRoute: ViewRoute;
  param?: string | number;
  timeStamp: number;
}

export enum ViewRoute {
  Terminal = "/",
  Whoami = "/whoami",
  Experience = "/experience",
  Blog = "/blog",
  Contact = "/contact",
}

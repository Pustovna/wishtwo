import { ZodIssue } from "zod";

type ActionResult<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: string | ZodIssue[] };

type User = {
  id: string;
  name: string;
  email: string;
  jwt: string;
};

type Account = {
  id: string | null;
  userId: string;
  name: string;
  tgId: string;
  tgUsername: string;
  friends?: string[];
  requests?: string[];
  recivedRequests?: string[];
};

type Friend = {
  userId: string;
  thigsInFavorites: Wish[];
};

type Wishlist = {
  id?: string;
  account: string;
  title: string;
  wishes?: Wish[];
};

type Wish = {
  id: string;
  wishlistId: string;
  title: string;
  description: string;
  price: number | null;
  link: string | null;
  image: string | null;
  thingId: string;
  rating: number;
};

type Thing = {
  id: string;
  title: string;
};

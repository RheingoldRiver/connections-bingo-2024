import data from "../../data.json";

export interface Category {
  name: string;
  difficulty: number;
  idx: number;
}

export const CATEGORY_SIZE = data.categories.length;

export const CATEGORIES = data.categories.map((cat) => {
  return {
    name: cat.name,
    difficulty: cat.difficulty,
    idx: cat.idx,
  };
});

export type Board = Book[];

export interface Book {
  url: string;
  title: string;
  subtitle?: string;
  author: string;
  hm: boolean;
  squareName: string;
  category: Category;
  eliminated: boolean;
}

export const initialBoard: Board = data.books.map((book) => {
  return {
    url: book.url,
    title: book.title,
    author: book.author,
    subtitle: book.subtitle,
    hm: book.hm,
    squareName: book.squareName,
    // reliant on category order, `idx` is NOT used to generate this association!
    // do not reorder!
    category: CATEGORIES[book.category],
    eliminated: false,
  };
});

export type GuessHistory = Category[][];

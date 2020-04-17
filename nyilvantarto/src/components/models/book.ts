import { Author } from "./author";
import { Publisher } from "./publisher";

export interface Book {
    title: string;
    pageNumber: number;
    publicationYear: number;
    publisher: Publisher;
    author: Author;
}
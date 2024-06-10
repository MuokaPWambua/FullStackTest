import { booksData } from '../data/books';
import { IFieldResolver } from '@graphql-tools/utils';

interface Book {
  title: string;
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
}

interface QueryArgs {
  title?: string; // Make the title argument optional
}

export const resolvers = {
  Query: {
    books: (_parent: any, args: QueryArgs): Book[] => {
      const { title } = args;
      if (title) {
        return booksData.filter(book => 
          book.title.toLowerCase().includes(title.toLowerCase())
        );
      }
      return booksData;
    },
  },
} as Record<string, Record<string, IFieldResolver<any, any, any>>>;

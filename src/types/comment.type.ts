import { UserType } from './user.type';

export type CommentType = {
  text: string;
  postDate: Date;
  rating: number;
  author: UserType;
};

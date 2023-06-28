import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { CommentConst } from '../comment.constant.js';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(CommentConst.MIN_LENGTH, CommentConst.MAX_LENGTH, { message: `Min length is ${CommentConst.MIN_LENGTH}, max is ${CommentConst.MAX_LENGTH}` })
  public text!: string;

  @IsInt({ message: 'Rating must be a number' })
  @Min(CommentConst.MIN_RATING, { message: `Min value must be ${CommentConst.MIN_RATING}` })
  @Max(CommentConst.MAX_RATING, { message: `Max value must be ${CommentConst.MAX_RATING}` })
  public rating!: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}

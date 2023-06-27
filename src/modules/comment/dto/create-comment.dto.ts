import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';
import { MAX_COMMENT_LENGTH, MAX_RATING_VALUE, MIN_COMMENT_LENGTH, MIN_RATING_VALUE } from '../comment.constant';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH, { message: `Min length is ${MIN_COMMENT_LENGTH}, max is ${MAX_COMMENT_LENGTH}` })
  public text!: string;

  @IsInt({ message: 'Rating must be a number' })
  @Min(MIN_RATING_VALUE, { message: `Min value must be ${MIN_RATING_VALUE}` })
  @Max(MAX_RATING_VALUE, { message: `Max value must be ${MAX_RATING_VALUE}` })
  public rating!: number;

  @IsMongoId({ message: 'offerId field must be a valid id' })
  public offerId!: string;

  public userId!: string;
}

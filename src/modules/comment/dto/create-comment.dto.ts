import { IsInt, IsMongoId, IsString, Length, Max, Min } from 'class-validator';

export default class CreateCommentDto {
  @IsString({ message: 'text is required' })
  @Length(5, 1024, { message: 'Min length is 5, max is 1024' })
  public text!: string;

  @IsInt({ message: 'Rating must be a number' })
  @Max(5, { message: 'Max value must be 5' })
  @Min(1, { message: 'Min value must be 1' })
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  @IsMongoId({message: 'userId field must be a valid id'})
  public userId!: string;
}

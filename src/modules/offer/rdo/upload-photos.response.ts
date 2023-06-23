import { Expose } from 'class-transformer';

export default class UploadPhotosResponse {
  @Expose()
  public photo!: string[];
}

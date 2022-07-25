import {IsString} from 'class-validator';

export default class SearchPersonRequest {
  @IsString()
  public name!: string;

  @IsString()
  public surname!: string;
}

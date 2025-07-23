import { PartialType } from '@nestjs/mapped-types';
import { CreateImageSliderDto } from './create-image-slider.dto';

export class UpdateImageSliderDto extends PartialType(CreateImageSliderDto) {} 
export class CreateImageSliderDto {
  image_data: any; // Buffer hoặc string base64
  display_order: number;
  title?: string;
  subtitle?: string;
  title_en?: string;
  subtitle_en?: string;
  status?: 'Active' | 'Inactive';
} 
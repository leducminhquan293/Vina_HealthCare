import { Button } from './ui/button';

export function PricingHeader() {
  return (
    <div className="text-center py-12 bg-gradient-to-b from-primary/5 to-background">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">
          Dịch vụ chăm sóc sức khỏe
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Chọn gói dịch vụ phù hợp với nhu cầu của bạn. Tất cả các gói đều được thiết kế 
          để mang lại dịch vụ chăm sóc sức khỏe tốt nhất.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="px-8">
            Tư vấn miễn phí
          </Button>
          <Button size="lg" variant="outline" className="px-8">
            Xem thêm thông tin
          </Button>
        </div>
      </div>
    </div>
  );
}
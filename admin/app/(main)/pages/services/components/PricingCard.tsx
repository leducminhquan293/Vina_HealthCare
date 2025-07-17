import { ServicePrice, ServiceFeature } from '../types/services';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Check } from 'lucide-react';

interface PricingCardProps {
  price: ServicePrice & { features: ServiceFeature[] };
  serviceName: string;
  serviceIcon: string;
}

export function PricingCard({ price, serviceName, serviceIcon }: PricingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <Card className={`relative h-full ${price.is_popular ? 'border-primary shadow-lg scale-105' : ''}`}>
      {price.is_popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            Phổ biến
          </Badge>
        </div>
      )}
      
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <i className={`${serviceIcon} text-primary text-xl`}></i>
          </div>
        </div>
        <CardTitle className="text-lg">{price.price_description}</CardTitle>
        <CardDescription>{serviceName}</CardDescription>
        <div className="mt-4">
          <div className="text-3xl font-bold text-primary">{formatPrice(price.price)}</div>
          <div className="text-sm text-muted-foreground mt-1">một lần</div>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-3">
          {price.features.map((feature) => (
            <div key={feature.feature_id} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <div className="font-medium">{feature.feature_name}</div>
                {feature.feature_description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {feature.feature_description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-4">
        <Button 
          className={`w-full ${price.is_popular ? 'bg-primary hover:bg-primary/90' : ''}`}
          variant={price.is_popular ? 'default' : 'outline'}
        >
          Đặt lịch ngay
        </Button>
      </CardFooter>
    </Card>
  );
}
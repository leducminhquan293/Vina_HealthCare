import { ServiceWithPricing } from '../types/services';
import { PricingCard } from './PricingCard';
import { Badge } from './ui/badge';

interface ServiceSectionProps {
  serviceData: ServiceWithPricing;
}

export function ServiceSection({ serviceData }: ServiceSectionProps) {
  const { service, prices } = serviceData;
  
  const getPackageTypeColor = (packageType: string) => {
    switch (packageType) {
      case 'Basic':
        return 'bg-green-100 text-green-800';
      case 'Advanced':
        return 'bg-blue-100 text-blue-800';
      case 'Premium':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <i className={`${service.icon_name} text-primary text-2xl`}></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{service.service_name}</h2>
            <Badge className={getPackageTypeColor(service.package_type)}>
              {service.package_type}
            </Badge>
          </div>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {service.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prices.map((price) => (
          <PricingCard
            key={price.price_id}
            price={price}
            serviceName={service.service_name}
            serviceIcon={service.icon_name}
          />
        ))}
      </div>
    </section>
  );
}
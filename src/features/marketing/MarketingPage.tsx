import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { marketingData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface MarketingPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function MarketingPage({ searchQuery, onDetails }: MarketingPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(marketingData, searchQuery) : marketingData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<TrendingUp className="w-6 h-6" />}
        title="التسويق الرقمي"
        subtitle="أدوات وموارد التسويق الإلكتروني وتحسين محركات البحث"
        color="#e74c3c"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="marketing" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Zap } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { productivityData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface ProductivityPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function ProductivityPage({ searchQuery, onDetails }: ProductivityPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(productivityData, searchQuery) : productivityData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Zap className="w-6 h-6" />}
        title="الإنتاجية"
        subtitle="أدوات وتقنيات لزيادة إنتاجيتك وتنظيم وقتك"
        color="#f1c40f"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="productivity" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

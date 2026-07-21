import { Briefcase } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { businessData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface BusinessPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function BusinessPage({ searchQuery, onDetails }: BusinessPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(businessData, searchQuery) : businessData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Briefcase className="w-6 h-6" />}
        title="إدارة الأعمال"
        subtitle="موارد تعليمية في ريادة الأعمال والإدارة والقيادة"
        color="#2ecc71"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="business" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

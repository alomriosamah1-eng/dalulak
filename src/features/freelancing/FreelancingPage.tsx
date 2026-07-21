import { Globe } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { freelancingData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface FreelancingPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function FreelancingPage({ searchQuery, onDetails }: FreelancingPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(freelancingData, searchQuery) : freelancingData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Globe className="w-6 h-6" />}
        title="العمل الحر"
        subtitle="منصات وأدوات العمل الحر والاستقلالية المهنية"
        color="#1abc9c"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="freelancing" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

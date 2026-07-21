import { Palette } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { designData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface DesignPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function DesignPage({ searchQuery, onDetails }: DesignPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(designData, searchQuery) : designData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Palette className="w-6 h-6" />}
        title="التصميم والإبداع"
        subtitle="أدوات وموارد التصميم الجرافيكي وتجربة المستخدم والإبداع الرقمي"
        color="#e67e22"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="design" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

import { Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { toolsData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface ToolsPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function ToolsPage({ searchQuery, onDetails }: ToolsPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(toolsData, searchQuery) : toolsData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<Wrench className="w-6 h-6" />}
        title="أدوات الإنتاج المجانية"
        subtitle="أقوى الأدوات المجانية لتعزيز إنتاجيتك وإبداعك"
        color="#e67e22"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="tools" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

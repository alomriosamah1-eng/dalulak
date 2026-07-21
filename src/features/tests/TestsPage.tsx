import { ClipboardCheck } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { testsData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface TestsPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function TestsPage({ searchQuery, onDetails }: TestsPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(testsData, searchQuery) : testsData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<ClipboardCheck className="w-6 h-6" />}
        title="منصات الاختبارات والتقييم"
        subtitle="اختبر مهاراتك واحصل على تقييم مجاني لمستواك"
        color="#9b59b6"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="tests" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

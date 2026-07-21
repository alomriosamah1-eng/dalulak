import { BrainCircuit } from 'lucide-react';
import { useMemo } from 'react';
import { SectionHeader, EmptyState } from '../../components/ui';
import ResourceCard from '../../components/cards/ResourceCard';
import { aiData } from '../../data';
import { searchResources } from '../../services/search';
import type { Resource } from '../../types';

interface AiPageProps {
  searchQuery: string;
  onDetails: (resource: Resource) => void;
}

export default function AiPage({ searchQuery, onDetails }: AiPageProps) {
  const items = useMemo(
    () => (searchQuery ? searchResources(aiData, searchQuery) : aiData),
    [searchQuery]
  );

  return (
    <div>
      <SectionHeader
        icon={<BrainCircuit className="w-6 h-6" />}
        title="منصات وأدوات الذكاء الاصطناعي"
        subtitle="اكتشف أفضل منصات وأدوات الذكاء الاصطناعي المجانية لتعزيز إنتاجيتك وإبداعك"
        color="#8b5cf6"
      />
      {items.length === 0 ? (
        <EmptyState title="لا توجد نتائج مطابقة" description="جرب استخدام كلمات بحث أخرى" />
      ) : (
        <div className="stagger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} section="ai" onDetails={onDetails} />
          ))}
        </div>
      )}
    </div>
  );
}

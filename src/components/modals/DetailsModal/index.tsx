import { Modal, Badge } from '../../ui';
import { ExternalLink, Star, Target, FileText, Tags } from 'lucide-react';
import type { Resource } from '../../../types';

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  resource: Resource | null;
}

export default function DetailsModal({ isOpen, onClose, resource }: DetailsModalProps) {
  if (!resource) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resource.name}
      size="lg"
      footer={
        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="neu-button"
          >
            إغلاق
          </button>
          <a
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold hover:shadow-lg transition-all"
            style={{ background: 'var(--gradient-primary)', boxShadow: 'var(--shadow-glow-primary)' }}
          >
            <ExternalLink className="w-4 h-4" />
            تصفح المنصة
          </a>
        </div>
      }
    >
      <div className="space-y-6">
        <div>
          <h6 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Star className="w-4 h-4" /> الوصف
          </h6>
          <p className="text-second text-sm leading-relaxed">{resource.description}</p>
        </div>

        <div>
          <h6 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
            <Star className="w-4 h-4" /> الميزات
          </h6>
          <ul className="space-y-2">
            {resource.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-second">
                <span className="w-5 h-5 rounded-full bg-primary-soft flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h6 className="flex items-center gap-2 text-sm font-bold text-primary mb-2">
            <Target className="w-4 h-4" /> الاستخدام العملي
          </h6>
          <p className="text-second text-sm leading-relaxed">{resource.usage}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="neu-card p-4">
            <h6 className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
              <FileText className="w-3.5 h-3.5" /> الشروط
            </h6>
            <p className="text-second text-sm">{resource.conditions}</p>
          </div>
          <div className="neu-card p-4">
            <h6 className="flex items-center gap-2 text-xs font-bold text-primary mb-2">
              <Tags className="w-3.5 h-3.5" /> المستوى
            </h6>
            <p className="text-second text-sm">{resource.level}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="info">{resource.category}</Badge>
          <Badge variant="default">{resource.language}</Badge>
          {resource.isFree !== undefined && (
            <Badge variant={resource.isFree ? 'success' : 'warning'}>
              {resource.isFree ? 'مجاني' : resource.price || 'مدفوع'}
            </Badge>
          )}
          {resource.commission && (
            <Badge variant="warning">عمولة: {resource.commission}</Badge>
          )}
        </div>
      </div>
    </Modal>
  );
}

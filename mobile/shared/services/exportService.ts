import type { Resource } from '../types';
import type { ResourceExport } from '../types';

export interface ExportData {
  version: string;
  exportedAt: string;
  totalResources: number;
  resources: Resource[];
}

export class ExportService {
  exportToJson(resources: Resource[]): string {
    const data: ExportData = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      totalResources: resources.length,
      resources,
    };
    return JSON.stringify(data, null, 2);
  }

  exportToCSV(resources: Resource[]): string {
    const header = 'id,name,description,category,language,level,url';
    const rows = resources.map((r) =>
      [r.id, r.name, r.description, r.category || '', r.language, r.level, r.link || r.officialUrl || '']
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    );
    return [header, ...rows].join('\n');
  }

  exportToMarkdown(resources: Resource[]): string {
    let md = '# الموارد المصدرة\n\n';
    md += `تاريخ التصدير: ${new Date().toLocaleDateString('ar-SA')}\n\n`;
    for (const r of resources) {
      md += `## ${r.name}\n`;
      md += `${r.description}\n\n`;
      md += `- **التصنيف**: ${r.category || r.categoryId || 'عام'}\n`;
      md += `- **الرابط**: ${r.link || r.officialUrl || '—'}\n`;
      md += `- **اللغة**: ${r.language}\n`;
      md += `- **المستوى**: ${r.level}\n\n`;
    }
    return md;
  }
}

export const exportService = new ExportService();

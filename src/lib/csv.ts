import type { DictData, ObjectItem } from './types';

const EXPENSE_CLASS_LABELS: Record<string, string> = {
  '1': 'PS',
  '2': 'MOOE',
  '3': 'FE',
  '4': 'CO',
  '5': 'CO',
};

function escapeCell(val: unknown): string {
  if (val == null) return '';
  if (typeof val === 'number') return Number.isFinite(val) ? String(val) : '';
  const s = String(val);
  if (/["\n,]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export interface ObjectFilter {
  agencyId?: string;
  fpapId?: string;
  operatingUnitId?: string;
  fundId?: string;
  expenseId?: string;
  expenseClassCode?: string;
  year?: number;
  query?: string;
}

export function filterObjects(data: DictData, filter: ObjectFilter): ObjectItem[] {
  const ql = (filter.query || '').trim().toLowerCase();
  return data.objects.filter((o) => {
    if (!o.description || o.description === 'nan') return false;
    if (filter.agencyId && o.agency_id !== filter.agencyId) return false;
    if (filter.fpapId && o.fpap_id !== filter.fpapId) return false;
    if (filter.operatingUnitId && o.operating_unit_id !== filter.operatingUnitId) return false;
    if (filter.fundId && o.fund_id !== filter.fundId) return false;
    if (filter.expenseId && o.expense_id !== filter.expenseId) return false;
    if (filter.expenseClassCode) {
      const code = (o.expense_id || '').split('-').pop();
      if (code !== filter.expenseClassCode) return false;
    }
    if (filter.year != null) {
      const amt = o.years[filter.year]?.amount || 0;
      if (!amt) return false;
    }
    if (ql) {
      const hay = `${o.description} ${o.object_code} ${o.slug || ''}`.toLowerCase();
      if (!hay.includes(ql)) return false;
    }
    return true;
  });
}

export function objectsToCsv(data: DictData, objects: ObjectItem[], years: number[] = data.YEARS): string {
  const headers = [
    'department_id',
    'department',
    'agency_id',
    'agency',
    'fpap_id',
    'fpap_code',
    'fpap',
    'operating_unit_id',
    'operating_unit',
    'fund_id',
    'fund',
    'expense_id',
    'expense_class_code',
    'expense_class',
    'expense_class_description',
    'object_id',
    'object_code',
    'object_description',
    ...years.flatMap((y) => [`amount_${y}`, `count_${y}`]),
    'total_amount_php',
    'total_count',
  ];

  const expenseById = Object.fromEntries(data.expenses.map((e) => [e.id, e]));

  const rows: string[] = [headers.join(',')];

  for (const o of objects) {
    const agency = data.agencyById[o.agency_id];
    const fpap = data.fpapById[o.fpap_id];
    const opUnit = data.opUnitById[o.operating_unit_id];
    const fund = data.fundById[o.fund_id];
    const expense = expenseById[o.expense_id];
    const expCode = (o.expense_id || '').split('-').pop() || '';
    const expClass = EXPENSE_CLASS_LABELS[expCode] || '';

    let totalAmt = 0;
    let totalCnt = 0;
    const yearVals: (number | string)[] = [];
    for (const y of years) {
      const v = o.years[y]?.amount || 0;
      const c = o.years[y]?.count || 0;
      yearVals.push(v, c);
      totalAmt += v;
      totalCnt += c;
    }

    const row = [
      o.department_id,
      'Department of Information and Communications Technology',
      o.agency_id,
      agency?.description || '',
      o.fpap_id,
      fpap?.fpap_code || '',
      fpap?.description || '',
      o.operating_unit_id,
      opUnit?.description || '',
      o.fund_id,
      fund?.description || '',
      o.expense_id,
      expCode,
      expClass,
      expense?.description || '',
      o.id,
      o.object_code || '',
      o.description || '',
      ...yearVals,
      totalAmt,
      totalCnt,
    ]
      .map(escapeCell)
      .join(',');
    rows.push(row);
  }

  return rows.join('\n');
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

import type {
  Agency,
  DictData,
  Expense,
  ExpenseClassBreakdown,
  ExpenseClassMeta,
  FPAP,
  FPAPFamily,
  Fund,
  MoverEntry,
  ObjectItem,
  OperatingUnit,
  RawDataset,
  YearData,
  YearMap,
  YearlyTotalRow,
} from './types';

export const YEARS: number[] = [2020, 2021, 2022, 2023, 2024, 2025, 2026];
const SCALE = 1000;

export const EXPENSE_CLASS: Record<string, ExpenseClassMeta> = {
  '1': { key: 'PS', label: 'Personnel Services', color: 'var(--ec-ps)' },
  '2': { key: 'MOOE', label: 'Maintenance & Operating', color: 'var(--ec-mooe)' },
  '3': { key: 'FE', label: 'Financial Expenses', color: 'var(--ec-fe)' },
  '4': { key: 'CO', label: 'Capital Outlays', color: 'var(--ec-co)' },
  '5': { key: 'CO', label: 'Capital Outlays', color: 'var(--ec-co)' },
};

export function normName(s: string): string {
  return (s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .trim();
}

async function loadJson<T>(path: string): Promise<T> {
  const r = await fetch(path);
  if (!r.ok) throw new Error('Failed to load ' + path);
  return (await r.json()) as T;
}

function emptyYearMap(): YearMap {
  const m: YearMap = {};
  YEARS.forEach((y) => (m[y] = { count: 0, amount: 0 }));
  return m;
}

function rescale<T extends { years: YearMap }>(rec: T): T {
  const out: T = { ...rec, years: emptyYearMap() };
  YEARS.forEach((y) => {
    const src = rec.years as Record<string | number, YearData | undefined>;
    const s = src[y] || src[String(y)];
    if (s) {
      out.years[y].count = s.count || 0;
      out.years[y].amount = (s.amount || 0) * SCALE;
    }
  });
  return out;
}

function isNan(rec: { description?: string; slug?: string }): boolean {
  return (rec.description || '').toLowerCase() === 'nan' || (rec.slug || '') === 'nan';
}

export function totalOver(rec: { years: YearMap }, years: number[] = YEARS): number {
  return years.reduce((s, y) => s + (rec.years[y]?.amount || 0), 0);
}

export function maxOver(rec: { years: YearMap }, years: number[] = YEARS): number {
  return Math.max(...years.map((y) => rec.years[y]?.amount || 0));
}

export async function loadDictData(): Promise<DictData> {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const url = (p: string) => `${base}/data/${p}`;

  const [yearly, agencies, fpaps, opUnits, funds, expenses, objects] = await Promise.all([
    loadJson<RawDataset<{ year: number; count: number; amount: number }>>(url('yearly_totals.json')),
    loadJson<RawDataset<Agency>>(url('agencies.json')),
    loadJson<RawDataset<FPAP>>(url('fpaps.json')),
    loadJson<RawDataset<OperatingUnit>>(url('operating_units.json')),
    loadJson<RawDataset<Fund>>(url('fund_subcategories.json')),
    loadJson<RawDataset<Expense>>(url('expenses.json')),
    loadJson<RawDataset<ObjectItem>>(url('objects.json')),
  ]);

  const deptTotal: Record<number, YearData> = {};
  yearly.data.forEach((r) => {
    deptTotal[r.year] = { count: r.count, amount: r.amount * SCALE };
  });

  const agencyArr: Agency[] = agencies.data.filter((a) => !isNan(a)).map(rescale);
  const agencyById: Record<string, Agency> = Object.fromEntries(agencyArr.map((a) => [a.id, a]));

  const fpapArr: FPAP[] = fpaps.data
    .filter((f) => !isNan(f))
    .map(rescale)
    .filter((f) => totalOver(f) > 0);
  const fpapById: Record<string, FPAP> = Object.fromEntries(fpapArr.map((f) => [f.id, f]));

  const fpapsByAgency: Record<string, FPAP[]> = {};
  fpapArr.forEach((f) => {
    (fpapsByAgency[f.agency_id] ||= []).push(f);
  });

  const fpapFamiliesArr: FPAPFamily[] = [];
  {
    const byKey: Record<string, FPAPFamily> = {};
    fpaps.data
      .filter((f) => !isNan(f))
      .forEach((f) => {
        const key = f.agency_id + '|' + normName(f.description);
        if (!byKey[key]) {
          byKey[key] = {
            key,
            agency_id: f.agency_id,
            name: f.description,
            ids: [],
            years: emptyYearMap(),
          };
        }
        byKey[key].ids.push(f.id);
        YEARS.forEach((y) => {
          const src = f.years as Record<string | number, YearData | undefined>;
          const s = src[y] || src[String(y)];
          if (s) {
            byKey[key].years[y].count += s.count || 0;
            byKey[key].years[y].amount += (s.amount || 0) * SCALE;
          }
        });
      });
    Object.values(byKey).forEach((fam) => {
      if (totalOver(fam) > 0) fpapFamiliesArr.push(fam);
    });
  }

  const expenseArr: Expense[] = expenses.data.filter((e) => !isNan(e)).map(rescale);

  const expenseClassByAgencyYear: Record<string, Record<number, ExpenseClassBreakdown>> = {};
  const expenseClassByYear: Record<number, ExpenseClassBreakdown> = {};
  YEARS.forEach((y) => (expenseClassByYear[y] = { PS: 0, MOOE: 0, CO: 0, FE: 0 }));

  expenseArr.forEach((e) => {
    const cls = EXPENSE_CLASS[e.expense_code]?.key;
    if (!cls) return;
    const a = e.agency_id;
    if (!expenseClassByAgencyYear[a]) {
      expenseClassByAgencyYear[a] = {};
      YEARS.forEach((y) => (expenseClassByAgencyYear[a][y] = { PS: 0, MOOE: 0, CO: 0, FE: 0 }));
    }
    YEARS.forEach((y) => {
      const v = e.years[y]?.amount || 0;
      expenseClassByAgencyYear[a][y][cls] += v;
      expenseClassByYear[y][cls] += v;
    });
  });

  const opUnitArr: OperatingUnit[] = opUnits.data.filter((o) => !isNan(o)).map(rescale);
  const opUnitById: Record<string, OperatingUnit> = Object.fromEntries(opUnitArr.map((o) => [o.id, o]));

  const fundArr: Fund[] = funds.data.filter((o) => !isNan(o)).map(rescale);
  const fundById: Record<string, Fund> = Object.fromEntries(fundArr.map((o) => [o.id, o]));

  const objectArr: ObjectItem[] = objects.data.filter((o) => !isNan(o)).map(rescale);

  function topMovers(
    direction: 'up' | 'down' = 'up',
    year = 2026,
    prev = 2025,
    n = 6,
  ): MoverEntry[] {
    const moves: MoverEntry[] = fpapFamiliesArr.map((fam) => ({
      fam,
      delta: (fam.years[year]?.amount || 0) - (fam.years[prev]?.amount || 0),
    }));
    moves.sort((a, b) => (direction === 'up' ? b.delta - a.delta : a.delta - b.delta));
    return moves.slice(0, n);
  }

  const yearlyOut: YearlyTotalRow[] = yearly.data.map((r) => ({
    year: r.year,
    count: r.count,
    amount: r.amount * SCALE,
  }));

  return {
    YEARS,
    EXPENSE_CLASS,

    department: {
      id: '37',
      description: 'Department of Information and Communications Technology',
      years: deptTotal,
    },
    yearly: yearlyOut,

    agencies: agencyArr,
    agencyById,

    fpaps: fpapArr,
    fpapById,
    fpapsByAgency,
    fpapFamilies: fpapFamiliesArr,

    opUnits: opUnitArr,
    opUnitById,
    funds: fundArr,
    fundById,
    objects: objectArr,
    expenses: expenseArr,

    expenseClassByYear,
    expenseClassByAgencyYear,

    total: (y: number) => deptTotal[y]?.amount || 0,
    totalOver,
    maxOver,
    normName,
    topMovers,
  };
}

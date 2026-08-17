import { canDisplayAggregate } from '../../app/mockRules';
import type { AssessmentAggregate, Report } from '../../types/domain';

export function reportHasSufficientData(report: Pick<Report, 'scope' | 'departmentId' | 'assessmentIds'>, aggregates: AssessmentAggregate[]): boolean {
  if (report.scope === 'organization') return report.assessmentIds.every((assessmentId) => aggregates.some((item) => item.assessmentId === assessmentId && canDisplayAggregate(item.respondents)));
  if (!report.departmentId) return false;
  return report.assessmentIds.every((assessmentId) => aggregates.some((item) => item.assessmentId === assessmentId && item.departmentId === report.departmentId && canDisplayAggregate(item.respondents)));
}

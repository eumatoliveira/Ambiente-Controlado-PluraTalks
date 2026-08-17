import type { AssessmentAggregate, Department, Person, Plan } from '../types/domain';

export const ANONYMITY_THRESHOLD = 5;

export class MockValidationError extends Error {}
export class PlanLimitError extends Error {}
export class InsufficientResponsesError extends Error {}

export function usedSeats(people: Person[]): number {
  return people.filter(
    (person) => person.status === 'active' || person.invitationStatus === 'pending',
  ).length;
}

export function remainingSeats(plan: Plan, people: Person[]): number {
  return Math.max(plan.seatLimit - usedSeats(people), 0);
}

export function canInvite(plan: Plan, people: Person[]): boolean {
  return remainingSeats(plan, people) > 0;
}

export function canDisplayAggregate(respondents: number): boolean {
  return respondents >= ANONYMITY_THRESHOLD;
}

export function assertAggregateIsDisplayable(aggregate: AssessmentAggregate): void {
  if (!canDisplayAggregate(aggregate.respondents)) {
    throw new InsufficientResponsesError(
      `São necessárias pelo menos ${ANONYMITY_THRESHOLD} respostas para exibir este grupo.`,
    );
  }
}

export function findDepartment(
  departments: Department[],
  departmentId: string,
): Department | undefined {
  return departments.find((department) => department.id === departmentId);
}

export function normalizeComparable(value: string): string {
  return value.trim().toLocaleLowerCase('pt-BR');
}

export function assertUniqueDepartmentName(
  departments: Department[],
  name: string,
  ignoredId?: string,
): void {
  const normalized = normalizeComparable(name);
  const duplicated = departments.some(
    (department) =>
      department.id !== ignoredId && normalizeComparable(department.name) === normalized,
  );

  if (duplicated) {
    throw new MockValidationError('Já existe uma área com este nome.');
  }
}

export function assertUniquePersonEmail(
  people: Person[],
  email: string,
  ignoredId?: string,
): void {
  const normalized = normalizeComparable(email);
  const duplicated = people.some(
    (person) => person.id !== ignoredId && normalizeComparable(person.email) === normalized,
  );

  if (duplicated) {
    throw new MockValidationError('Já existe uma pessoa com este e-mail.');
  }
}

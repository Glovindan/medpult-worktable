/** Статус SLA. TODO: На будущую проработку */
export enum SlaStatus {
  /** Нормально */
  ok,
  /** Срок подходит к концу */
  warning,
  /** Просрочено */
  overdue,
}
export type ActionResult<T = undefined> = T extends undefined
  ? { ok: boolean; error?: string }
  : { ok: boolean; data?: T; error?: string };

export type PaymentApprovalStatus = "pending" | "approved" | "rejected";

export type DeletableTable =
  | "registrations"
  | "attendance_records"
  | "materials"
  | "final_projects";

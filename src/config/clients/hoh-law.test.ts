/**
 * @file hoh-law validation rules tests
 * @description Tests that validation failures include field property for UI filtering
 */
import { describe, it, expect } from "vitest";
import { hohLawConfig } from "./hoh-law";
import medicalReportSchema from "../../clients/hoh-law/schemas/medical-report.json" with { type: "json" };

describe("hoh-law validation rules", () => {
  describe("medical_expense tag", () => {
    const medicalExpenseTag = hohLawConfig.tags.find(
      (t) => t.id === "medical_expense"
    )!;

    it("should return failure with field='total_amount_before_deductions' when missing", () => {
      const failures = medicalExpenseTag.validate!({});
      const totalFailure = failures.find((f) => f.ruleId === "total_required");

      expect(totalFailure).toBeDefined();
      expect(totalFailure!.field).toBe("total_amount_before_deductions");
    });

    it("should return failure with field='date' when missing", () => {
      const failures = medicalExpenseTag.validate!({});
      const dateFailure = failures.find((f) => f.ruleId === "date_required");

      expect(dateFailure).toBeDefined();
      expect(dateFailure!.field).toBe("date");
    });

    it("should return failure with field='provider_name' when missing", () => {
      const failures = medicalExpenseTag.validate!({});
      const providerFailure = failures.find((f) => f.ruleId === "provider_required");

      expect(providerFailure).toBeDefined();
      expect(providerFailure!.field).toBe("provider_name");
    });

    it("should return failure with field='cash_amount' when missing", () => {
      const failures = medicalExpenseTag.validate!({});
      const cashFailure = failures.find((f) => f.ruleId === "cash_required");

      expect(cashFailure).toBeDefined();
      expect(cashFailure!.field).toBe("cash_amount");
    });

    it("should return failure with field='total_amount_before_deductions' when not positive", () => {
      const failures = medicalExpenseTag.validate!({
        total_amount_before_deductions: 0,
        date: "2024-01-01",
        provider_name: "Test",
        cash_amount: 0,
      });
      const positiveFailure = failures.find((f) => f.ruleId === "total_positive");

      expect(positiveFailure).toBeDefined();
      expect(positiveFailure!.field).toBe("total_amount_before_deductions");
    });

    it("should return failure with field='cash_amount' when negative", () => {
      const failures = medicalExpenseTag.validate!({
        total_amount_before_deductions: 100,
        date: "2024-01-01",
        provider_name: "Test",
        cash_amount: -10,
      });
      const negativeFailure = failures.find((f) => f.ruleId === "cash_non_negative");

      expect(negativeFailure).toBeDefined();
      expect(negativeFailure!.field).toBe("cash_amount");
    });
  });

  describe("medical_report tag", () => {
    const medicalReportTag = hohLawConfig.tags.find(
      (t) => t.id === "medical_report"
    )!;

    it("should keep medical report schema aligned with validation fields", () => {
      const properties = medicalReportSchema.config.schema.properties as Record<string, unknown>;

      expect(properties.patient_name).toBeDefined();
      expect(properties.diagnosis).toBeDefined();
      expect(properties.type_of_injury).toBeDefined();
      expect(properties.summary_findings).toBeDefined();
      expect(properties.anatomical_findings).toBeDefined();
      expect(properties["patient name"]).toBeUndefined();
      expect(properties["exam test scores"]).toBeUndefined();
      expect(properties["high school test scores"]).toBeUndefined();
    });

    it("should return failure with field='patient_name' when missing", () => {
      const failures = medicalReportTag.validate!({});
      const patientFailure = failures.find((f) => f.ruleId === "patient_required");

      expect(patientFailure).toBeDefined();
      expect(patientFailure!.field).toBe("patient_name");
    });

    it("should accept complete medical report extraction data", () => {
      const failures = medicalReportTag.validate!({
        patient_name: "John Doe",
        diagnosis: "Left knee ligament injury",
        type_of_injury: "leg",
        summary_findings: ["Left knee pain", "MRI reviewed", "Physiotherapy recommended"],
        anatomical_findings: [
          { region: "knee", finding: "Ligament injury", is_serious: false },
        ],
      });

      expect(failures).toEqual([]);
    });
  });
});

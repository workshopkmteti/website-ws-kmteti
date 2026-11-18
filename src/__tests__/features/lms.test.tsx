import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {
  isCertificateEligible,
  isValidFinalProjectUrl,
  isValidMaterialFileSize,
} from "@/features/lms/eligibility";
import MaterialsView from "@/features/lms/MaterialsView";
import CertificateView from "@/features/lms/CertificateView";

describe("LMS Eligibility & Validation", () => {
  it("enforces final project submission and max 2 absences out of 6", () => {
    expect(isCertificateEligible(true, 0)).toBe(true);
    expect(isCertificateEligible(true, 2)).toBe(true);
    expect(isCertificateEligible(true, 3)).toBe(false);
    expect(isCertificateEligible(false, 1)).toBe(false);
  });

  it("allows only Google Drive, YouTube, or GitHub URLs for final project", () => {
    expect(isValidFinalProjectUrl("https://github.com/kmteti/project")).toBe(true);
    expect(isValidFinalProjectUrl("https://drive.google.com/file/d/123")).toBe(true);
    expect(isValidFinalProjectUrl("https://youtu.be/abc123")).toBe(true);
    expect(isValidFinalProjectUrl("https://example.com/random")).toBe(false);
    expect(isValidFinalProjectUrl("not-a-url")).toBe(false);
  });

  it("enforces 20 MB max size for training materials", () => {
    expect(isValidMaterialFileSize(1024)).toBe(true);
    expect(isValidMaterialFileSize(20 * 1024 * 1024)).toBe(true);
    expect(isValidMaterialFileSize(20 * 1024 * 1024 + 1)).toBe(false);
    expect(isValidMaterialFileSize(0)).toBe(false);
  });
});

describe("MaterialsView", () => {
  it("renders materials and Google Meet links and filters by program", () => {
    render(<MaterialsView />);

    expect(screen.getByText("Materi & Google Meet")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /Gabung Google Meet/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("link", { name: /Buka Materi/i }).length).toBeGreaterThan(0);

    fireEvent.change(screen.getByLabelText(/Filter program/i), {
      target: { value: "MatLab" },
    });
    expect(screen.getByText(/Introduction to Matlab/i)).toBeInTheDocument();
  });
});

describe("CertificateView", () => {
  it("validates final project URL and unlocks certificate download when eligible", () => {
    render(<CertificateView />);

    const downloadBtn = screen.getByRole("button", { name: /Unduh Sertifikat/i });
    expect(downloadBtn).toBeDisabled();

    const urlInput = screen.getByLabelText(/Link Final Project/i);
    fireEvent.change(urlInput, { target: { value: "https://invalid-site.com/file" } });
    fireEvent.click(screen.getByRole("button", { name: /Kumpulkan Final Project/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/Google Drive, YouTube, atau GitHub/i);

    fireEvent.change(urlInput, { target: { value: "https://github.com/kmteti/final-project" } });
    fireEvent.click(screen.getByRole("button", { name: /Kumpulkan Final Project/i }));

    expect(screen.getByRole("button", { name: /Unduh Sertifikat/i })).toBeEnabled();
  });
});

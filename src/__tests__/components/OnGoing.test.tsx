import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import OnGoing from "@/components/OnGoing";

describe("OnGoing Component", () => {
  beforeEach(() => {
    // Mock window.matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders the heading and program cards", () => {
    render(<OnGoing />);
    expect(screen.getByRole("heading", { name: /ON GOING/i })).toBeInTheDocument();
  });

  it("opens the details modal when clicking 'Selengkapnya'", async () => {
    render(<OnGoing />);
    
    // Get the first "Selengkapnya" button
    const buttons = screen.getAllByRole("button", { name: /selengkapnya/i });
    expect(buttons.length).toBeGreaterThan(0);
    
    // Click the first one (corresponding to IMAGE PROCESSING)
    fireEvent.click(buttons[0]);
    
    // Modal header or title should be displayed (expecting it to be in a dialog or custom markup)
    // We will use <h3> or <h2> for modal titles, let's assert with getByRole heading
    const modalTitle = screen.getByRole("heading", { name: /IMAGE PROCESSING/i, level: 3 });
    expect(modalTitle).toBeInTheDocument();
    
    // Description should be in the document
    expect(screen.getByText(/Pelatihan komprehensif mengenai teknik pengolahan citra/i)).toBeInTheDocument();
    
    // Modal close button should work (querying by aria-label)
    const closeBtn = screen.getByRole("button", { name: /tutup/i });
    fireEvent.click(closeBtn);
    
    // The modal should be closed
    expect(screen.queryByText(/Pelatihan komprehensif mengenai teknik pengolahan citra/i)).not.toBeInTheDocument();
  });

  it("closes the modal when pressing the Escape key", () => {
    render(<OnGoing />);
    const buttons = screen.getAllByRole("button", { name: /selengkapnya/i });
    fireEvent.click(buttons[0]);

    expect(screen.getByRole("heading", { name: /IMAGE PROCESSING/i, level: 3 })).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape", code: "Escape" });

    expect(screen.queryByRole("heading", { name: /IMAGE PROCESSING/i, level: 3 })).not.toBeInTheDocument();
  });

  it("toggles to syllabus view when clicking the syllabus tab button", () => {
    render(<OnGoing />);
    const buttons = screen.getAllByRole("button", { name: /selengkapnya/i });
    fireEvent.click(buttons[0]);

    // Main layout is shown (e.g. Google Meet / Lab Komputer)
    expect(screen.getByText(/Google Meet \/ Lab Komputer/i)).toBeInTheDocument();

    // Click Syllabus tab button
    const syllabusBtn = screen.getByRole("button", { name: /silabus pelatihan/i });
    fireEvent.click(syllabusBtn);

    // Header "Silabus" is displayed
    expect(screen.getByRole("heading", { name: /silabus/i, level: 4 })).toBeInTheDocument();
    // Meeting item in syllabus is displayed
    expect(screen.getByText(/Sesi 1: Setup & Intro to Image Processing/i)).toBeInTheDocument();

    // Click Info tab button to switch back
    const infoBtn = screen.getByRole("button", { name: /informasi pelatihan/i });
    fireEvent.click(infoBtn);

    // Main layout is back
    expect(screen.getByText(/Google Meet \/ Lab Komputer/i)).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /silabus/i, level: 4 })).not.toBeInTheDocument();
  });
});

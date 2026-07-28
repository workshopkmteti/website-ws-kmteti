import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CompetitionDetailPage from "@/app/competition/[id]/page";

const renderDetail = async (id: string) =>
  render(await CompetitionDetailPage({ params: Promise.resolve({ id }) }));

describe("CompetitionDetailPage", () => {
  it("previews the guidebook inline and links out to Drive", async () => {
    await renderDetail("ctf");
    expect(screen.getByTitle("Guidebook preview")).toHaveAttribute(
      "src",
      "/guidebooks/placeholder.pdf",
    );
    expect(screen.getByRole("link", { name: /open in new tab/i })).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  it("offers both submission uploads", async () => {
    await renderDetail("ctf");
    expect(screen.getByRole("button", { name: /submit requirements/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit your work/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/upload and drag the requirements here/i)).toHaveAttribute(
      "type",
      "file",
    );
    expect(screen.getByLabelText(/upload and drag your work here/i)).toHaveAttribute("type", "file");
  });

  it("shows every submission status row", async () => {
    await renderDetail("ctf");
    expect(screen.getByText("Submission status :")).toBeInTheDocument();
    expect(screen.getByText("Requirements status :")).toBeInTheDocument();
    expect(screen.getByText("Last modified :")).toBeInTheDocument();
    expect(screen.getByText("Time remaining :")).toBeInTheDocument();
  });

  it("shows Closed for a competition whose deadline has passed", async () => {
    await renderDetail("web-dev");
    expect(screen.getAllByText("Closed")).toHaveLength(2);
  });
});

/**
 * Tests for AppSidebar component.
 * @module components/layout/app-sidebar.test
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { AppSidebar } from "./app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

// Mock useSession hook
vi.mock("@/hooks/use-session", () => ({
  useSession: () => ({
    user: { email: "test@example.com" },
  }),
}));

// Mock supabase
vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: { signOut: vi.fn() },
  },
}));

// Configurable pathname for router mock
let mockPathname = "/cases";

// Mock TanStack Router
vi.mock("@tanstack/react-router", () => ({
  useLocation: () => ({ pathname: mockPathname }),
  useNavigate: () => vi.fn(),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock use-mobile hook
vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => false,
}));

/** Wrapper with SidebarProvider */
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>{children}</SidebarProvider>
);

describe("AppSidebar", () => {
  beforeEach(() => {
    mockPathname = "/cases";
  });

  it("renders logo", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByText("Sunder")).toBeInTheDocument();
  });

  it("renders the document workspace nav item", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByText("Workspace")).toBeInTheDocument();
  });

  it("does not render non-demo nav items", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.queryByText("Chat")).not.toBeInTheDocument();
    expect(screen.queryByText("Mission Control")).not.toBeInTheDocument();
    expect(screen.queryByText("Tasks")).not.toBeInTheDocument();
    expect(screen.queryByText("Automations")).not.toBeInTheDocument();
    expect(screen.queryByText("Memory")).not.toBeInTheDocument();
    expect(screen.queryByText("CRM")).not.toBeInTheDocument();
    expect(screen.queryByText("Knowledge")).not.toBeInTheDocument();
    expect(screen.queryByText("Channels")).not.toBeInTheDocument();
  });

  it("renders section headers", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByText("Documents")).toBeInTheDocument();
  });

  it("renders Settings in footer", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("renders user email", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("renders sign out button", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.getByRole("button", { name: /sign out/i })).toBeInTheDocument();
  });

  it("does not render old nav items", () => {
    render(<AppSidebar />, { wrapper });
    expect(screen.queryByText("Instructions")).not.toBeInTheDocument();
  });
});

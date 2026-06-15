/**
 * Tests for Cases Dashboard page.
 * @module routes/cases/index.test
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

// Mock the hooks
vi.mock("@/hooks/use-cases", () => ({
  useCases: vi.fn(() => ({
    data: [],
    isLoading: false,
    isError: false,
  })),
}));

vi.mock("@/hooks/use-session", () => ({
  useSession: vi.fn(() => ({
    user: { id: "user-123", email: "test@example.com" },
    isLoading: false,
  })),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signOut: vi.fn(),
    },
  },
}));

// Mock AppLayout to avoid sidebar dependencies in tests
vi.mock("@/components/layout/app-layout", () => ({
  AppLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-layout">{children}</div>
  ),
}));

// Mock CreateCaseDialog to avoid hook dependencies
vi.mock("@/components/cases/create-case-dialog", () => ({
  CreateCaseDialog: () => <div data-testid="create-case-dialog" />,
}));

// Import after mocks
import { CasesPage } from "./index.lazy";

const createTestRouter = () => {
  const rootRoute = createRootRoute();
  const casesRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/cases",
    component: () => <CasesPage />,
  });
  const routeTree = rootRoute.addChildren([casesRoute]);
  return createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/cases"] }),
  });
};

const renderWithProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  const router = createTestRouter();

  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

describe("CasesPage", () => {
  it("renders page title", async () => {
    renderWithProviders();
    expect(
      await screen.findByRole("heading", { name: "Workspace", level: 1 })
    ).toBeInTheDocument();
  });

  it("renders New button", async () => {
    renderWithProviders();
    expect(
      await screen.findAllByRole("button", { name: /new claim case/i })
    ).toHaveLength(2);
  });

  it("renders search input", async () => {
    renderWithProviders();
    expect(
      await screen.findByPlaceholderText(/search your folders by name/i)
    ).toBeInTheDocument();
  });

  it("shows empty state when no items", async () => {
    renderWithProviders();
    expect(await screen.findByText(/start with a claim case/i)).toBeInTheDocument();
    expect(await screen.findByText("Create case")).toBeInTheDocument();
    expect(await screen.findByText("Upload")).toBeInTheDocument();
    expect(await screen.findByText("Review")).toBeInTheDocument();
  });

  it("does not render old header with Dossier", async () => {
    renderWithProviders();
    await screen.findByRole("heading", { name: "Workspace", level: 1 });
    expect(screen.queryByText("Dossier")).not.toBeInTheDocument();
  });
});

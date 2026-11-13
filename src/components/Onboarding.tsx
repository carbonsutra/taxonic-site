import { FormEvent, useEffect, useState } from "react";

const API_URL = `${import.meta.env.ZUDOKU_PUBLIC_API_URL}admin/v1/api-keys`;

const PLANS_URL = `${import.meta.env.ZUDOKU_PUBLIC_API_URL}admin/v1/plans`;

interface Plan {
  id: number;
  code: string;
  name: string;
  validity_days: number | null;
  credits: number | null;
  status: string;
}

export default function Onboarding() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch(PLANS_URL, {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Unable to load available plans.");
        }

        const data: Plan[] = await response.json();

        const activePlans = data.filter((plan) => plan.status === "active");

        setPlans(activePlans);

        // Default to Free Trial
        const trialPlan = activePlans.find((plan) => plan.code === "trial");

        if (trialPlan) {
          setSelectedPlan(String(trialPlan.id));
        }
      } catch {
        setError("Unable to load plans. Please refresh and try again.");
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: trimmedEmail,
          plan_id: selectedPlan,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data?.message || "Unable to create your account. Please try again.",
        );
        return;
      }

      setSuccess(true);
      setEmail("");
    } catch {
      setError("Unable to connect to CarbonSutra. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatCredits = (credits: number | null) => {
    return credits === null
      ? "Unlimited credits"
      : `${credits.toLocaleString("en-IN")} credits`;
  };

  const formatValidity = (days: number | null) => {
    if (days === null) return "No expiry";
    return `${days} days validity`;
  };

  return (
    <div className="not-prose w-full">
      <div className="mx-auto flex min-h-[65vh] w-full items-center justify-center px-4 py-8">
        {!success ? (
          <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="px-6 py-6 sm:px-8">
              <div className="text-center">
                <h1 className="!m-0 !text-2xl !font-semibold !leading-tight text-foreground">
                  Get your Taxonic API key
                </h1>

                <p className="!mt-2 !mb-0 text-sm leading-6 text-muted-foreground">
                  Select a plan and enter your email address to get started.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-7 space-y-6">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    disabled={loading}
                    required
                    className="!m-0 h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm text-foreground shadow-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:opacity-60"
                  />
                </div>

                {/* Plan Selection */}
                <div>
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-foreground">
                      Select your plan
                    </label>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Choose the API access plan that suits your needs.
                    </p>
                  </div>

                  {loadingPlans ? (
                    <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
                      Loading available plans...
                    </div>
                  ) : plans.length === 0 ? (
                    <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
                      No active plans are currently available.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {plans.map((plan) => {
                        const isSelected = selectedPlan === String(plan.code);

                        return (
                          <button
                            key={plan.id}
                            type="button"
                            disabled={loading}
                            onClick={() => setSelectedPlan(String(plan.code))}
                            aria-pressed={isSelected}
                            className={`relative rounded-xl border p-4 text-left transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5 ring-2 ring-primary/15"
                                : "border-border bg-background hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-sm font-semibold text-foreground">
                                {plan.name}
                              </span>

                              <span
                                className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? "border-primary bg-primary"
                                    : "border-muted-foreground/40"
                                }`}
                              >
                                {isSelected && (
                                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                )}
                              </span>
                            </div>

                            <div className="mt-3 space-y-1.5">
                              <p className="text-sm font-medium text-foreground">
                                {formatCredits(plan.credits)}
                              </p>

                              <p className="text-xs text-muted-foreground">
                                {formatValidity(plan.validity_days)}
                              </p>
                            </div>

                            {plan.code === "trial" && (
                              <span className="mt-3 inline-block rounded-md bg-muted px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Get started free
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-destructive/20 bg-destructive/5 px-3.5 py-3 text-sm text-destructive"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading || loadingPlans || plans.length === 0}
                    className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-white/90"
                  >
                    {loading ? "Generating API key..." : "Generate API Key"}
                  </button>
                </div>
              </form>

              <div className="mt-6 border-t border-border pt-5 text-center">
                <p className="!m-0 text-xs text-muted-foreground">
                  Your API key will be sent to your registered email address.
                </p>
              </div>
            </div>

            <div className="border-t border-border px-6 py-4">
              <p className="!m-0 text-center text-xs text-muted-foreground">
                Already have an API key?{" "}
                <a
                  href="/api-playground"
                  className="font-medium text-foreground no-underline hover:underline"
                >
                  Open Playground
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-xl rounded-xl border border-border bg-card px-6 py-10 text-center shadow-sm sm:px-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 12.5L9.5 17L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400"
                />
              </svg>
            </div>

            <h1 className="!mt-5 !mb-0 !text-2xl !font-semibold text-foreground">
              Check your email
            </h1>

            <p className="!mt-2.5 !mb-0 text-sm leading-6 text-muted-foreground">
              Your Taxonic API key has been sent to your email address.
            </p>

            <div className="mt-6 rounded-lg border border-border bg-muted/20 p-4 text-left">
              <p className="!m-0 text-sm font-medium text-foreground">
                What's next?
              </p>

              <div className="mt-3 space-y-2.5 text-sm text-muted-foreground">
                <p>1. Check your inbox or Spam folder.</p>
                <p>2. Copy your API key.</p>
                <p>3. Open the API Playground and authorize your requests.</p>
              </div>
            </div>

            <a
              href="/api-playground"
              className="mt-6 flex h-11 w-full items-center justify-center rounded-lg border border-border bg-background px-4 text-sm font-medium text-foreground no-underline transition hover:bg-muted"
            >
              Open API Playground
            </a>

            <button
              type="button"
              onClick={() => {
                setSuccess(false);
                setError("");
              }}
              className="mt-4 text-sm text-muted-foreground transition hover:text-foreground"
            >
              Generate another API key
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

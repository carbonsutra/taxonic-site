import { useState } from "react";
import "../styles.css";

const BASE_URL = "https://api.usetaxonic.com";
const ENDPOINT = "/v1/classify";

type Tab = "authorization" | "body" | "headers";

const DEFAULT_BODY = JSON.stringify(
  {
    title: "50 Scientific Complex Algorithms of Practical Applications",
    description: "For Students of Bachelors and Masters Degrees",
    standard: "hecos",
    code_prefix: "",
    max_results: 3,
    min_score: 0.35,
  },
  null,
  2,
);

export default function ApiPlayground() {
  const [apiKey, setApiKey] = useState("");
  const [jsonBody, setJsonBody] = useState(DEFAULT_BODY);
  const [headers, setHeaders] = useState<Record<string, string>>({
    Accept: "application/json",
  });
  const [activeTab, setActiveTab] = useState<Tab>("body");
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState("");
  const [responseTime, setResponseTime] = useState("");
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    if (!apiKey.trim()) {
      setActiveTab("authorization");
      setStatus("API Key Required");
      setResponse(
        "Enter your Taxonic API key. It will be sent using the X-Taxonic-API-Key header.",
      );
      return;
    }

    let parsedBody: unknown;
    try {
      parsedBody = JSON.parse(jsonBody);
    } catch {
      setActiveTab("body");
      setStatus("Invalid JSON");
      setResponse(
        "The request body is not valid JSON. Check the syntax and try again.",
      );
      return;
    }

    setLoading(true);
    setResponse("");
    setStatus("");
    setResponseTime("");
    const start = performance.now();

    try {
      const requestHeaders: Record<string, string> = {
        Accept: "application/json",
        ...headers,
        "Content-Type": "application/json",
        "X-Taxonic-API-Key": apiKey.trim(),
      };

      const res = await fetch(`${BASE_URL}${ENDPOINT}`, {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify(parsedBody),
      });

      const elapsed = Math.round(performance.now() - start);
      setResponseTime(`${elapsed} ms`);
      setStatus(`${res.status} ${res.statusText}`);

      const text = await res.text();
      const contentType = res.headers.get("content-type") ?? "";
      if (contentType.includes("application/json")) {
        try {
          setResponse(JSON.stringify(JSON.parse(text), null, 2));
        } catch {
          setResponse(text || "(Empty response)");
        }
      } else {
        setResponse(text || "(Empty response)");
      }
    } catch (error) {
      setResponseTime(`${Math.round(performance.now() - start)} ms`);
      setStatus("Request Failed");
      setResponse(
        error instanceof Error
          ? `${error.message}\n\nIf this is a browser CORS error, allow this playground's origin in the Taxonic API CORS configuration.`
          : "Something went wrong while sending the request.",
      );
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: "body", label: "Body" },
    { id: "authorization", label: "Authorization" },
    { id: "headers", label: "Headers" },
  ];

  return (
    <div className="not-prose my-6 api-playground-container w-screen max-w-none">
      <div className="w-full min-w-0 overflow-hidden rounded-lg border bg-background shadow-sm">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div>
            <h2 className="m-0 text-base font-semibold">
              Taxonic API Playground
            </h2>
            <p className="m-0 mt-0.5 text-xs opacity-60">
              Test the Taxonic classification endpoint and inspect the API
              response.
            </p>
          </div>
          <span className="rounded border px-2 py-1 font-mono text-[10px] opacity-70">
            v3.0.0
          </span>
        </div>

        <div className="border-b bg-muted/20 px-4 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-blue-500/30 bg-blue-500/10 px-3 py-2 font-mono text-xs font-bold text-blue-600">
              POST
            </span>
            <code className="min-w-0 flex-1 break-all text-xs">
              {BASE_URL}
              {ENDPOINT}
            </code>
            <button
              onClick={sendRequest}
              disabled={loading}
              className="rounded-md border px-5 py-2 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
          <p className="m-0 mt-2 text-xs opacity-60">
            Classify a single item using a JSON request body.
          </p>
        </div>

        <div className="mt-4 border-b px-4">
          <div className="flex gap-5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-2.5 text-xs font-medium transition ${
                  activeTab === tab.id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-foreground" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-[220px] px-4 py-4">
          {activeTab === "body" && (
            <div>
              <div className="mb-3">
                <h3 className="m-0 text-xs font-semibold">Request Body</h3>
                <p className="m-0 mt-1 text-[11px] opacity-50">
                  application/json — edit the payload before sending.
                </p>
              </div>
              <div className="overflow-hidden rounded-md border">
                <textarea
                  value={jsonBody}
                  onChange={(e) => setJsonBody(e.target.value)}
                  className="min-h-[280px] w-full resize-y bg-background p-4 font-mono text-xs leading-relaxed outline-none"
                  spellCheck={false}
                />
              </div>
              <div className="mt-3 rounded-md border bg-muted/20 p-3">
                <p className="m-0 text-[11px] font-semibold">Request fields</p>
                <ul className="mb-0 mt-2 space-y-1 pl-4 text-[11px] opacity-70">
                  <li>
                    <code>title</code> — required item title or name.
                  </li>
                  <li>
                    <code>description</code> — optional context or summary.
                  </li>
                  <li>
                    <code>standard</code> — required taxonomy key, such as
                    hecos, thema, or lcsh.
                  </li>
                  <li>
                    <code>code_prefix</code> — optional comma-separated code
                    prefixes.
                  </li>
                  <li>
                    <code>max_results</code> — maximum matches to return (1–20;
                    default 5).
                  </li>
                  <li>
                    <code>min_score</code> — minimum score threshold (0–1;
                    default 0.35).
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "authorization" && (
            <div className="w-full min-w-0">
              <h3 className="m-0 text-xs font-semibold">
                API Key Authentication
              </h3>
              <p className="mt-1 text-[11px] opacity-50">
                This endpoint requires a Taxonic API key.
              </p>
              <div className="mt-4 rounded-md border">
                <div className="flex items-center justify-between border-b bg-muted/20 px-3 py-2">
                  <span className="text-xs font-medium">Taxonic API Key</span>
                  {apiKey && (
                    <span className="text-[10px] text-green-600">
                      Configured
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <label className="mb-1.5 block text-[11px] font-medium opacity-70">
                    X-Taxonic-API-Key
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Taxonic API key"
                    autoComplete="off"
                    className="h-9 w-full rounded-md border bg-background px-3 font-mono text-xs outline-none focus:ring-1"
                  />
                  <p className="mt-2 text-[10px] opacity-50">
                    Sent securely in the request header, not in the URL.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "headers" && (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="m-0 text-xs font-semibold">
                    Additional Request Headers
                  </h3>
                  <p className="mt-1 text-[11px] opacity-50">
                    These headers are sent with the request. Content-Type and
                    authentication are managed automatically.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setHeaders((previous) => ({ ...previous, "": "" }))
                  }
                  className="rounded-md border px-2.5 py-1.5 text-[10px] font-medium transition hover:bg-muted"
                >
                  + Add Header
                </button>
              </div>
              <div className="overflow-hidden rounded-md border">
                {Object.entries(headers).map(([key, value], index) => (
                  <div
                    key={`${key}-${index}`}
                    className="grid grid-cols-[1fr_1fr_32px] border-b last:border-b-0"
                  >
                    <input
                      value={key}
                      onChange={(e) =>
                        setHeaders((previous) => {
                          const updated: Record<string, string> = {};
                          Object.entries(previous).forEach(
                            ([oldKey, oldValue]) => {
                              updated[
                                oldKey === key ? e.target.value : oldKey
                              ] = oldValue;
                            },
                          );
                          return updated;
                        })
                      }
                      placeholder="Header name"
                      className="h-9 min-w-0 border-r bg-transparent px-3 font-mono text-xs outline-none"
                    />
                    <input
                      value={value}
                      onChange={(e) =>
                        setHeaders((previous) => ({
                          ...previous,
                          [key]: e.target.value,
                        }))
                      }
                      placeholder="Header value"
                      className="h-9 min-w-0 bg-transparent px-3 font-mono text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setHeaders((previous) => {
                          const updated = { ...previous };
                          delete updated[key];
                          return updated;
                        })
                      }
                      aria-label={`Remove ${key || "header"}`}
                      className="flex items-center justify-center text-xs opacity-40 transition hover:text-red-500 hover:opacity-100"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="border-t">
          <div className="flex items-center justify-between border-b bg-muted/20 px-4 py-2.5">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold">Response</span>
              {status && (
                <span
                  className={`font-mono text-[11px] ${
                    status.startsWith("2") ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status}
                </span>
              )}
              {responseTime && (
                <span className="font-mono text-[10px] opacity-50">
                  {responseTime}
                </span>
              )}
            </div>
            {response && (
              <button
                onClick={() => {
                  setResponse("");
                  setStatus("");
                  setResponseTime("");
                }}
                className="text-[10px] opacity-50 hover:opacity-100"
              >
                Clear
              </button>
            )}
          </div>
          {!response ? (
            <div className="flex min-h-[180px] items-center justify-center px-4 py-10 text-center">
              <div>
                <div className="text-xs font-medium opacity-60">
                  No response yet
                </div>
                <div className="mt-1 text-[10px] opacity-40">
                  Add your API key, configure the JSON body, and click Send.
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-black/[0.02] p-3 dark:bg-white/[0.02]">
              <pre className="max-h-[500px] overflow-auto rounded-md border bg-background p-4 font-mono text-[11px] leading-relaxed">
                {response}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

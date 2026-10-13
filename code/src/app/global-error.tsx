"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <main id="main" className="container-site section-space">
          <h1>Web2Go gặp lỗi hiển thị</h1>
          <button type="button" onClick={reset}>
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}

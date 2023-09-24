const RemoteApp = React.lazy(() => import("app2/App"));

function App() {
  return (
    <div>
      <React.Suspense fallback="Loading Remote App...">
        <RemoteApp />
      </React.Suspense>
    </div>
  );
}

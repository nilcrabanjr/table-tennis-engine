import {
  runDomainAudit,
} from "../domain";

export function HomePage() {
  const audit = runDomainAudit();

  const failedItems = audit.items.filter(
    (item) => !item.valid,
  );

  return (
    <section className="page">
      <h1>Table Tennis Engine</h1>

      <p>
        Stage 2 domain cleanup and consistency audit.
      </p>

      <div className="placeholder-panel">
        <h2>Domain audit</h2>

        <p>
          All major domain defaults and built-in presets are being
          validated together before simulation development begins.
        </p>

        <dl>
          <dt>Audit passed</dt>
          <dd>{audit.valid ? "Yes" : "No"}</dd>

          <dt>Systems checked</dt>
          <dd>{audit.checkedSystems}</dd>

          <dt>Total errors</dt>
          <dd>{audit.totalErrors}</dd>

          <dt>Valid systems</dt>
          <dd>
            {
              audit.items.filter(
                (item) => item.valid,
              ).length
            }
          </dd>

          <dt>Failed systems</dt>
          <dd>{failedItems.length}</dd>
        </dl>

        <h3>Audit results</h3>

        <ul>
          {audit.items.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              {": "}
              {item.valid
                ? "Valid"
                : `${item.errorCount} error(s)`}
            </li>
          ))}
        </ul>

        {failedItems.length > 0 && (
          <div>
            <h3>Validation errors</h3>

            {failedItems.map((item) => (
              <div key={item.name}>
                <h4>{item.name}</h4>

                <ul>
                  {item.errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
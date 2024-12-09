import React from "react";

const Invoices = ({ user, invoices }) => {
  if (!user) return null;

  return (
    <div>
      <h2>Your Invoices</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Cost</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Paid</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <React.Fragment key={invoice.id}>
              {invoice.items.map((item, index) => (
                <tr key={`${invoice.id}-${index}`}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.item}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    R{item.price.toFixed(2)}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {item.quantity}
                  </td>
                  {index === 0 && (
                    <td
                      style={{
                        border: "1px solid #ddd",
                        padding: "8px",
                        textAlign: "center",
                      }}
                      rowSpan={invoice.items.length}
                    >
                      R{invoice.total.toFixed(2)}
                    </td>
                  )}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
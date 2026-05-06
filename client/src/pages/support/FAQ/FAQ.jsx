import { useState } from "react";
import SupportLayout from "../SupportLayout";

const faqs = [
  { q: "How do I book a ride?", a: "Log in to your passenger account, enter your pickup and drop-off locations, select a vehicle type, and confirm. A nearby driver will be matched instantly." },
  { q: "Is my payment information secure?", a: "Yes. All payment data is encrypted using industry-standard TLS. We do not store card details on our servers — payments are processed by certified payment gateways." },
  { q: "How do I become a driver on SafeGo?", a: "Register as a driver, submit your license, vehicle details, and a photo ID. Our team reviews and approves your profile within 24–48 hours." },
  { q: "Can I cancel a ride after booking?", a: "Yes. You can cancel a booked ride from your dashboard. Cancellation charges may apply based on our Cancellation Policy after a driver has been assigned." },
  { q: "What if my driver doesn't show up?", a: "You can contact your driver via the app. If the driver cancels or doesn't arrive, you'll be automatically re-matched with another driver at no extra charge." },
  { q: "How are driver ratings calculated?", a: "Ratings are based on passenger feedback after each completed ride. Drivers with consistently low ratings are reviewed by our quality team." },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <SupportLayout icon="fa-circle-question" title="Frequently Asked Questions">
      <div className="support-section">
        {faqs.map((f, i) => (
          <div key={i} className="faq-item">
            <div className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <i className={`fa-solid fa-chevron-${open === i ? "up" : "down"}`} style={{ fontSize: 12, color: "var(--text-muted)" }} />
            </div>
            {open === i && <div className="faq-answer">{f.a}</div>}
          </div>
        ))}
      </div>
    </SupportLayout>
  );
}

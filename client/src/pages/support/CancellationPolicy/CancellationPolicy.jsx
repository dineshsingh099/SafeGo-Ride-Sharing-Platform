import SupportLayout from "../SupportLayout";

export default function CancellationPolicy() {
  return (
    <SupportLayout icon="fa-ban" title="Cancellation Policy">
      <div className="support-section">
        <h2>Passenger Cancellations</h2>
        <p>Cancellations made within 2 minutes of booking are free. After a driver has been assigned and accepted the ride, a cancellation fee of ₹30–₹50 may apply depending on the time elapsed.</p>
      </div>
      <div className="support-section">
        <h2>Driver Cancellations</h2>
        <p>Drivers who frequently cancel accepted rides may face penalties or account suspension. Passengers are automatically re-matched at no cost when a driver cancels.</p>
      </div>
      <div className="support-section">
        <h2>Refunds</h2>
        <p>Refunds for valid cancellations are processed within 3–5 business days to your original payment method. UPI refunds are typically faster (within 24 hours).</p>
      </div>
      <div className="support-section">
        <h2>No-Show Policy</h2>
        <p>If a passenger is not present at the pickup location within 5 minutes of the driver's arrival, the ride may be marked as a no-show and a cancellation fee applies.</p>
      </div>
    </SupportLayout>
  );
}

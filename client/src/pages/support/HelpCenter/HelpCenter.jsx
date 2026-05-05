import SupportLayout from "../SupportLayout";

export default function HelpCenter() {
  return (
    <SupportLayout icon="fa-headset" title="Help Center">
      <div className="support-section">
        <h2>Getting Started</h2>
        <p>Welcome to SafeGo Help Center. Find answers to common questions about booking rides, managing your account, payments, and more.</p>
      </div>
      <div className="support-section">
        <h2>Booking a Ride</h2>
        <p>To book a ride, log in to your passenger account, enter your pickup and drop-off locations, choose your vehicle type, and confirm your booking. A driver will be assigned within seconds.</p>
      </div>
      <div className="support-section">
        <h2>Driver Registration</h2>
        <p>To register as a driver, create a driver account, complete your profile with vehicle details and license information, and await verification from our team (usually within 24–48 hours).</p>
      </div>
      <div className="support-section">
        <h2>Payment & Billing</h2>
        <p>SafeGo supports cash, UPI, and card payments. Receipts are sent to your registered email after every completed ride. For refund requests, contact our support team.</p>
      </div>
      <div className="support-section">
        <h2>Contact Support</h2>
        <p>Email: support@safego.com | Phone: +91-800-SAFEGO (Mon–Sat, 9 AM – 9 PM)</p>
      </div>
    </SupportLayout>
  );
}

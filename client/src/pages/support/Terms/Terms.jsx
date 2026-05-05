import SupportLayout from "../SupportLayout";

export default function Terms() {
  return (
    <SupportLayout icon="fa-file-contract" title="Terms & Conditions">
      <div className="support-section">
        <h2>1. Acceptance of Terms</h2>
        <p>By using SafeGo, you agree to these Terms and Conditions. If you disagree with any part of these terms, you must not use our platform.</p>
      </div>
      <div className="support-section">
        <h2>2. User Accounts</h2>
        <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities under your account. Report unauthorized use immediately to support@safego.com.</p>
      </div>
      <div className="support-section">
        <h2>3. Prohibited Conduct</h2>
        <p>Users must not use SafeGo for unlawful purposes, harass other users or drivers, provide false information, or attempt to access systems without authorization. Violations may result in account termination.</p>
      </div>
      <div className="support-section">
        <h2>4. Liability</h2>
        <p>SafeGo acts as an intermediary between passengers and drivers. While we strive for safety and reliability, we are not liable for actions taken by third-party drivers or for indirect damages arising from use of the platform.</p>
      </div>
      <div className="support-section">
        <h2>5. Modifications</h2>
        <p>SafeGo reserves the right to modify these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the new Terms.</p>
      </div>
    </SupportLayout>
  );
}

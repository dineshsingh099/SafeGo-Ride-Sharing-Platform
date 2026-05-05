import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { authService } from "../../../services/authService";
import { useAsync } from "../../../hooks/useAsync";
import "../../Dashboard/DashboardLayout.css";
import "./Profile.css";

export default function DriverProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || "", phone: user?.phone || "", vehicleNo: user?.vehicleNo || "", licenseNo: user?.licenseNo || "" });
  const [success, setSuccess] = useState(false);
  const { loading, error, execute } = useAsync();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await execute(async () => {
      await authService.updateProfile(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    });
  };

  return (
    <>
      <div className="dash-page-title">
        <h1>Driver Profile</h1>
        <p>Update your profile and vehicle details.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-card dash-section">
          <div className="profile-avatar-section">
            <div className="profile-avatar-large" style={{ background: "var(--success)" }}>{user?.name?.[0]?.toUpperCase() || "D"}</div>
            <div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
              <span className="badge badge-success">Driver</span>
            </div>
          </div>
        </div>

        <div className="dash-section" style={{ flex: 1 }}>
          <div className="dash-section-header"><h3>Edit Driver Details</h3></div>

          {error && <div className="alert alert-error" style={{ marginBottom: 16 }}><i className="fa-solid fa-circle-exclamation" />{error}</div>}
          {success && <div className="alert alert-success" style={{ marginBottom: 16 }}><i className="fa-solid fa-circle-check" />Profile updated successfully!</div>}

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-user input-icon" />
                  <input type="text" name="name" value={form.name} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label>Phone</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-phone input-icon" />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>License No.</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-id-card input-icon" />
                  <input type="text" name="licenseNo" value={form.licenseNo} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label>Vehicle No.</label>
                <div className="input-wrapper">
                  <i className="fa-solid fa-car input-icon" />
                  <input type="text" name="vehicleNo" value={form.vehicleNo} onChange={handleChange} />
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <span className="spinner" /> : <><i className="fa-solid fa-floppy-disk" /> Save Changes</>}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

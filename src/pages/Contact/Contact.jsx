import React, { useState } from "react";
import Button from "../../components/Button/Button";
import "./Contact.scss";

function Contact() {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    bericht: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // fake delay
    setTimeout(() => {
      setLoading(false);
      setFormData({ naam: "", email: "", bericht: "" });
    }, 2000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="naam">Name</label>
            <input
              type="text"
              id="naam"
              name="naam"
              value={formData.naam}
              onChange={handleChange}
              placeholder="Your name"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className="form-input"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bericht">Message</label>
            <textarea
              id="bericht"
              name="bericht"
              value={formData.bericht}
              onChange={handleChange}
              placeholder="Your message..."
              rows="6"
              className="form-input"
              disabled={loading}
            />
          </div>

          <Button
            btnType="solid"
            size="large"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Contact;

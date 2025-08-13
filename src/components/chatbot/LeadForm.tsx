import React, { useState } from 'react';
import { User, Mail, Phone, Send, Loader2 } from 'lucide-react';
import { LeadData } from '../../types/chatbot';
import './chatbot.css';

interface LeadFormProps {
  onSubmit: (data: LeadData) => Promise<void>;
  isSubmitting?: boolean;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, isSubmitting = false }) => {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
  });
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const validateEmail = (email: string): boolean => {
    if (!email) return true; // Optional field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true; // Optional field
    // Indian phone number: 10 digits starting with 6-9, optional +91
    const phoneRegex = /^(\+91)?[6-9]\d{9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (field: keyof LeadData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LeadData> = {};
    
    // Check if at least one field is filled
    const hasAnyField = formData.name || formData.email || formData.phone;
    if (!hasAnyField) {
      setErrors({ name: 'Please fill at least one field', email: '', phone: '' });
      return false;
    }

    // Validate email format if provided
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone format if provided
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid Indian phone number (10 digits starting with 6-9, +91 is optional)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Filter out empty values
    const filteredData: LeadData = {};
    if (formData.name?.trim()) filteredData.name = formData.name.trim();
    if (formData.email?.trim()) filteredData.email = formData.email.trim().toLowerCase();
    if (formData.phone?.trim()) filteredData.phone = formData.phone.trim();

    try {
      await onSubmit(filteredData);
    } catch (error) {
      console.error('Lead submission error:', error);
    }
  };

  return (
    <div className="lead-form-container">
      <div className="lead-form-header">
        <div className="lead-form-icon">
          <User size={20} />
        </div>
        <div>
          <h4>Let's stay in touch!</h4>
          <p>Share your details so we can help you better (optional)</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="lead-form">
        {/* Name Field */}
        <div className="form-group">
          <div className="input-with-icon">
            <User className="input-icon" size={16} />
            <input
              type="text"
              placeholder="Your name"
              value={formData.name || ''}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`form-input ${errors.name ? 'error' : ''}`}
              disabled={isSubmitting}
              maxLength={100}
            />
          </div>
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <div className="input-with-icon">
            <Mail className="input-icon" size={16} />
            <input
              type="email"
              placeholder="your.email@example.com"
              value={formData.email || ''}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`form-input ${errors.email ? 'error' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <div className="input-with-icon">
            <Phone className="input-icon" size={16} />
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`form-input ${errors.phone ? 'error' : ''}`}
              disabled={isSubmitting}
            />
          </div>
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="lead-form-submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} />
              Submit
            </>
          )}
        </button>
        
        <p className="form-note">
          All fields are optional. We respect your privacy and will only use this information to provide better assistance.
        </p>
      </form>
    </div>
  );
};

export default LeadForm;
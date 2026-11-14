'use client';

import { useState } from 'react';
import { getAppCheckToken } from '@/lib/firebase/client';

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipModal({ isOpen, onClose }: PartnershipModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interestType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nativeEvent = e.nativeEvent as KeyboardEvent;
    if (nativeEvent.isComposing || nativeEvent.keyCode === 229) return;
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const token = await getAppCheckToken();
      const headers = new Headers({ 'Content-Type': 'application/json' });
      if (token) headers.set('X-Firebase-AppCheck', token);
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          subject: `Partnership Inquiry: ${formData.interestType}`,
          message: `Organization: ${formData.organization || 'Not provided'}\nInterest type: ${formData.interestType}\n\n${formData.message}`,
          company: '',
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? 'Your message could not be saved.');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', organization: '', interestType: '', message: '' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Your message could not be saved.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="partnership-dialog-title" className="bg-background rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between border-b">
          <h2 id="partnership-dialog-title" className="text-xl font-bold">Partner With Us</h2>
          <button
            onClick={onClose}
            className="text-primary-foreground/70 hover:text-primary-foreground transition"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-semibold text-foreground mb-2" role="status">Message Sent</h3>
              <p className="text-foreground/70">
                Thank you for reaching out. We&apos;ll be in touch soon to discuss partnership opportunities.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your organization name"
                />
              </div>

              {/* Interest Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Interest Type *
                </label>
                <select
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select interest type...</option>
                  <option value="Financial Support">Financial Support / Donation</option>
                  <option value="Mentorship">Mentorship / Volunteering</option>
                  <option value="Program Partnership">Program Partnership</option>
                  <option value="Equipment Donation">Equipment / In-Kind Donation</option>
                  <option value="Strategic Partnership">Strategic Partnership</option>
                  <option value="Employment">Employment Opportunities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Tell us about your partnership interest..."
                />
              </div>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div role="alert" className="bg-destructive/10 border border-destructive/30 text-destructive px-3 py-2 rounded-lg text-sm">
                  {submitError || 'Your message could not be saved. Please try again later.'}
                </div>
              )}
              <input type="text" name="company" autoComplete="off" tabIndex={-1} aria-hidden="true" className="sr-only" />

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-accent-foreground font-semibold py-2 rounded-lg transition"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Alternative Contact */}
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-foreground/70 mb-3">Or reach out directly:</p>
                <div className="space-y-2">
                  <a
                    href="mailto:info@avanmakerspace.org"
                    className="flex items-center text-primary hover:text-primary/80 transition text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@avanmakerspace.org
                  </a>
                  <a
                    href="https://wa.me/254116000415?text=Hello%20Avan%20Makerspace!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-600 hover:text-green-700 transition text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.99 1.534 9.84 9.84 0 00-2.878 3.285 9.823 9.823 0 001.15 11.695 9.82 9.82 0 005.205 2.402c.086.003.192.003.278.003a9.84 9.84 0 009.838-9.838c0-2.63-.67-5.194-1.949-7.489a9.82 9.82 0 00-6.654-3.989zM12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z" />
                    </svg>
                    +254 116 000 415
                  </a>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

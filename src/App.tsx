import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProgressIndicator } from './components/ProgressIndicator';
import { JobCreationForm, JobFormData } from './components/JobCreationForm';
import { ContactDetailsForm, ContactFormData } from './components/ContactDetailsForm';
import { DeliveryConfirmation } from './components/DeliveryConfirmation';
import { JobList } from './components/JobList';
import { saveJob, updateJobStatus } from './utils/jobStore';
import { OwlLogo } from './components/icons/OwlLogo';

const isDeliveryConfirmation = window.location.search.includes('confirm');
const isJobList = window.location.search.includes('jobs');
const isFirstVisit = !localStorage.getItem('podowl_visited');

function App() {
  const [step, setStep] = useState(1);
  const [jobData, setJobData] = useState<JobFormData | null>(null);
  const [showSplash, setShowSplash] = useState(isFirstVisit && !isJobList && !isDeliveryConfirmation);

  useEffect(() => {
    if (showSplash) {
      localStorage.setItem('podowl_visited', 'true');
      const timer = setTimeout(() => {
        setShowSplash(false);
        window.location.search = 'jobs';
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const handleJobCreation = (data: JobFormData) => {
    setJobData(data);
    setStep(2);
  };

  const handleContactSubmission = (data: ContactFormData) => {
    if (jobData) {
      saveJob(jobData, data);
      window.location.search = 'jobs';
    }
  };

  const handleDeliveryComplete = (signature: string) => {
    const consignmentNumber = new URLSearchParams(window.location.search).get('confirm');
    if (consignmentNumber) {
      updateJobStatus(consignmentNumber, 'Completed', signature);
      alert('Delivery confirmed! POD has been sent to the sender.');
      window.location.search = 'jobs';
    }
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-[#00BCD4] flex flex-col items-center justify-center text-white">
        <OwlLogo className="h-24 w-24 text-white mb-4" />
        <h1 className="text-2xl font-bold mb-2">PODOWL</h1>
        <p className="text-sm opacity-90">The Driver Friendly POD</p>
        <div className="w-48 h-1 bg-white/20 rounded-full mt-8 overflow-hidden">
          <div className="h-full bg-white rounded-full animate-[loading_2s_ease-in-out]" />
        </div>
      </div>
    );
  }

  if (isJobList) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <JobList />
      </div>
    );
  }

  if (isDeliveryConfirmation) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <DeliveryConfirmation onComplete={handleDeliveryComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-lg mx-auto pt-10 pb-12 px-4 lg:pb-16">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-900">
              {step === 1 ? 'Create Delivery Job' : 'Contact Details'}
            </h2>
            <p className="mt-1 text-sm text-center text-gray-600">
              {step === 1
                ? 'Enter the delivery details below'
                : 'Provide contact information for POD delivery'}
            </p>
          </div>

          <ProgressIndicator currentStep={step} totalSteps={2} />

          {step === 1 ? (
            <JobCreationForm onNext={handleJobCreation} />
          ) : (
            <ContactDetailsForm 
              onSubmit={handleContactSubmission}
              jobData={jobData || undefined}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
import { useState } from 'react'
import './MultiStepForm.css'

const steps = ['Name', 'Email', 'Date of Birth', 'Password']

type FormData = {
  name: string
  email: string
  dob: string
  password: string
}

const MultiStepForm = () => {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    dob: '',
    password: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    setError('')
  }

  const handleNext = () => {
    if (isCurrentStepValid()) {
      setStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
    setError('')
  }

  const handleSubmit = () => {
    if (isCurrentStepValid()) {
      setSubmitted(true)
    }
  }

  const isCurrentStepValid = () => {
    switch (step) {
      case 0:
        if (!formData.name.trim()) {
          setError('Name is required.')
          return false
        }
        break
      case 1:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setError('Enter a valid email address.')
          return false
        }
        break
      case 2:
        if (!formData.dob.trim()) {
          setError('Date of birth is required.')
          return false
        }
        break
      case 3:
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters.')
          return false
        }
        break
    }
    setError('')
    return true
  }

  if (submitted) {
    return (
      <div className="form-container success">
        <h2>Success!</h2>
        <p>
          <strong>Name:</strong> {formData.name}
        </p>
        <p>
          <strong>Email:</strong> {formData.email}
        </p>
        <p>
          <strong>DOB:</strong> {formData.dob}
        </p>
        <p>
          <strong>Password:</strong> {formData.password}
        </p>
      </div>
    )
  }

  return (
    <div className="form-container">
      <h2>
        Step {step + 1}: {steps[step]}
      </h2>

      {step === 0 && (
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
      )}

      {step === 1 && (
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
      )}

      {step === 2 && (
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
        />
      )}

      {step === 3 && (
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="button-group">
        {step > 0 && (
          <button onClick={handleBack} className="back-button">
            Back
          </button>
        )}
        {step < 3 && (
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        )}
        {step === 3 && (
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        )}
      </div>
    </div>
  )
}

export default MultiStepForm

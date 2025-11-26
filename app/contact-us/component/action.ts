export const submitContactForm = async (formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const response = await fetch('/contact-us/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    throw new Error('Failed to send message. Please try again.');
  }
};
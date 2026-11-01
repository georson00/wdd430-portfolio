

interface ContactCardProps {
    email: string;
    phone: string;
    linkedIn: string;
}

interface ContactInfoProps {
    contactInfo: ContactCardProps[];
}

export default function ContactCard ({ email, phone, linkedIn}: ContactCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-1">Email: {email}</p>
      <p className="text-gray-600 dark:text-gray-300 mb-1">Phone: {phone}</p>
      <p className="text-gray-600 dark:text-gray-300">LinkedIn: <a href={linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{linkedIn}</a></p>  


      
    </div>
  );
}
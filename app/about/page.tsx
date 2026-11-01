import ContactCard from "@/components/ContactCard";


export default function About() {
    const contactInfo = [
        {
            email: "georson00@gmail.com",
            phone: "+1 (516) 201-9783",
            linkedIn: "https://www.linkedin.com/in/nelsongeorges"
        }
    ];
    return (
        <main className="max-w-4x1 mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-gray-700">
                This about page shares information about me, my background, and my interests. I am a passionate web developer with experience in building modern web applications using technologies like React, Next.js, and Tailwind CSS. I enjoy learning new technologies and continuously improving my skills.
            </p>
            
            <ContactCard email={contactInfo[0].email} phone={contactInfo[0].phone} linkedIn={contactInfo[0].linkedIn} />
        </main>
        

    );
}


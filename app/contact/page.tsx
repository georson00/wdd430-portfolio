import ContactCard from "@/components/ContactCard";


export default function contactInfo(){

    const contactInfo = [
        {
            email: "georson00@gmail.com",
            phone: "+1 (516) 201-9783",
            linkedIn: "https://www.linkedin.com/in/nelsongeorges"
        }
    ];
    return(
        <main>
            
             <ContactCard 
             email={contactInfo[0].email} 
             phone={contactInfo[0].phone} 
             linkedIn={contactInfo[0].linkedIn} />
        </main>
    );
}

export default function Footer() {
  

    const year = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 text-white py-4 mt-12">
            <div className="container mx-auto text-center">
        <p>Copyright &copy; {year} | Nelson Georges | All rights reserved 
            Built with Next.js and Tailwind CSS.</p>

            </div>
        </footer>
    );
}
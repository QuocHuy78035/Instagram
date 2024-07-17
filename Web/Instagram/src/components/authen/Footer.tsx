export default function Footer({className}) {
    return (
      <footer className={`text-center text-gray-600 text-[14px] ${className}`}>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">
            Meta
          </a>
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Blog
          </a>
          <a href="#" className="hover:underline">
            Jobs
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
          <a href="#" className="hover:underline">
            API
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Locations
          </a>
          <a href="#" className="hover:underline">
            Instagram Lite
          </a>
          <a href="#" className="hover:underline">
            Threads
          </a>
          <a href="#" className="hover:underline">
            Contact Uploading & Non-Users
          </a>
          <a href="#" className="hover:underline">
            Meta Verified
          </a>
        </nav>
      </footer>
    );
}
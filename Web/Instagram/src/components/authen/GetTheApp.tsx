export default function GetTheApp() {
    return (
      <div className="text-center mt-4">
        <p className="text-gray-700 my-4 text-[14px]">Get the app.</p>
        <div className="flex justify-center space-x-2">
          <a href="#">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
              alt="Google Play Store"
              className="w-32 h-10 rounded-sm"
            />
          </a>
          <a href="#">
            <img
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
              alt="Microsoft Store"
              className="w-32 h-10 rounded-sm"
            />
          </a>
        </div>
      </div>
    );
}
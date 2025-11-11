"use client"

import { useState } from 'react';

export default function BookingConfirmation() {
  const [showPopup, setShowPopup] = useState(false);

  const handleBackToHome = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleShare = (platform: string) => {
    const message = `Booking Confirmed! Appointment ID: 12d5 - Tue, July 2, 2022`;
    
    switch(platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(message)}`, '_blank');
        break;
      case 'gmail':
        window.open(`mailto:?subject=Booking Confirmation&body=${encodeURIComponent(message)}`, '_blank');
        break;
      default:
        break;
    }
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
            <svg width="70" height="55" viewBox="0 0 70 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2297_61891)">
                <path fillRule="evenodd" clipRule="evenodd" d="M67.6815 1.302C70.6207 3.77743 70.9972 8.16709 68.5221 11.1066L33.3637 52.8569C32.0765 54.3857 30.1942 55.2868 28.1958 55.3313C26.198 55.3758 24.2768 54.5589 22.9235 53.0886L2.41439 30.822C-0.189068 27.9955 -0.00822282 23.5929 2.81846 20.9898C5.64515 18.386 10.0473 18.5669 12.6507 21.3934L27.8075 37.8499L57.8766 2.14243C60.3523 -0.797123 64.7416 -1.17343 67.6815 1.302Z" fill="#2E8BC9"/>
              </g>
              <defs>
                <clipPath id="clip0_2297_61891">
                  <rect width="70" height="55" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>

        {/* Confirmation Text */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Booking Confirmed!
        </h1>

        {/* Appointment Details */}
        <div className="mb-6">
          <p className="text-[#237B10] font-medium text-lg mb-1">
            Appointment ID : 12d5
          </p>
          <p className="text-gray-500 text-sm">
            Tue, July 2, 2022
          </p>
        </div>

        {/* Back to Home Button */}
        <button onClick={handleBackToHome} className="w-full bg-[#2E8BC9] hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center">
          <svg 
            className="w-4 h-4 mr-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 19l-7-7m0 0l7-7m-7 7h18" 
            />
          </svg>
          Back To Home
        </button>
      </div>
      
      {/* Popup Overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 mx-4 w-full max-w-xs shadow-lg">
            {/* Header */}
            <div className="text-center mb-6">
              <h3 className="text-gray-800 font-medium text-base">Send message via</h3>
            </div>

            {/* Share Options */}
            <div className="flex justify-center space-x-8 mb-6">
              {/* WhatsApp */}
              <button 
                onClick={() => handleShare('whatsapp')}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.5" y="0.5" width="55" height="55" rx="7.5" stroke="#2E8BC9"/>
                    <path d="M38.5544 6.20117H17.4456C11.2236 6.20117 6.17969 11.2451 6.17969 17.4671V38.5759C6.17969 44.7979 11.2236 49.8418 17.4456 49.8418H38.5544C44.7764 49.8418 49.8203 44.7979 49.8203 38.5759V17.4671C49.8203 11.2451 44.7764 6.20117 38.5544 6.20117Z" fill="url(#paint0_linear_958_108273)"/>
                    <path d="M28.0001 12.168C25.2744 12.1684 22.597 12.8867 20.2371 14.2506C17.8772 15.6144 15.9181 17.5758 14.557 19.9372C13.1958 22.2987 12.4806 24.977 12.4833 27.7026C12.486 30.4283 13.2065 33.1051 14.5723 35.4639L12.4629 43.5386L20.6707 41.3645C22.7504 42.4784 25.0567 43.1034 27.4142 43.192C29.7717 43.2806 32.1184 42.8306 34.2758 41.876C36.4332 40.9214 38.3446 39.4875 39.8646 37.6832C41.3846 35.879 42.4732 33.7519 43.0476 31.4637C43.622 29.1755 43.6671 26.7865 43.1795 24.4782C42.6919 22.17 41.6844 20.0033 40.2336 18.1429C38.7829 16.2826 36.927 14.7775 34.8071 13.7421C32.6873 12.7068 30.3593 12.1684 28.0001 12.168ZM37.1257 36.812C35.0421 38.8945 32.3092 40.202 29.3803 40.5176C26.4514 40.8333 23.5026 40.1381 21.0232 38.5473L16.2551 39.812L17.4738 35.1545C16.0501 33.1481 15.2294 30.7765 15.1086 28.3192C14.9878 25.8618 15.5719 23.4212 16.792 21.2848C18.0122 19.1483 19.8175 17.4052 21.9953 16.2606C24.1732 15.116 26.6328 14.6178 29.0844 14.8246C31.5359 15.0313 33.8773 15.9345 35.8327 17.4277C37.7881 18.9209 39.2759 20.9418 40.121 23.2524C40.966 25.563 41.1331 28.067 40.6024 30.4694C40.0717 32.8717 38.8654 35.0724 37.1257 36.812Z" fill="#F2F8FD"/>
                    <path d="M35.7748 31.7491C35.7756 32.0043 35.754 32.259 35.7101 32.5104C35.6689 32.7652 35.6062 33.0161 35.5226 33.2604C35.3305 33.8032 34.2805 34.4679 34.2805 34.4679C33.5343 34.9646 32.6427 35.1957 31.7492 35.1241C31.5397 35.1027 31.3316 35.0696 31.1258 35.0248C30.777 34.9469 30.6073 34.8973 30.6073 34.8973C30.4386 34.8476 30.0008 34.7098 30.0008 34.7098C29.563 34.5729 29.4645 34.5466 29.4645 34.5466C28.7995 34.3467 28.155 34.084 27.5398 33.7619C26.1214 32.9913 24.5764 31.6104 24.5764 31.6104C23.6617 30.7972 22.8346 29.8903 22.1089 28.9048C21.7229 28.3278 21.3902 27.7168 21.1151 27.0794C21.0776 26.9857 20.893 26.5648 20.893 26.5648C20.7055 26.1448 20.6398 25.9826 20.6398 25.9826C20.5723 25.8194 20.4523 25.4819 20.4523 25.4819C20.3839 25.2828 20.3278 25.0796 20.2845 24.8735C20.25 24.6876 20.2269 24.4997 20.2151 24.311C20.1608 23.3248 20.6511 22.2869 20.6511 22.2869C21.1901 21.1713 21.7133 20.9163 21.7133 20.9163C21.9472 20.8107 22.1885 20.7221 22.4351 20.651C22.6793 20.5753 22.9306 20.525 23.1851 20.501C23.2613 20.4935 23.3383 20.5002 23.412 20.5207C23.6089 20.5741 24.0261 21.3035 24.0261 21.3035C24.1555 21.5004 24.3795 21.866 24.3795 21.866C24.6045 22.2298 24.793 22.5223 24.793 22.5223C24.9805 22.8176 25.1567 23.0763 25.1567 23.0763C25.1914 23.1176 25.3592 23.3341 25.3592 23.3341C25.4514 23.4506 25.5354 23.5734 25.6105 23.7016C25.662 23.7945 25.6939 23.8969 25.7042 24.0026C25.7155 24.2173 25.4286 24.5557 25.4286 24.5557C25.2337 24.7797 25.0225 24.9891 24.7967 25.1819C24.5738 25.371 24.3625 25.5732 24.1639 25.7876C23.8751 26.1044 23.8826 26.2976 23.8826 26.2976C23.8939 26.3796 23.9163 26.4597 23.9492 26.5357C24.0111 26.6773 24.0533 26.7504 24.0533 26.7504C24.0945 26.8226 24.2173 26.9988 24.2173 26.9988C24.3401 27.1751 24.3514 27.1957 24.3514 27.1957C24.9174 28.0803 25.591 28.8911 26.3567 29.6098C27.4658 30.6016 28.9817 31.3338 28.9817 31.3338C29.0042 31.3432 29.1926 31.4454 29.1926 31.4454C29.3801 31.5485 29.458 31.5813 29.458 31.5813C29.5348 31.6151 29.683 31.6601 29.683 31.6601C29.7614 31.6868 29.8438 31.7004 29.9267 31.7004C30.1198 31.6901 30.403 31.3676 30.403 31.3676C30.5934 31.146 30.7706 30.9134 30.9336 30.671C31.1005 30.4257 31.285 30.1929 31.4858 29.9744C31.7905 29.651 32.0051 29.6388 32.0051 29.6388C32.1111 29.6379 32.2162 29.6577 32.3145 29.6969C32.4495 29.7588 32.5807 29.8286 32.7073 29.906C32.9417 30.0485 32.9886 30.0785 32.9886 30.0785C33.2698 30.2248 33.5811 30.3785 33.5811 30.3785C33.8961 30.5332 34.2823 30.716 34.2823 30.716C34.6686 30.8988 34.8786 31.0048 34.8786 31.0048C35.6501 31.3385 35.7223 31.5279 35.7223 31.5279C35.7506 31.5987 35.7683 31.6732 35.7748 31.7491Z" fill="#F2F8FD"/>
                    <defs>
                      <linearGradient id="paint0_linear_958_108273" x1="28" y1="49.8418" x2="28" y2="6.20117" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#00D02D"/>
                        <stop offset="0.25" stopColor="#10D93A"/>
                        <stop offset="0.75" stopColor="#3AF15D"/>
                        <stop offset="1" stopColor="#51FE71"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <span className="text-xs text-gray-600">WhatsApp</span>
              </button>

              {/* SMS */}
              <button 
                onClick={() => handleShare('sms')}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28 6.5C39.8095 6.5 49.5 15.6772 49.5 27.1338C49.4998 38.5901 39.8099 47.7651 28.001 47.7656L28.002 47.7666C26.6095 47.7685 25.2214 47.6393 23.8545 47.3828H23.8535C23.3793 47.2937 23.0776 47.2378 22.8535 47.207C22.7569 47.1938 22.6969 47.1885 22.6641 47.1865C22.6302 47.1995 22.5639 47.2266 22.4551 47.2783C22.2262 47.3871 21.9208 47.5486 21.4541 47.7969C18.5908 49.3196 15.2503 49.86 12.0283 49.2607C11.5081 49.164 11.0772 48.8003 10.8945 48.3037C10.712 47.807 10.8048 47.2505 11.1387 46.8398C12.0746 45.6886 12.7176 44.3013 13.002 42.8086C13.0781 42.3983 12.9038 41.8419 12.3691 41.2988C8.73963 37.6132 6.50011 32.629 6.5 27.1338C6.5 15.6772 16.1905 6.5 28 6.5ZM20 26C18.8954 26 18 26.8954 18 28C18 29.1046 18.8954 30 20 30H20.0176C21.1221 30 22.0176 29.1046 22.0176 28C22.0176 26.8954 21.1221 26 20.0176 26H20ZM27.9912 26C26.8866 26 25.9912 26.8954 25.9912 28C25.9912 29.1046 26.8866 30 27.9912 30H28.0088C29.1134 30 30.0088 29.1046 30.0088 28C30.0088 26.8954 29.1134 26 28.0088 26H27.9912ZM35.9824 26C34.8779 26 33.9824 26.8954 33.9824 28C33.9824 29.1046 34.8779 30 35.9824 30H36C37.1046 30 38 29.1046 38 28C38 26.8954 37.1046 26 36 26H35.9824Z" fill="#3D75E6"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600">SMS</span>
              </button>

              {/* Gmail */}
              <button 
                onClick={() => handleShare('gmail')}
                className="flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42.0975 9.75H6.0525C4.365 9.75 3 11.115 3 12.7875V35.865C3 37.545 4.365 38.9025 6.0525 38.9025H42.105C43.7925 38.9025 45.1575 37.545 45.1575 35.865V12.795C45.15 11.115 43.785 9.75 42.0975 9.75Z" fill="#FFCC67"/>
                    <path d="M42.5164 35.8438V35.8737C42.5164 36.1062 42.3289 36.2937 42.0964 36.2937H42.0664L42.5164 35.8438Z" fill="#E6E6E5"/>
                    <path d="M24.9586 26.5567C24.4486 26.9917 23.6986 26.9917 23.1886 26.5567L4.18359 10.3867L23.1136 28.9942C23.6461 29.5192 24.5011 29.5192 25.0336 28.9942L43.9636 10.3867L24.9586 26.5567Z" fill="#E7B95E"/>
                    <path d="M29.1084 23.4531L44.5359 37.7031L27.9609 24.5106L29.1084 23.4531Z" fill="#E7B95E"/>
                    <path d="M18.9531 23.4531L3.57812 37.7031L20.1081 24.5106L18.9531 23.4531Z" fill="#E7B95E"/>
                  </svg>
                </div>
                <span className="text-xs text-gray-600">Gmail</span>
              </button>
            </div>

            {/* Send Message Button */}
            <button 
              onClick={closePopup}
              className="w-full border-t border-[#DCDCDC] text-[#2E8BC9] py-3 px-4 text-sm font-medium transition-colors duration-200"
            >
              Send Message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
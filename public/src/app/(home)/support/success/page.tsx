"use client"

import { Check, ArrowLeft } from "lucide-react"


export default function SuccessPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center text-center p-4">
      <div className=" rounded-lg  p-5 max-w-md w-full text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-12 h-12  rounded-full flex items-center justify-center mx-auto">
           <svg width="70" height="55" viewBox="0 0 70 55" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_1290_33673)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M67.6815 1.30004C70.6207 3.77547 70.9972 8.16514 68.5221 11.1047L33.3637 52.855C32.0765 54.3837 30.1942 55.2848 28.1958 55.3293C26.198 55.3739 24.2768 54.557 22.9235 53.0867L2.41439 30.82C-0.189068 27.9935 -0.00822282 23.591 2.81846 20.9879C5.64515 18.3841 10.0473 18.565 12.6507 21.3915L27.8075 37.8479L57.8766 2.14047C60.3523 -0.799076 64.7416 -1.17538 67.6815 1.30004Z" fill="#2E8BC9"/>
</g>
<defs>
<clipPath id="clip0_1290_33673">
<rect width="70" height="55" fill="white"/>
</clipPath>
</defs>
</svg>

          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-xl font-semibold text-gray-900 mb-3">Sent successfully</h1>

        <p className="text-gray-600 text-sm mb-8 leading-relaxed">
          You will receive a confirmation at your email address:{" "}
          <span className="font-medium">"your.email@example.com"</span>.
        </p>

        {/* Back Button */}
<button 
  className="w-full rounded-md py-2 text-center flex justify-center items-center bg-[#2E8BC9] hover:bg-blue-600 text-white" 
  onClick={() => window.history.back()}
>
  <ArrowLeft className="w-4 h-4 mr-2" />
  Back To Home
</button>
      </div>
    </div>
  )
}

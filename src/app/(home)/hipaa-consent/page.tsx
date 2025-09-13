"use client"



export default function HIPAAConsentPage() {
  return (
    <div className="min-h-screen bg-[#F5F7F9] flex items-start justify-center p-4">
      <div className="rounded-lg  max-w-sm w-full p-6 space-y-5">
        <h1 className="text-lg font-medium text-center text-black mb-6">HIPAA Consent</h1>

        <div className=" space-y-4 text-sm text-gray-800 leading-relaxed">
          <p className="bg-[#F2F8FD] p-2"><span className="font-bold">Hey!</span><br/> Before we continue, we just need your OK on how we handle your health information.</p>
<div className="bg-[#E4EFFA] p-2 rounded-md">

        <p >We follow strict HIPAA guidelines to protect your privacy and keep your data secure.</p>

          <p>
            To keep improving your experience and help our technology get smarter over time, we may use some of your
            information — always anonymized and never linked to your name or identity.
          </p>

          <p>
            Your privacy always comes first. You can choose how your data is used and change your preferences anytime.
          </p>
</div>
      

         
        </div>
        <div className="bg-[#F2F8FD] p-2">
 <p className="text-center font-medium pb-2">Tap "I Agree" to continue.</p>
        <button
          className="w-full bg-[#2E8BC9] p-2   text-white py-2 rounded font-medium shadow-sm"
          onClick={() => {
            console.log("User agreed to HIPAA consent")
          }}
        >
          ✓ I Agree
        </button>

        </div>

      </div>
    </div>
  )
}

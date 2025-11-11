"use client"



interface Account {
  id: string
  name: string
  initials: string
  type: "personal" | "caregiver"
  avatarColor: string
}

const accounts: Account[] = [
  {
    id: "1",
    name: "Mahmud",
    initials: "Ma",
    type: "personal",
    avatarColor: "bg-[#2E8BC9]",
  },
  {
    id: "2",
    name: "Sakib",
    initials: "Sa",
    type: "caregiver",
    avatarColor: "bg-[#93531F]",
  },
  {
    id: "3",
    name: "Kamal",
    initials: "Ka",
    type: "caregiver",
    avatarColor: "bg-[#93531F]",
  },
]

export default function AccountSelector() {
  const handleLogin = (account: Account) => {
    console.log(`Logging in as ${account.name} (${account.type})`)
    // Handle login logic here
  }

  const personalAccount = accounts.find((acc) => acc.type === "personal")
  const caregiverAccounts = accounts.filter((acc) => acc.type === "caregiver")

  return (
    <div className="flex justify-center pt-5">

   <div className="w-full justify-center rounded-2xl  max-w-2/4 p-6 bg-[#F6F8FA] shadow-sm">
      <div className="space-y-6">
        {/* Personal Account Section */}
        {personalAccount && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Personal account</h3>
            <div className="flex items-center justify-between p-2 bg-[#F2F8FD]">
              <div className="flex items-center gap-3 ">
                <div
                  className={`w-10 h-10  rounded-full ${personalAccount.avatarColor} flex items-center justify-center text-white text-sm font-medium`}
                >
                  {personalAccount.initials}
                </div>
                <span className="text-gray-900 font-medium">{personalAccount.name}</span>
              </div>
              <button
                onClick={() => handleLogin(personalAccount)}
                className="bg-[#EEFEE7] hover:bg-green-600 text-[#237B10] border-[#237B10] border px-4 py-1 rounded-full text-sm"
              >
                Log in as Personal
              </button>
            </div>
          </div>
        )}

        {/* Caregiver Accounts Section */}
        {caregiverAccounts.length > 0 && (
          <div >
            <h3 className="text-sm font-medium text-gray-700 mb-3">As a caregiver</h3>
            <div className="space-y-3  ">
              {caregiverAccounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-2 bg-[#FBF7EB]">
                  <div className="flex items-center gap-3 ">
                    <div
                      className={`w-10 h-10 rounded-full  ${account.avatarColor} flex items-center justify-center text-white text-sm font-medium`}
                    >
                      {account.initials}
                    </div>
                    <span className="text-gray-900 font-medium">{account.name}</span>
                  </div>
                  <button
                    onClick={() => handleLogin(account)}
                  
                    className="border border-[#93531F] text-[#93531F] hover:bg-orange-50 px-2 py-1 rounded-full text-sm"
                  >
                    Log in as Caregiver
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
 
  )
}

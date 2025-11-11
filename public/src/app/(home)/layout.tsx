import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wellbyn - Healthcare Dashboard",
  description:
    "Manage your healthcare appointments, doctors, and medical information.",
};


export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <div className="flex h-screen bg-gray-50 w-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="  px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Back Button */}
              <Link href="/dashboard">
               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 6V18" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round"/>
<path d="M8 12.0005H20" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M12 8C12 8 8.00001 10.946 8 12C7.99999 13.0541 12 16 12 16" stroke="#3D3D3D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

              </button>
              </Link>
             

              <div className="flex items-center justify-between w-[560px]">
                {/* Search Bar */}
                <div className="flex-1 bg-white max-w-xl rounded-lg mx-6 hidden md:block">
                  <div className="relative rounded-lg">
                    <div className="absolute inset-y-0 rounded-lg  left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17 17L21 21"
                          stroke="#3D3D3D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z"
                          stroke="#3D3D3D"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      placeholder="Search for a doctor by name or discipline..."
                      className="w-full pl-12 pr-4 px-5 py-4 shadow-md rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-text-primary placeholder:text-text-primary"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4 md:hidden">
                  <div className="w-9 h-9 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">Ma</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-900 truncate">
                      Hi, Mahmud
                    </p>
                    <p className="text-sm text-Text-secondary truncate font-medium">
                      Personal account
                    </p>
                  </div>
                </div>

                {/* Right side - Notifications and Profile */}
                <div className="flex items-center gap-4">
                  {/* Notifications */}
                  <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors hidden md:block">
                    <svg
                      width="32"
                      height="34"
                      viewBox="0 0 32 34"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0322 30.2324C13.0851 31.0548 14.4754 31.5549 15.9995 31.5549C17.5236 31.5549 18.914 31.0548 19.9668 30.2324"
                        stroke="#3D3D3D"
                        strokeWidth="2.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0005 4.44531C16.5075 4.44531 17.006 4.48196 17.4927 4.55273C17.3895 5.0188 17.3335 5.50288 17.3335 6C17.3335 9.6819 20.3186 12.667 24.0005 12.667C24.6251 12.667 25.229 12.5786 25.8023 12.418C25.8985 12.9553 25.9516 13.5073 25.9517 14.0713C25.9518 15.4469 26.0346 16.7403 26.8638 17.9258C27.4969 18.8198 28.352 19.7355 28.5249 20.835C28.806 22.6242 27.5485 23.8664 26.0093 24.4854C20.1077 26.8583 11.8944 26.8583 5.99269 24.4854C4.45336 23.8664 3.19585 22.6243 3.47706 20.835C3.65001 19.7355 4.50512 18.8198 5.13819 17.9258C5.96731 16.7403 6.04919 15.4469 6.04933 14.0713C6.04953 8.75499 10.5049 4.4455 16.0005 4.44531Z"
                        fill="#3D3D3D"
                      />
                      <circle
                        cx="24.0003"
                        cy="5.99935"
                        r="5.33333"
                        fill="#E63D75"
                      />
                    </svg>
                  </button>
                  {/* Mobile Notification Icon */}
                  <button className="relative p-2 rounded-lg transition-colors md:hidden -mt-4">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="8" fill="#F3F3F3" />
                      <path
                        d="M13.0245 25.1738C13.8142 25.7906 14.8569 26.1657 16 26.1657C17.1431 26.1657 18.1859 25.7906 18.9755 25.1738"
                        stroke="#2E8BC9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M16.0007 5.83398C16.3807 5.834 16.7541 5.86104 17.1189 5.91406C17.0414 6.26373 16.9997 6.62703 16.9997 7C16.9997 9.76135 19.2384 11.9999 21.9997 12C22.4682 12 22.9213 11.9339 23.3513 11.8135C23.4234 12.2166 23.4636 12.6307 23.4636 13.0537C23.4637 14.0854 23.5254 15.0553 24.1472 15.9443C24.6221 16.6149 25.2636 17.3023 25.3933 18.127C25.6038 19.4687 24.661 20.4001 23.5066 20.8643C19.0803 22.644 12.9201 22.644 8.49386 20.8643C7.3396 20.4001 6.39749 19.4686 6.60812 18.127C6.73774 17.3023 7.37838 16.6149 7.85323 15.9443C8.47514 15.0552 8.53673 14.0854 8.53683 13.0537C8.53683 9.06627 11.8788 5.83398 16.0007 5.83398Z"
                        fill="#2E8BC9"
                      />
                      <circle cx="22" cy="7" r="4" fill="#E63D75" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}


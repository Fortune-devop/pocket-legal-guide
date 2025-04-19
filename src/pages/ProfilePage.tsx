
import { UserProfile } from "@clerk/clerk-react";
import LegalHeader from "@/components/LegalHeader";
import LegalFooter from "@/components/LegalFooter";

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <LegalHeader />
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl w-full">
          <UserProfile 
            appearance={{
              elements: {
                card: "shadow-xl border border-gray-100",
                navbar: "bg-legal-primary",
                navbarButton: "text-white",
              }
            }}
          />
        </div>
      </main>
      <LegalFooter />
    </div>
  );
};

export default ProfilePage;

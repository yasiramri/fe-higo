import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSideBar';
import './globals.css';

export const metadata = {
  title: 'Dashboard',
  description: 'Visualisasi Data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gray-50">
        <SidebarProvider>
          <div className="flex min-h-screen">
            <AppSidebar />

            <div className="flex-1 flex flex-col">
              <div className="px-4 py-2">
                <SidebarTrigger />
              </div>

              <main className="flex-1 p-4">{children}</main>

              <footer className="w-full border-t text-center text-sm text-muted-foreground p-4">
                Higo Interview by Muhammad Yasir Amri
              </footer>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}

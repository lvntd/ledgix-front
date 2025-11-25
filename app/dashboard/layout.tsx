import { AppSidebar, NavActions } from '@/components/molecules/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/atoms/breadcrumb'
import { Separator } from '@/components/atoms/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/atoms/sidebar'
import { AuthProvider } from '@/contexts'
import AuthGuard from '@/components/molecules/auth-guard/auth-guard'

type Props = { children: React.ReactNode }

const AppLayout = ({ children }: Props) => {
  return (
    <AuthProvider>
      <AuthGuard>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            {/* <header> may be moved as a separate component <ConversationHeader/> and other pages may have their own <OtherPageHeader/> */}
            <header className="flex h-14 shrink-0 items-center gap-2">
              <div className="flex flex-1 items-center gap-2 px-3">
                <SidebarTrigger />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="line-clamp-1">
                        Project Management & Task Tracking
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="ml-auto px-3">
                <NavActions />
              </div>
            </header>
            {children}
          </SidebarInset>
        </SidebarProvider>
      </AuthGuard>
    </AuthProvider>
  )
}

export default AppLayout

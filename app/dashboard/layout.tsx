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
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      </AuthGuard>
    </AuthProvider>
  )
}

export default AppLayout

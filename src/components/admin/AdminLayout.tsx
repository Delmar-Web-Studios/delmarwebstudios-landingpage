import { ReactNode } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Bot,
  Clock,
  KeyRound,
  Users,
  User as UserIcon,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/admin", label: "Vue d'ensemble", icon: LayoutDashboard, end: true },
  { to: "/admin/agents", label: "Agents IA", icon: Bot },
  { to: "/admin/scheduled", label: "Planifications", icon: Clock },
];

const adminNav = [
  { to: "/admin/users", label: "Équipe", icon: Users, role: "super_admin" as const },
  { to: "/admin/vault", label: "Coffre", icon: KeyRound, role: "super_admin" as const },
];

const AppSidebar = () => {
  const { state } = useSidebar();
  const { isAdmin, user, signOut } = useAuth();
  const navigate = useNavigate();
  const collapsed = state === "collapsed";

  const handleSignOut = async () => {
    await signOut();
    navigate("/login/admin");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent className="bg-white">
        <div className="p-4 flex items-center gap-2 border-b">
          <div className="w-8 h-8 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-electric" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="font-bold text-sm truncate">Delmar Admin</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Espace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {nav.map((item) => (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        `flex items-center gap-2 ${isActive ? "bg-electric/10 text-electric font-semibold" : ""}`
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminNav.map((item) => (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-2 ${isActive ? "bg-electric/10 text-electric font-semibold" : ""}`
                        }
                      >
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/admin/profile"
                    className={({ isActive }) =>
                      `flex items-center gap-2 ${isActive ? "bg-electric/10 text-electric font-semibold" : ""}`
                    }
                  >
                    <UserIcon className="h-4 w-4" />
                    {!collapsed && <span>Profil</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span>Déconnexion</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const AdminLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-4 sticky top-0 bg-white z-10">
            <SidebarTrigger />
            <div className="ml-4 text-sm text-muted-foreground">Delmar Web Studios · Admin</div>
          </header>
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {children ?? <Outlet />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;

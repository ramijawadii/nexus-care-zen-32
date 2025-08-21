
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InvoiceBillingView from "@/components/comptabilite/InvoiceBillingView";
import InvoiceEditor from "@/components/facturation/InvoiceEditor";
import GlobalChatbot from "@/components/shared/GlobalChatbot";

const FacturationPage = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex-1 w-full min-w-0">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                      Tableau de Bord
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Facturation</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0 w-full min-w-0">
            <Tabs defaultValue="management" className="space-y-4 w-full">
              <TabsList>
                <TabsTrigger value="management">Gestion Factures</TabsTrigger>
                <TabsTrigger value="editor">Éditeur Facture</TabsTrigger>
              </TabsList>

              <TabsContent value="management" className="w-full">
                <InvoiceBillingView />
              </TabsContent>

              <TabsContent value="editor" className="w-full min-w-0">
                <InvoiceEditor />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
      
      <GlobalChatbot />
    </>
  );
};

export default FacturationPage;

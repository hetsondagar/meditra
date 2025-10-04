import { FileText, Download, Eye, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Report {
  id: string;
  title: string;
  type: string;
  date: string;
  status: "normal" | "attention" | "critical";
  doctor: string;
}

export const RecentReports = () => {
  const reports: Report[] = [
    {
      id: "1",
      title: "Complete Blood Count",
      type: "Lab Results",
      date: "2024-01-08",
      status: "normal",
      doctor: "Dr. Sarah Chen"
    },
    {
      id: "2",
      title: "Chest X-Ray",
      type: "Imaging",
      date: "2024-01-05",
      status: "normal",
      doctor: "Dr. Michael Johnson"
    },
    {
      id: "3",
      title: "Lipid Panel",
      type: "Lab Results", 
      date: "2024-01-03",
      status: "attention",
      doctor: "Dr. Sarah Chen"
    },
    {
      id: "4",
      title: "ECG Report",
      type: "Cardiac",
      date: "2023-12-28",
      status: "normal",
      doctor: "Dr. Robert Kim"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "text-success bg-success/20";
      case "attention": return "text-warning bg-warning/20";
      case "critical": return "text-destructive bg-destructive/20";
      default: return "text-muted-foreground bg-muted/20";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal": return "Normal";
      case "attention": return "Needs Review";
      case "critical": return "Critical";
      default: return "Pending";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Recent Reports</h2>
          <p className="text-muted-foreground">Your latest test results and medical reports</p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="hover:bg-primary/10 hover:border-primary/50 transition-colors"
        >
          <FileText className="h-4 w-4 mr-2" />
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {reports.map((report, index) => (
          <Card
            key={report.id}
            className="p-4 border-border/30 rounded-2xl hover-lift hover:shadow-xl transition-all duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                
                <div className="space-y-1">
                  <h3 className="font-semibold text-card-foreground">{report.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{report.type}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    <span>by {report.doctor}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`
                  px-3 py-1 rounded-full text-xs font-medium
                  ${getStatusColor(report.status)}
                `}>
                  {getStatusText(report.status)}
                </span>
                
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
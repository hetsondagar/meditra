import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Report {
  id: string;
  title?: string;
  type: string;
  date: string;
  status?: "normal" | "attention" | "critical";
  doctor?: string;
}

export const RecentReports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "normal":
        return "text-success bg-success/20";
      case "attention":
        return "text-warning bg-warning/20";
      case "critical":
        return "text-destructive bg-destructive/20";
      default:
        return "text-muted-foreground bg-muted/20";
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case "normal":
        return "Normal";
      case "attention":
        return "Needs Review";
      case "critical":
        return "Critical";
      default:
        return "Pending";
    }
  };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/dashboard/reports/recent`);
        if (res.data.success) setReports(res.data.data);
      } catch (err) {
        console.error("Error fetching reports:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  if (loading)
    return <p className="text-center text-muted-foreground">Loading reports...</p>;
  if (!reports.length)
    return <p className="text-center text-destructive">No reports found.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Recent Reports</h2>
          <p className="text-muted-foreground">
            Your latest test results and medical reports
          </p>
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
                  <h3 className="font-semibold text-card-foreground">{report.title || report.type}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{report.type}</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(report.date).toLocaleDateString()}</span>
                    </div>
                    {report.doctor && <span>by {report.doctor}</span>}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    report.status
                  )}`}
                >
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

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { usePageLoader } from "@/hooks/usePageLoader";

export default function AuditLogPage() {
  const isLoaded = usePageLoader("Đang tải nhật ký hoạt động hệ thống...", 700);

  if (!isLoaded) return null;
  const logs = [
    { time: "20:45:12", user: "admin", action: "Đăng nhập hệ thống", ip: "192.168.1.5", status: "Thành công" },
    { time: "18:30:00", user: "hr_manager", action: "Cập nhật lương cho NV002", ip: "192.168.1.12", status: "Thành công" },
    { time: "15:20:11", user: "employee_a", action: "Đổi mật khẩu tài khoản", ip: "10.0.2.15", status: "Thành công" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Nhật ký hoạt động</h1>
        <p className="text-muted-foreground text-sm">Ghi nhận chi tiết các thao tác thực hiện trên hệ thống.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nhật ký hệ thống</CardTitle>
          <CardDescription>Thời gian thực hoạt động truy cập.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-xs font-mono">
            {logs.map((log, idx) => (
              <div key={idx} className="flex items-start gap-4 border-b pb-2">
                <span className="text-primary shrink-0">[{log.time}]</span>
                <span className="text-muted-foreground shrink-0">[{log.user}]</span>
                <span className="font-semibold">{log.action}</span>
                <span className="text-muted-foreground ml-auto font-sans text-xs">IP: {log.ip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePageLoader } from "@/hooks/usePageLoader";

export default function RolePage() {
  const isLoaded = usePageLoader("Đang tải dữ liệu phân quyền vai trò...", 600);

  if (!isLoaded) return null;
  const roles = [
    {
      name: "Super Admin",
      code: "SUPER_ADMIN",
      desc: "Toàn quyền quản trị hệ thống",
      users: 2,
    },
    {
      name: "HR Manager",
      code: "HR_MANAGER",
      desc: "Quản lý nhân sự, ca kíp và lương",
      users: 5,
    },
    {
      name: "Employee",
      code: "EMPLOYEE",
      desc: "Nhân viên xem thông tin cá nhân",
      users: 113,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vai trò & Quyền</h1>
          <p className="text-muted-foreground text-sm">
            Phân quyền chi tiết cho các đối tượng sử dụng hệ thống.
          </p>
        </div>
        <Button className="cursor-pointer">Thêm Vai trò</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {roles.map((r, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-base font-bold">{r.name}</CardTitle>
              <CardDescription className="font-mono text-xs text-primary">
                {r.code}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground">{r.desc}</p>
              <div className="flex items-center justify-between text-xs pt-2 border-t">
                <span>
                  Số người gán: <strong>{r.users}</strong>
                </span>
                <span className="text-primary hover:underline cursor-pointer">
                  Chỉnh sửa
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

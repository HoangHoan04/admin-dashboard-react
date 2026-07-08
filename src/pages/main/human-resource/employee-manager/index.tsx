import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePageLoader } from "@/hooks/usePageLoader";

export default function EmployeePage() {
  const isLoaded = usePageLoader("Đang truy vấn danh sách nhân sự...", 800);

  if (!isLoaded) return null;
  const mockEmployees = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "a@company.com",
      dept: "Phòng Công nghệ",
      status: "Chính thức",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "b@company.com",
      dept: "Phòng Nhân sự",
      status: "Thử việc",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "c@company.com",
      dept: "Phòng Kinh doanh",
      status: "Chính thức",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Thành viên</h1>
          <p className="text-muted-foreground text-sm">
            Danh sách nhân viên hệ thống.
          </p>
        </div>
        <Button className="cursor-pointer">Thêm nhân viên</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách nhân sự</CardTitle>
          <CardDescription>
            Quản lý hồ sơ và trạng thái nhân viên.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="p-3 font-semibold text-muted-foreground">
                    Mã NV
                  </th>
                  <th className="p-3 font-semibold text-muted-foreground">
                    Họ tên
                  </th>
                  <th className="p-3 font-semibold text-muted-foreground">
                    Email
                  </th>
                  <th className="p-3 font-semibold text-muted-foreground">
                    Bộ phận
                  </th>
                  <th className="p-3 font-semibold text-muted-foreground">
                    Trạng thái
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockEmployees.map((emp) => (
                  <tr
                    key={emp.id}
                    className="border-b border-border hover:bg-muted/30"
                  >
                    <td className="p-3 font-mono">
                      #NV{emp.id.toString().padStart(3, "0")}
                    </td>
                    <td className="p-3 font-medium">{emp.name}</td>
                    <td className="p-3">{emp.email}</td>
                    <td className="p-3">{emp.dept}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${emp.status === "Chính thức" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`}
                      >
                        {emp.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

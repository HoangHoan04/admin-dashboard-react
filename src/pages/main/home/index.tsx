import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { usePageLoader } from "@/hooks/usePageLoader";

export default function HomePage() {
  const isLoaded = usePageLoader("Đang chuẩn bị trang chủ...", 450);

  if (!isLoaded) return null;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Trang chủ</h1>
        <p className="text-muted-foreground text-sm">
          Chào mừng đến với hệ thống quản trị Antigravity Cloud.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Hệ thống Antigravity Admin</CardTitle>
          <CardDescription>
            Trang chủ chính của hệ thống quản trị dịch vụ.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Vui lòng sử dụng thanh menu bên trái để truy cập các chức năng quản
            lý khác như Bảng điều khiển, Phân tích số liệu, Thành viên, hoặc Cài
            đặt hệ thống.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

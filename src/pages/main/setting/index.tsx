import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserSettingsPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Cài đặt cá nhân</h1>
        <p className="text-muted-foreground text-sm">
          Quản lý cấu hình thông tin cá nhân của bạn.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Cài đặt cơ bản</CardTitle>
          <CardDescription>
            Cập nhật tuỳ chọn bảo mật và thông tin tài khoản.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center justify-between py-2 border-b">
            <span>Thông báo qua email</span>
            <input type="checkbox" defaultChecked className="cursor-pointer" />
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span>Xác thực 2 yếu tố (2FA)</span>
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
              Chưa bật
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import User from "./User";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Analyses() {
  return (
    <div className="ml-10 p-8 w-full flex flex-col gap-y-10 h-full">
      <User />

      <div className="w-full">
        <div>
          <h1 className="font-bold text-2xl">Şirket Profili</h1>
          <p className="text-gray-500">
            Şirket bilgilerinizi güncelleyebilirsiniz.
          </p>
        </div>
        <div className="flex flex-col gap-y-5 mt-4 w-full">
          <div className="flex gap-x-4 justify-start items-center">
            <span className="font-semibold">Şirket Adı</span>
            <Input
              className="w-2/3 border border-zinc-300 text-center"
              disabled
              value={"SHAYA KAHVE SANAYİ VE TİCARET A.Ş."}
            />
          </div>

          <div className="flex flex-col gap-y-2 justify-start items-start">
            <span className="font-semibold">Şirket Logosu</span>
            <div className="flex gap-x-4">
              <Avatar className="w-24 h-24 rounded-lg">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>RC</AvatarFallback>
              </Avatar>
              <Input
                className="w-2/3 border border-zinc-300 text-center"
                disabled
                type="file"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 justify-start items-start w-full mt-10">
            <span className="font-bold text-xl">Üyelik Bilgisi</span>
            <div className="w-2/3 gap-y-2 flex-col flex">
              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Tipi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  Özelleştirilmiş Kurumsal
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Başlangıç Tarihi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  03/08/2024
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Bitiş Tarihi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  03/08/2027
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Abonelik</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  $99.90
                </Badge>
              </div>
              <Badge className="text-white rounded-sm mt-10">
                Aboneliğiniz otomatik olarak 03/08/2025 tarihinde $99.90 olarak
                yenilenecektir.
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

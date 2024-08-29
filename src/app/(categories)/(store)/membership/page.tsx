import { Input } from "@/components/ui/input";
import User from "./User";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserType } from "@/types/User.type";
import { calculateRenewalDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const user: UserType = {
  displayName: "RABEL CAFE",
  username: "rabelland",
  mail: "admin@rabel.grkn.dev",
  url: "demoqr.grkn.dev",
  logo: "https://github.com/shadcn.png",
  verified: true,
  association: "GRKNSOFT",
  company: "SHAYA KAHVE SANAYİ VE TİCARET A.Ş.",
  premium: false,
  membership: {
    type: "Özelleştirilmiş Kurumsal",
    start: new Date("2024-08-03"),
    end: new Date("2027-08-03"),
    lastRenew: new Date("2024-08-03"),
    price: 99.9,
    autoRenew: true,
  },
};
export default function Analyses() {
  return (
    <div className="p-6 w-full flex flex-col gap-y-10 h-full">
      <User user={user} />

      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex flex-row justify-between items-center w-full">
          <div><h1 className="font-bold text-xl">Şirket Profili</h1>
          <p className="text-gray-500 text-sm">
            Şirket bilgilerinizi güncelleyebilirsiniz.
          </p></div>
          <div>
            <Button className="hover:bg-zinc-400 bg-zinc-200 text-black">Kaydet</Button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-y-5 mt-4 w-full">
          <div className="w-full flex flex-col sm:flex-row gap-x-4 justify-start items-start">
            <span className="font-semibold">Şirket Adı</span>
            <Input
              className="w-full border border-zinc-300 text-start"
              disabled
              value={user.company}
            />
          </div>

          <div className="flex flex-col gap-y-2 justify-start items-start">
            <span className="font-semibold">Şirket Logosu</span>
            <div className="flex sm:gap-x-4 gap-y-4 flex-col sm:flex-row">
              <Avatar className="w-24 h-24 rounded-lg">
                <AvatarImage src={user.logo} />
                <AvatarFallback>{`${user.displayName.split(" ")[0].charAt(0)}${
                  user.displayName.includes(" ") &&
                  user.displayName.split(" ")[1].charAt(0)
                }`}</AvatarFallback>
              </Avatar>
              <Input
                className="w-full border border-zinc-300 text-center"
                disabled
                type="file"
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2 justify-start items-start w-full mt-10">
            <span className="font-bold text-xl">Üyelik Bilgisi</span>
            <div className="w-full gap-y-2 flex-col flex">
              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Tipi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  {user.membership.type}
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Başlangıç Tarihi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  {user.membership.start
                    .toLocaleDateString("tr-TR")
                    .replace(/\./g, "/")}
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Üyelik Bitiş Tarihi</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  {user.membership.end
                    .toLocaleDateString("tr-TR")
                    .replace(/\./g, "/")}
                </Badge>
              </div>

              <div className="flex gap-x-4 items-center justify-between">
                <span className="font-semibold">Abonelik</span>
                <Badge className="text-white rounded-sm bg-cafe-800">
                  {user.membership.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "USD",
                  })}
                </Badge>
              </div>
              {user.membership.autoRenew && (
                <Badge className="text-zinc-500 rounded-sm mt-10 bg-zinc-200">
                  Aboneliğiniz otomatik olarak{" "}
                  {calculateRenewalDate(user.membership.lastRenew)
                    .toLocaleDateString("tr-TR")
                    .replace(/\./g, "/")}{" "}
                  tarihinde{" "}
                  {user.membership.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  olarak yenilenecektir.
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

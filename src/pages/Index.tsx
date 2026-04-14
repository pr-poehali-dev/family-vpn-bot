import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type Section = "general" | "alerts" | "analytics" | "notifications" | "help";

const navItems = [
  { id: "general" as Section, icon: "Shield", label: "Параметры и безопасность" },
  { id: "alerts" as Section, icon: "Bell", label: "Оповещения и алерты" },
  { id: "analytics" as Section, icon: "BarChart3", label: "Аналитика и мониторинг" },
  { id: "notifications" as Section, icon: "MessageSquare", label: "Уведомления" },
  { id: "help" as Section, icon: "HelpCircle", label: "Помощь и контакты" },
];

const stats = [
  { label: "Активных пользователей", value: "1 284", delta: "+12%", icon: "Users", color: "cyan" },
  { label: "Трафик сегодня", value: "48.3 ГБ", delta: "+5.2%", icon: "Activity", color: "violet" },
  { label: "Uptime бота", value: "99.97%", delta: "стабильно", icon: "Zap", color: "green" },
  { label: "Заблокировано угроз", value: "342", delta: "-8 за час", icon: "ShieldAlert", color: "orange" },
];

const recentAlerts = [
  { type: "critical", text: "Попытка брутфорса с IP 185.234.xx.xx", time: "2 мин назад" },
  { type: "warning", text: "Нагрузка CPU превысила 80%", time: "15 мин назад" },
  { type: "info", text: "Новый пользователь подключился к серверу EU-1", time: "28 мин назад" },
  { type: "success", text: "Резервная копия базы создана успешно", time: "1 час назад" },
  { type: "warning", text: "Сертификат истекает через 14 дней", time: "2 часа назад" },
];

const activityData = [65, 78, 45, 90, 67, 83, 72, 95, 88, 76, 61, 84];
const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

export default function Index() {
  const [active, setActive] = useState<Section>("general");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settings, setSettings] = useState({
    twoFactor: true,
    autoBlock: true,
    encryptLogs: false,
    killSwitch: true,
    dnsLeak: true,
    obfuscation: false,
  });
  const [notifications, setNotifications] = useState({
    telegram: true,
    email: false,
    push: true,
    sms: false,
    criticalOnly: false,
    digest: true,
  });
  const [alertRules, setAlertRules] = useState({
    bruteForce: true,
    highTraffic: true,
    newLogin: false,
    serverDown: true,
    expiredCert: true,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((s) => ({ ...s, [key]: !s[key] }));

  const handleNotifToggle = (key: keyof typeof notifications) =>
    setNotifications((n) => ({ ...n, [key]: !n[key] }));

  const handleAlertToggle = (key: keyof typeof alertRules) =>
    setAlertRules((a) => ({ ...a, [key]: !a[key] }));

  const alertColor = (type: string) => {
    if (type === "critical") return "text-red-400";
    if (type === "warning") return "text-yellow-400";
    if (type === "success") return "text-emerald-400";
    return "text-cyan-400";
  };

  const alertDot = (type: string) => {
    if (type === "critical") return "bg-red-500";
    if (type === "warning") return "bg-yellow-500";
    if (type === "success") return "bg-emerald-500";
    return "bg-cyan-500";
  };

  return (
    <div className="min-h-screen bg-[#070d1a] text-white font-golos flex overflow-hidden relative">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="float-orb absolute top-[10%] left-[15%] w-64 h-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="float-orb-delay absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-violet-600/5 blur-3xl" />
        <div className="float-orb absolute top-[50%] right-[30%] w-48 h-48 rounded-full bg-emerald-500/4 blur-3xl" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-30 transition-all duration-300 ${sidebarOpen ? "w-72" : "w-16"}`}
        style={{ background: "rgba(8,14,28,0.97)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(0,229,255,0.08)" }}
      >
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 animate-glow-pulse"
            style={{ background: "linear-gradient(135deg, #00e5ff, #a855f7)" }}
          >
            <Icon name="Wifi" size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <div className="text-sm font-bold font-montserrat gradient-text">VPN Bot</div>
              <div className="text-[10px] text-white/40 leading-none mt-0.5">Control Panel v2.4</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-white/30 hover:text-cyan-400 transition-colors">
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={16} />
          </button>
        </div>

        {sidebarOpen && (
          <div
            className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg animate-fade-in"
            style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 status-online flex-shrink-0" />
              <span className="text-[11px] text-emerald-400 font-medium">Бот активен · 12д 4ч аптайм</span>
            </div>
          </div>
        )}

        <nav className="px-2 mt-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                active === item.id ? "nav-active text-cyan-400" : "text-white/50 hover:text-white/80 hover:bg-white/5"
              }`}
            >
              <Icon
                name={item.icon}
                size={18}
                className={`flex-shrink-0 transition-colors ${active === item.id ? "text-cyan-400" : "text-white/40 group-hover:text-white/70"}`}
              />
              {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
              {sidebarOpen && active === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
            </button>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{ background: "rgba(0,229,255,0.1)" }}
              >
                <span className="gradient-text">AD</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold truncate">Admin</div>
                <div className="text-[10px] text-white/40">Суперадмин</div>
              </div>
              <Icon name="LogOut" size={14} className="ml-auto text-white/30 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-16"}`}>
        <header
          className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
          style={{ background: "rgba(7,13,26,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,229,255,0.06)" }}
        >
          <div>
            <h1 className="text-lg font-bold font-montserrat">{navItems.find((n) => n.id === active)?.label}</h1>
            <p className="text-xs text-white/40 mt-0.5">14 апреля 2026 · Последнее обновление: только что</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-cyan-500/30 transition-all">
              <Icon name="Bell" size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-cyan-500/30 transition-all">
              <Icon name="RefreshCw" size={15} className="text-white/60" />
            </button>
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #00e5ff, #a855f7)" }}
            >
              A
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* GENERAL */}
          {active === "general" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                  <div key={i} className="glass rounded-2xl p-4 glass-hover relative overflow-hidden scanlines">
                    <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 ${
                      s.color === "cyan" ? "bg-cyan-400" : s.color === "violet" ? "bg-violet-500" : s.color === "green" ? "bg-emerald-400" : "bg-orange-400"
                    }`} />
                    <Icon name={s.icon} size={20} className={`mb-3 ${
                      s.color === "cyan" ? "text-cyan-400" : s.color === "violet" ? "text-violet-400" : s.color === "green" ? "text-emerald-400" : "text-orange-400"
                    }`} />
                    <div className="text-2xl font-bold font-montserrat">{s.value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                    <div className={`text-[11px] mt-2 font-medium ${s.delta.startsWith("+") ? "text-emerald-400" : "text-white/40"}`}>{s.delta}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="Shield" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Безопасность</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "twoFactor" as const, label: "Двухфакторная аутентификация", desc: "TOTP / SMS код при входе" },
                      { key: "autoBlock" as const, label: "Авто-блокировка IP", desc: "При 5+ неудачных попытках" },
                      { key: "encryptLogs" as const, label: "Шифрование логов", desc: "AES-256 для всех записей" },
                      { key: "killSwitch" as const, label: "Kill Switch", desc: "Обрыв соединения при потере VPN" },
                      { key: "dnsLeak" as const, label: "Защита от DNS-утечек", desc: "Форсированный DNS через VPN" },
                      { key: "obfuscation" as const, label: "Обфускация трафика", desc: "Маскировка под HTTPS" },
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <div>
                          <div className="text-sm font-medium">{item.label}</div>
                          <div className="text-[11px] text-white/40">{item.desc}</div>
                        </div>
                        <Switch checked={settings[item.key]} onCheckedChange={() => toggle(item.key)} className="data-[state=checked]:bg-cyan-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Settings" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Общие параметры</h2>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">Макс. подключений</span>
                          <span className="text-cyan-400 font-medium">500</span>
                        </div>
                        <Slider defaultValue={[500]} max={2000} step={50} className="[&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">Лимит скорости (Мбит/с)</span>
                          <span className="text-violet-400 font-medium">100</span>
                        </div>
                        <Slider defaultValue={[100]} max={1000} step={10} className="[&_[role=slider]]:bg-violet-400 [&_[role=slider]]:border-violet-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">Длительность сессии (ч)</span>
                          <span className="text-emerald-400 font-medium">24</span>
                        </div>
                        <Slider defaultValue={[24]} max={168} step={1} className="[&_[role=slider]]:bg-emerald-400 [&_[role=slider]]:border-emerald-400" />
                      </div>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Server" size={18} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Серверы</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "EU-1 Frankfurt", load: 67, online: true },
                        { name: "US-East New York", load: 45, online: true },
                        { name: "AS-1 Singapore", load: 89, online: false },
                      ].map((srv) => (
                        <div key={srv.name} className="flex items-center gap-3 py-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${srv.online ? "bg-emerald-400 status-online" : "bg-orange-400"}`} />
                          <span className="text-xs flex-1">{srv.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${srv.load > 80 ? "bg-orange-400" : "bg-cyan-400"}`}
                                style={{ width: `${srv.load}%` }}
                              />
                            </div>
                            <span className="text-[11px] text-white/50 w-8 text-right">{srv.load}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ALERTS */}
          {active === "alerts" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="BellRing" size={18} className="text-yellow-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Правила алертов</h2>
                    <Badge className="ml-auto bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-[10px]">5 активно</Badge>
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: "bruteForce" as const, label: "Брутфорс-атака", desc: "5+ неудачных входов за 1 мин", severity: "critical" },
                      { key: "highTraffic" as const, label: "Высокий трафик", desc: "Превышение 1 ГБ/мин на сервер", severity: "warning" },
                      { key: "newLogin" as const, label: "Новые подключения", desc: "Каждый новый пользователь", severity: "info" },
                      { key: "serverDown" as const, label: "Сервер недоступен", desc: "Ping timeout > 5 секунд", severity: "critical" },
                      { key: "expiredCert" as const, label: "Истечение сертификата", desc: "За 30, 14, 7 дней до даты", severity: "warning" },
                    ].map((rule) => (
                      <div
                        key={rule.key}
                        className={`flex items-center gap-4 p-3 rounded-xl bg-white/3 ${
                          rule.severity === "critical" ? "alert-critical" : rule.severity === "warning" ? "alert-warning" : "alert-info"
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{rule.label}</span>
                            <Badge
                              variant="outline"
                              className={`text-[10px] px-1.5 py-0 ${
                                rule.severity === "critical" ? "border-red-500/40 text-red-400" :
                                rule.severity === "warning" ? "border-yellow-500/40 text-yellow-400" : "border-cyan-500/40 text-cyan-400"
                              }`}
                            >
                              {rule.severity === "critical" ? "критично" : rule.severity === "warning" ? "важно" : "инфо"}
                            </Badge>
                          </div>
                          <div className="text-[11px] text-white/40 mt-0.5">{rule.desc}</div>
                        </div>
                        <Switch checked={alertRules[rule.key]} onCheckedChange={() => handleAlertToggle(rule.key)} className="data-[state=checked]:bg-yellow-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="History" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Последние события</h2>
                  </div>
                  <div className="space-y-3">
                    {recentAlerts.map((alert, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alertDot(alert.type)}`} />
                        <div>
                          <p className={`text-xs leading-snug ${alertColor(alert.type)}`}>{alert.text}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-4 w-full py-2 rounded-lg text-xs text-cyan-400 transition-all hover:bg-cyan-500/10"
                    style={{ border: "1px solid rgba(0,229,255,0.2)" }}
                  >
                    Смотреть все события →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ANALYTICS */}
          {active === "analytics" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {[
                  { label: "Всего пользователей", value: "8 492", sub: "за всё время", color: "cyan", icon: "Users" },
                  { label: "Средний сеанс", value: "47 мин", sub: "+3 мин к норме", color: "violet", icon: "Clock" },
                  { label: "Пропущено пакетов", value: "0.02%", sub: "ниже нормы", color: "green", icon: "PackageCheck" },
                  { label: "Блокировок сегодня", value: "127", sub: "из 342 за неделю", color: "orange", icon: "Ban" },
                ].map((k, i) => (
                  <div key={i} className="glass rounded-2xl p-4 glass-hover relative overflow-hidden">
                    <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-15 ${
                      k.color === "cyan" ? "bg-cyan-400" : k.color === "violet" ? "bg-violet-500" : k.color === "green" ? "bg-emerald-400" : "bg-orange-400"
                    }`} />
                    <Icon name={k.icon} size={18} className={`mb-3 ${
                      k.color === "cyan" ? "text-cyan-400" : k.color === "violet" ? "text-violet-400" : k.color === "green" ? "text-emerald-400" : "text-orange-400"
                    }`} />
                    <div className="text-2xl font-bold font-montserrat">{k.value}</div>
                    <div className="text-xs text-white/50 mt-0.5">{k.label}</div>
                    <div className="text-[11px] text-white/30 mt-1">{k.sub}</div>
                  </div>
                ))}
              </div>

              <div className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-semibold font-montserrat text-sm">Активность по месяцам</h2>
                    <p className="text-xs text-white/40 mt-0.5">Количество уникальных сессий</p>
                  </div>
                  <div className="flex gap-2">
                    {["Год", "Квартал", "Месяц"].map((p, i) => (
                      <button
                        key={p}
                        className={`px-3 py-1 rounded-lg text-xs transition-all ${
                          i === 0 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "text-white/40 hover:text-white/70"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-end gap-2 h-36">
                  {activityData.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div
                        className="w-full rounded-t-md transition-all duration-300 group-hover:opacity-80 relative overflow-hidden"
                        style={{
                          height: `${(v / 100) * 120}px`,
                          background: "linear-gradient(to top, rgba(0,229,255,0.6), rgba(168,85,247,0.4))",
                          boxShadow: "0 0 10px rgba(0,229,255,0.2)",
                        }}
                      >
                        <div className="absolute inset-0 bg-white/5" />
                      </div>
                      <span className="text-[9px] text-white/30 group-hover:text-white/60 transition-colors">{months[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold font-montserrat text-sm mb-4 flex items-center gap-2">
                    <Icon name="Globe" size={16} className="text-cyan-400" />
                    Топ серверов по нагрузке
                  </h3>
                  {[
                    { name: "EU-Frankfurt-1", val: 67 },
                    { name: "US-NewYork-1", val: 45 },
                    { name: "AS-Singapore-1", val: 89 },
                    { name: "EU-Amsterdam-2", val: 32 },
                  ].map((s) => (
                    <div key={s.name} className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white/70">{s.name}</span>
                        <span className={s.val > 80 ? "text-orange-400" : "text-cyan-400"}>{s.val}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${s.val}%`,
                            background: s.val > 80 ? "linear-gradient(90deg,#ff6b35,#ff4444)" : "linear-gradient(90deg,#00e5ff,#a855f7)",
                            boxShadow: "0 0 8px rgba(0,229,255,0.3)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold font-montserrat text-sm mb-4 flex items-center gap-2">
                    <Icon name="PieChart" size={16} className="text-violet-400" />
                    Протоколы подключений
                  </h3>
                  <div className="space-y-3">
                    {[
                      { proto: "WireGuard", pct: 58, color: "#00e5ff" },
                      { proto: "OpenVPN", pct: 27, color: "#a855f7" },
                      { proto: "IKEv2", pct: 11, color: "#00ff88" },
                      { proto: "PPTP", pct: 4, color: "#ff6b35" },
                    ].map((p) => (
                      <div key={p.proto} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                        <span className="text-xs text-white/70 flex-1">{p.proto}</span>
                        <div className="w-24 h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                        </div>
                        <span className="text-[11px] w-8 text-right" style={{ color: p.color }}>{p.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {active === "notifications" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="Send" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Каналы уведомлений</h2>
                  </div>
                  <div className="space-y-4">
                    {[
                      { key: "telegram" as const, icon: "MessageCircle", label: "Telegram", desc: "@vpnbot_admin", color: "text-cyan-400" },
                      { key: "email" as const, icon: "Mail", label: "Email", desc: "admin@example.com", color: "text-violet-400" },
                      { key: "push" as const, icon: "Smartphone", label: "Push в браузере", desc: "Chrome, Firefox, Safari", color: "text-emerald-400" },
                      { key: "sms" as const, icon: "Phone", label: "SMS", desc: "+7 (xxx) xxx-xx-xx", color: "text-orange-400" },
                    ].map((ch) => (
                      <div key={ch.key} className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <Icon name={ch.icon} size={16} className={ch.color} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium">{ch.label}</div>
                          <div className="text-[11px] text-white/40 truncate">{ch.desc}</div>
                        </div>
                        <Switch checked={notifications[ch.key]} onCheckedChange={() => handleNotifToggle(ch.key)} className="data-[state=checked]:bg-cyan-500" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <Icon name="SlidersHorizontal" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Фильтрация</h2>
                    </div>
                    <div className="space-y-4">
                      {[
                        { key: "criticalOnly" as const, label: "Только критические", desc: "Игнорировать info и warning" },
                        { key: "digest" as const, label: "Ежедневный дайджест", desc: "Сводка в 09:00 каждый день" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                          <div>
                            <div className="text-sm font-medium">{item.label}</div>
                            <div className="text-[11px] text-white/40">{item.desc}</div>
                          </div>
                          <Switch checked={notifications[item.key]} onCheckedChange={() => handleNotifToggle(item.key)} className="data-[state=checked]:bg-violet-500" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Moon" size={18} className="text-indigo-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Тихие часы</h2>
                    </div>
                    <div className="flex gap-3">
                      {[{ label: "Начало", val: "23:00" }, { label: "Конец", val: "07:00" }].map((t) => (
                        <div key={t.label} className="flex-1">
                          <div className="text-[11px] text-white/40 mb-1">{t.label}</div>
                          <div
                            className="px-3 py-2 rounded-xl text-sm font-medium text-center"
                            style={{ background: "rgba(99,60,180,0.2)", border: "1px solid rgba(99,60,180,0.3)", color: "#a78bfa" }}
                          >
                            {t.val}
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/30 mt-3">Только критические алерты в ночное время</p>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="Eye" size={16} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Предпросмотр</h2>
                    </div>
                    <div className="rounded-xl p-3" style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)" }}>
                      <div className="flex items-start gap-2">
                        <span className="text-lg">🔐</span>
                        <div>
                          <div className="text-xs font-semibold text-cyan-400">VPN Bot Alert</div>
                          <div className="text-xs text-white/70 mt-0.5">Обнаружена попытка брутфорса с IP 185.234.xx.xx. Автоматически заблокирован.</div>
                          <div className="text-[10px] text-white/30 mt-1">Только что · EU-Frankfurt-1</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HELP */}
          {active === "help" && (
            <div className="space-y-6 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="BookOpen" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Часто задаваемые вопросы</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { q: "Как добавить нового пользователя?", a: "Перейдите в раздел «Пользователи», нажмите «Добавить» и скопируйте ссылку-инвайт." },
                      { q: "Как изменить протокол VPN?", a: "В «Общих параметрах» выберите нужный протокол. Изменения применяются без перезапуска." },
                      { q: "Что делать если сервер не отвечает?", a: "Проверьте статус в разделе «Аналитика». Кнопка «Рестарт» доступна в карточке сервера." },
                      { q: "Как настроить резервное копирование?", a: "В настройках безопасности включите «Авто-бэкап» и укажите частоту: ежедневно или еженедельно." },
                      { q: "Как узнать почему пользователь заблокирован?", a: "В журнале событий введите IP или ID пользователя — система покажет причину и время блокировки." },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl p-4 glass-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-start gap-3">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)" }}
                          >
                            <span className="text-[9px] font-bold text-cyan-400">Q</span>
                          </div>
                          <div>
                            <div className="text-sm font-medium mb-1">{item.q}</div>
                            <div className="text-xs text-white/50 leading-relaxed">{item.a}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-5">
                      <Icon name="Headphones" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Поддержка</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { icon: "MessageSquare", label: "Telegram", val: "@vpnbot_support", color: "text-cyan-400" },
                        { icon: "Mail", label: "Email", val: "support@vpnbot.io", color: "text-violet-400" },
                        { icon: "Globe", label: "Документация", val: "docs.vpnbot.io", color: "text-emerald-400" },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:bg-white/5">
                          <Icon name={c.icon} size={16} className={c.color} />
                          <div>
                            <div className="text-[11px] text-white/40">{c.label}</div>
                            <div className="text-xs font-medium">{c.val}</div>
                          </div>
                          <Icon name="ExternalLink" size={12} className="ml-auto text-white/20" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Info" size={18} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">О системе</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        ["Версия панели", "v2.4.1"],
                        ["Версия бота", "3.1.0"],
                        ["Последнее обновление", "12 апр 2026"],
                        ["Лицензия", "Enterprise"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                          <span className="text-white/50">{k}</span>
                          <span className="font-medium text-white/80">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg,#00e5ff,#a855f7)", boxShadow: "0 4px 20px rgba(0,229,255,0.25)" }}
                  >
                    Написать в поддержку
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

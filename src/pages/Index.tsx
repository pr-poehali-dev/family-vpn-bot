import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

type Section = "dashboard" | "general" | "parental" | "antiphish" | "age" | "compliance" | "notifications" | "alerts" | "help";

const navItems = [
  { id: "dashboard" as Section, icon: "LayoutDashboard", label: "Дашборд", group: null },
  { id: "general" as Section, icon: "Shield", label: "VPN и безопасность", group: "Защита" },
  { id: "antiphish" as Section, icon: "ShieldAlert", label: "Антифишинг", group: "Защита" },
  { id: "parental" as Section, icon: "Baby", label: "Родительский контроль", group: "Контроль" },
  { id: "age" as Section, icon: "ScanFace", label: "Проверка возраста", group: "Контроль" },
  { id: "compliance" as Section, icon: "Scale", label: "Соответствие РФ", group: "Законность" },
  { id: "alerts" as Section, icon: "Bell", label: "Оповещения", group: "Система" },
  { id: "notifications" as Section, icon: "MessageSquare", label: "Уведомления", group: "Система" },
  { id: "help" as Section, icon: "HelpCircle", label: "Помощь", group: "Система" },
];

const groups = ["Защита", "Контроль", "Законность", "Система"];

export default function Index() {
  const [active, setActive] = useState<Section>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [vpnSettings, setVpnSettings] = useState({
    twoFactor: true, autoBlock: true, encryptLogs: false,
    killSwitch: true, dnsLeak: true, obfuscation: false,
  });
  const [parentalSettings, setParentalSettings] = useState({
    adultBlock: true, gamblingBlock: true, phishingBlock: true,
    socialLimit: false, scheduleMode: true, whitelistOnly: false,
  });
  const [ageSettings, setAgeSettings] = useState({
    cameraVerify: true, aiAnalysis: true, noDataStore: true, manualReview: false,
  });
  const [complianceSettings, setComplianceSettings] = useState({
    dataRu: true, rkn: true, legalVpnOnly: true, contentFilter: true,
  });
  const [notifications, setNotifications] = useState({
    telegram: true, email: false, push: true, sms: false,
    criticalOnly: false, digest: true,
  });
  const [alertRules, setAlertRules] = useState({
    bruteForce: true, highTraffic: true, newLogin: false,
    serverDown: true, expiredCert: true, phishAttempt: true,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggle = (set: (fn: (s: any) => any) => void, _obj: unknown, key: string) => set((s) => ({ ...s, [key]: !s[key] }));

  const recentAlerts = [
    { type: "critical", text: "Попытка брутфорса с IP 185.234.xx.xx", time: "2 мин назад" },
    { type: "warning", text: "Фишинговый сайт заблокирован (15 попыток)", time: "8 мин назад" },
    { type: "warning", text: "Ребёнок пытался открыть 18+ контент", time: "22 мин назад" },
    { type: "info", text: "Проверка возраста пройдена успешно", time: "45 мин назад" },
    { type: "success", text: "Резервная копия базы создана", time: "1 час назад" },
  ];

  const alertDot = (t: string) => t === "critical" ? "bg-red-500" : t === "warning" ? "bg-yellow-500" : t === "success" ? "bg-emerald-500" : "bg-cyan-500";
  const alertColor = (t: string) => t === "critical" ? "text-red-400" : t === "warning" ? "text-yellow-400" : t === "success" ? "text-emerald-400" : "text-cyan-400";

  const SwitchRow = ({ label, desc, checked, onChange, color = "cyan" }: { label: string; desc: string; checked: boolean; onChange: () => void; color?: string }) => (
    <div className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-[11px] text-white/40">{desc}</div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange}
        className={color === "violet" ? "data-[state=checked]:bg-violet-500" : color === "emerald" ? "data-[state=checked]:bg-emerald-500" : color === "orange" ? "data-[state=checked]:bg-orange-500" : "data-[state=checked]:bg-cyan-500"} />
    </div>
  );

  const StatCard = ({ label, value, delta, icon, color }: { label: string; value: string; delta: string; icon: string; color: string }) => (
    <div className="glass rounded-2xl p-4 glass-hover relative overflow-hidden scanlines">
      <div className={`absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 ${color === "cyan" ? "bg-cyan-400" : color === "violet" ? "bg-violet-500" : color === "green" ? "bg-emerald-400" : "bg-orange-400"}`} />
      <Icon name={icon} size={20} className={`mb-3 ${color === "cyan" ? "text-cyan-400" : color === "violet" ? "text-violet-400" : color === "green" ? "text-emerald-400" : "text-orange-400"}`} />
      <div className="text-2xl font-bold font-montserrat">{value}</div>
      <div className="text-xs text-white/50 mt-0.5">{label}</div>
      <div className={`text-[11px] mt-2 font-medium ${typeof delta === "string" && delta.startsWith("+") ? "text-emerald-400" : "text-white/40"}`}>{delta}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#070d1a] text-white font-golos flex overflow-hidden relative">
      {/* Bg orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="float-orb absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="float-orb-delay absolute bottom-[20%] right-[10%] w-96 h-96 rounded-full bg-violet-600/5 blur-3xl" />
        <div className="float-orb absolute top-[55%] right-[35%] w-48 h-48 rounded-full bg-emerald-500/4 blur-3xl" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full z-30 flex flex-col transition-all duration-300 ${sidebarOpen ? "w-72" : "w-16"}`}
        style={{ background: "rgba(8,14,28,0.97)", backdropFilter: "blur(20px)", borderRight: "1px solid rgba(0,229,255,0.08)" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 animate-glow-pulse"
            style={{ background: "linear-gradient(135deg,#00e5ff,#a855f7)" }}>
            <Icon name="Wifi" size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <div className="animate-fade-in">
              <div className="text-sm font-bold font-montserrat gradient-text">SafeNet Bot</div>
              <div className="text-[10px] text-white/40 leading-none mt-0.5">Панель управления v3.0</div>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="ml-auto text-white/30 hover:text-cyan-400 transition-colors flex-shrink-0">
            <Icon name={sidebarOpen ? "ChevronLeft" : "ChevronRight"} size={16} />
          </button>
        </div>

        {/* Status */}
        {sidebarOpen && (
          <div className="mx-4 mt-3 px-3 py-2 rounded-lg flex-shrink-0"
            style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 status-online flex-shrink-0" />
              <span className="text-[11px] text-emerald-400 font-medium">Активен · 12д 4ч аптайм</span>
            </div>
          </div>
        )}

        {/* Nav */}
        <nav className="px-2 mt-3 flex-1 overflow-y-auto space-y-1 pb-2">
          {/* Dashboard */}
          <button
            onClick={() => setActive("dashboard")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${active === "dashboard" ? "nav-active text-cyan-400" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
          >
            <Icon name="LayoutDashboard" size={18} className={`flex-shrink-0 ${active === "dashboard" ? "text-cyan-400" : "text-white/40 group-hover:text-white/70"}`} />
            {sidebarOpen && <span className="text-sm font-medium">Дашборд</span>}
            {sidebarOpen && active === "dashboard" && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
          </button>

          {groups.map((group) => (
            <div key={group}>
              {sidebarOpen && (
                <div className="px-3 pt-3 pb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-white/25">{group}</span>
                </div>
              )}
              {navItems.filter(n => n.group === group).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${active === item.id ? "nav-active text-cyan-400" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`}
                >
                  <Icon name={item.icon} size={17} className={`flex-shrink-0 ${active === item.id ? "text-cyan-400" : "text-white/40 group-hover:text-white/70"}`} />
                  {sidebarOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                  {sidebarOpen && active === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Profile */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: "rgba(0,229,255,0.1)" }}>
                <span className="gradient-text">AD</span>
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold">Admin</div>
                <div className="text-[10px] text-white/40">Суперадмин</div>
              </div>
              <Icon name="LogOut" size={14} className="ml-auto text-white/30 hover:text-red-400 cursor-pointer transition-colors" />
            </div>
          </div>
        )}
      </aside>

      {/* Main */}
      <main className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-16"}`}>
        {/* Header */}
        <header className="sticky top-0 z-20 px-6 py-4 flex items-center justify-between"
          style={{ background: "rgba(7,13,26,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,229,255,0.06)" }}>
          <div>
            <h1 className="text-lg font-bold font-montserrat">{navItems.find(n => n.id === active)?.label ?? "Дашборд"}</h1>
            <p className="text-xs text-white/40 mt-0.5">14 апреля 2026 · Обновлено: только что</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-cyan-500/30 transition-all">
              <Icon name="Bell" size={16} className="text-white/60" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
            </button>
            <button className="w-9 h-9 rounded-xl glass flex items-center justify-center hover:border-cyan-500/30 transition-all">
              <Icon name="RefreshCw" size={15} className="text-white/60" />
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold"
              style={{ background: "linear-gradient(135deg,#00e5ff,#a855f7)" }}>A</div>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* ── DASHBOARD ── */}
          {active === "dashboard" && (
            <div className="space-y-6 animate-fade-in">
              {/* Hero stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Активных пользователей" value="1 284" delta="+12%" icon="Users" color="cyan" />
                <StatCard label="Угроз заблокировано" value="4 721" delta="+34 сегодня" icon="ShieldCheck" color="violet" />
                <StatCard label="Uptime сервиса" value="99.97%" delta="стабильно" icon="Zap" color="green" />
                <StatCard label="Детских профилей" value="389" delta="+5 за неделю" icon="Baby" color="orange" />
              </div>

              {/* Module status cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  { title: "VPN-защита", icon: "Wifi", status: "Активна", desc: "WireGuard · 3 сервера онлайн", color: "#00e5ff", ok: true },
                  { title: "Антифишинг", icon: "ShieldAlert", status: "Активен", desc: "1.2М доменов в базе · обновлено 2ч назад", color: "#a855f7", ok: true },
                  { title: "Родительский контроль", icon: "Baby", status: "Активен", desc: "389 профилей · 18+ заблокировано", color: "#00ff88", ok: true },
                  { title: "Проверка возраста", icon: "ScanFace", status: "Активна", desc: "ИИ-анализ · 97.3% точность", color: "#f59e0b", ok: true },
                  { title: "Соответствие РФ", icon: "Scale", status: "Соответствует", desc: "РКН · данные на серверах РФ", color: "#10b981", ok: true },
                  { title: "Уведомления", icon: "MessageSquare", status: "Telegram вкл", desc: "Push · Email · SMS настроено", color: "#818cf8", ok: true },
                ].map((m) => (
                  <div key={m.title} className="glass rounded-2xl p-4 glass-hover flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${m.color}18`, border: `1px solid ${m.color}33` }}>
                      <Icon name={m.icon} size={20} style={{ color: m.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{m.title}</div>
                      <div className="text-[11px] text-white/40 truncate mt-0.5">{m.desc}</div>
                    </div>
                    <Badge className="flex-shrink-0 text-[10px]"
                      style={{ background: `${m.color}20`, color: m.color, border: `1px solid ${m.color}40` }}>
                      {m.status}
                    </Badge>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Activity bar chart */}
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold font-montserrat text-sm mb-1">Угрозы по типам (неделя)</h3>
                  <p className="text-xs text-white/40 mb-5">Количество заблокированных запросов</p>
                  <div className="space-y-3">
                    {[
                      { label: "Фишинг", val: 78, color: "#a855f7" },
                      { label: "18+ контент", val: 55, color: "#f59e0b" },
                      { label: "Вредоносные сайты", val: 43, color: "#ef4444" },
                      { label: "Нарушение расписания", val: 28, color: "#00e5ff" },
                      { label: "Незаконный контент РФ", val: 19, color: "#10b981" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-white/60">{item.label}</span>
                          <span style={{ color: item.color }}>{item.val}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${item.val}%`, background: item.color, boxShadow: `0 0 8px ${item.color}55` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent events */}
                <div className="glass rounded-2xl p-5">
                  <h3 className="font-semibold font-montserrat text-sm mb-5 flex items-center gap-2">
                    <Icon name="History" size={16} className="text-cyan-400" />
                    Последние события
                  </h3>
                  <div className="space-y-3">
                    {recentAlerts.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alertDot(a.type)}`} />
                        <div>
                          <p className={`text-xs leading-snug ${alertColor(a.type)}`}>{a.text}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full py-2 rounded-lg text-xs text-cyan-400 transition-all hover:bg-cyan-500/10"
                    style={{ border: "1px solid rgba(0,229,255,0.2)" }}>
                    Все события →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── VPN & SECURITY ── */}
          {active === "general" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Активных сессий" value="847" delta="+12%" icon="Users" color="cyan" />
                <StatCard label="Трафик сегодня" value="48.3 ГБ" delta="+5.2%" icon="Activity" color="violet" />
                <StatCard label="Uptime" value="99.97%" delta="стабильно" icon="Zap" color="green" />
                <StatCard label="Заблокировано" value="342" delta="-8 за час" icon="Ban" color="orange" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Shield" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Безопасность VPN</h2>
                  </div>
                  <SwitchRow label="Двухфакторная аутентификация" desc="TOTP / SMS при входе" checked={vpnSettings.twoFactor} onChange={() => toggle(setVpnSettings, vpnSettings, "twoFactor")} />
                  <SwitchRow label="Авто-блокировка IP" desc="При 5+ неудачных попытках" checked={vpnSettings.autoBlock} onChange={() => toggle(setVpnSettings, vpnSettings, "autoBlock")} />
                  <SwitchRow label="Шифрование логов" desc="AES-256 для всех записей" checked={vpnSettings.encryptLogs} onChange={() => toggle(setVpnSettings, vpnSettings, "encryptLogs")} />
                  <SwitchRow label="Kill Switch" desc="Обрыв соединения при потере VPN" checked={vpnSettings.killSwitch} onChange={() => toggle(setVpnSettings, vpnSettings, "killSwitch")} />
                  <SwitchRow label="Защита от DNS-утечек" desc="Форсированный DNS через VPN" checked={vpnSettings.dnsLeak} onChange={() => toggle(setVpnSettings, vpnSettings, "dnsLeak")} />
                  <SwitchRow label="Обфускация трафика" desc="Маскировка под HTTPS" checked={vpnSettings.obfuscation} onChange={() => toggle(setVpnSettings, vpnSettings, "obfuscation")} />
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Settings" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Параметры подключения</h2>
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
                            <div className={`h-full rounded-full ${srv.load > 80 ? "bg-orange-400" : "bg-cyan-400"}`} style={{ width: `${srv.load}%` }} />
                          </div>
                          <span className="text-[11px] text-white/50 w-8 text-right">{srv.load}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ANTIPHISHING ── */}
          {active === "antiphish" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Фишинг-блокировок" value="2 341" delta="+127 сегодня" icon="ShieldAlert" color="violet" />
                <StatCard label="Доменов в базе" value="1.2М" delta="обновлено 2ч назад" icon="Database" color="cyan" />
                <StatCard label="Точность детекции" value="99.1%" delta="+0.3% за месяц" icon="Target" color="green" />
                <StatCard label="Подозрительных сайтов" value="48" delta="за последний час" icon="AlertTriangle" color="orange" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="ShieldAlert" size={18} className="text-violet-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Настройки защиты</h2>
                  </div>
                  <SwitchRow label="Проверка репутации домена" desc="Анализ при каждом запросе" checked={true} onChange={() => {}} color="violet" />
                  <SwitchRow label="Интеграция с базой РКН" desc="Синхронизация каждые 6 часов" checked={true} onChange={() => {}} color="violet" />
                  <SwitchRow label="Антифишинговые базы" desc="PhishTank, Google Safe Browsing" checked={true} onChange={() => {}} color="violet" />
                  <SwitchRow label="ML-анализ URL" desc="Нейросетевая проверка структуры ссылок" checked={true} onChange={() => {}} color="violet" />
                  <SwitchRow label="Блокировка тайпсквоттинга" desc="Похожие домены известных сайтов" checked={false} onChange={() => {}} color="violet" />
                  <SwitchRow label="HTTPS-downgrade защита" desc="Блокировка HTTP-редиректов" checked={true} onChange={() => {}} color="violet" />
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="AlertTriangle" size={18} className="text-yellow-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Последние блокировки</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { domain: "sberbank-verify.ru", type: "Фишинг", time: "2 мин" },
                        { domain: "gosuslugi-login.com", type: "Тайпсквоттинг", time: "15 мин" },
                        { domain: "vk-prize2026.net", type: "Мошенничество", time: "28 мин" },
                        { domain: "telegram-verify.info", type: "Фишинг", time: "1 ч" },
                        { domain: "alfa-bank-secure.xyz", type: "Фишинг", time: "2 ч" },
                      ].map((b) => (
                        <div key={b.domain} className="flex items-center gap-3 p-2.5 rounded-lg"
                          style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.15)" }}>
                          <Icon name="X" size={12} className="text-red-400 flex-shrink-0" />
                          <span className="text-xs text-white/80 flex-1 truncate font-mono">{b.domain}</span>
                          <Badge className="text-[9px] px-1.5 flex-shrink-0" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }}>{b.type}</Badge>
                          <span className="text-[10px] text-white/30 flex-shrink-0">{b.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="ListPlus" size={16} className="text-cyan-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Белый список доменов</h2>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="example.com"
                        className="flex-1 px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white placeholder:text-white/25 outline-none focus:border-cyan-500/50"
                      />
                      <button className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
                        style={{ background: "linear-gradient(135deg,#00e5ff,#a855f7)" }}>
                        + Добавить
                      </button>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {["work-portal.company.ru", "edu.msk.ru"].map((d) => (
                        <div key={d} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/3">
                          <Icon name="Check" size={12} className="text-emerald-400" />
                          <span className="text-xs text-white/70 flex-1 font-mono">{d}</span>
                          <Icon name="Trash2" size={12} className="text-white/20 hover:text-red-400 cursor-pointer transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── PARENTAL CONTROL ── */}
          {active === "parental" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Детских профилей" value="389" delta="+5 за неделю" icon="Baby" color="orange" />
                <StatCard label="Блокировок сегодня" value="1 247" delta="18+ и азартные" icon="ShieldCheck" color="violet" />
                <StatCard label="Нарушений расписания" value="34" delta="за неделю" icon="Clock" color="cyan" />
                <StatCard label="Добавлено в ч/с" value="12" delta="доменов сегодня" icon="ListX" color="green" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Baby" size={18} className="text-orange-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Фильтрация контента</h2>
                  </div>
                  <SwitchRow label="Блокировка 18+ контента" desc="Взрослый контент, эротика" checked={parentalSettings.adultBlock} onChange={() => toggle(setParentalSettings, parentalSettings, "adultBlock")} color="orange" />
                  <SwitchRow label="Блокировка азартных игр" desc="Казино, ставки, лотереи" checked={parentalSettings.gamblingBlock} onChange={() => toggle(setParentalSettings, parentalSettings, "gamblingBlock")} color="orange" />
                  <SwitchRow label="Блокировка мошеннических сайтов" desc="Интеграция с антифишинг-модулем" checked={parentalSettings.phishingBlock} onChange={() => toggle(setParentalSettings, parentalSettings, "phishingBlock")} color="orange" />
                  <SwitchRow label="Ограничение соцсетей" desc="ВКонтакте, Telegram — только по расписанию" checked={parentalSettings.socialLimit} onChange={() => toggle(setParentalSettings, parentalSettings, "socialLimit")} color="orange" />
                  <SwitchRow label="Режим расписания" desc="Блокировка в ночное время" checked={parentalSettings.scheduleMode} onChange={() => toggle(setParentalSettings, parentalSettings, "scheduleMode")} color="orange" />
                  <SwitchRow label="Только белый список" desc="Разрешены только одобренные сайты" checked={parentalSettings.whitelistOnly} onChange={() => toggle(setParentalSettings, parentalSettings, "whitelistOnly")} color="orange" />
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Clock" size={18} className="text-cyan-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Расписание доступа</h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        { day: "Пн–Пт", access: "07:00–22:00", type: "Школьные" },
                        { day: "Сб–Вс", access: "09:00–23:00", type: "Выходные" },
                        { day: "Ночь", access: "00:00–07:00", type: "Блокировка" },
                      ].map((s) => (
                        <div key={s.day} className="flex items-center gap-3 p-3 rounded-xl"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <Icon name="Calendar" size={14} className="text-cyan-400 flex-shrink-0" />
                          <span className="text-xs font-medium flex-1">{s.day}</span>
                          <span className="text-xs text-white/60">{s.access}</span>
                          <Badge className="text-[9px]"
                            style={{ background: s.type === "Блокировка" ? "rgba(239,68,68,0.2)" : "rgba(0,229,255,0.15)", color: s.type === "Блокировка" ? "#f87171" : "#00e5ff", border: "none" }}>
                            {s.type}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Users" size={16} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Профили детей</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "Алиса", age: "8 лет", status: "онлайн", avatar: "👧" },
                        { name: "Максим", age: "12 лет", status: "офлайн", avatar: "👦" },
                        { name: "Даша", age: "15 лет", status: "онлайн", avatar: "👧" },
                      ].map((p) => (
                        <div key={p.name} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/3 transition-all cursor-pointer">
                          <span className="text-2xl">{p.avatar}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{p.name}</div>
                            <div className="text-[11px] text-white/40">{p.age}</div>
                          </div>
                          <div className={`flex items-center gap-1.5 text-[11px] ${p.status === "онлайн" ? "text-emerald-400" : "text-white/30"}`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${p.status === "онлайн" ? "bg-emerald-400 status-online" : "bg-white/20"}`} />
                            {p.status}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="mt-3 w-full py-2 rounded-lg text-xs text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/8 transition-all">
                      + Добавить профиль
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AGE VERIFICATION ── */}
          {active === "age" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Проверок сегодня" value="1 823" delta="+12% к вчера" icon="ScanFace" color="cyan" />
                <StatCard label="Успешных подтверждений" value="97.3%" delta="точность ИИ" icon="CheckCircle" color="green" />
                <StatCard label="Отказов в доступе" value="247" delta="несовершеннолетних" icon="UserX" color="orange" />
                <StatCard label="Данные удалены" value="100%" delta="после проверки" icon="Trash2" color="violet" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="ScanFace" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Настройки проверки</h2>
                  </div>
                  <SwitchRow label="Проверка через камеру (ИИ)" desc="Анализ лица для определения возраста" checked={ageSettings.cameraVerify} onChange={() => toggle(setAgeSettings, ageSettings, "cameraVerify")} />
                  <SwitchRow label="ML-анализ биометрии" desc="Нейросеть точностью 97.3%" checked={ageSettings.aiAnalysis} onChange={() => toggle(setAgeSettings, ageSettings, "aiAnalysis")} />
                  <SwitchRow label="Немедленное удаление данных" desc="Фото не хранится после проверки" checked={ageSettings.noDataStore} onChange={() => toggle(setAgeSettings, ageSettings, "noDataStore")} color="emerald" />
                  <SwitchRow label="Ручная проверка модератором" desc="Для спорных случаев" checked={ageSettings.manualReview} onChange={() => toggle(setAgeSettings, ageSettings, "manualReview")} color="violet" />

                  <div className="mt-4 p-3 rounded-xl" style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)" }}>
                    <div className="flex items-start gap-2">
                      <Icon name="Info" size={14} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div className="text-[11px] text-white/60 leading-relaxed">
                        Система не сохраняет биометрические данные. Анализ проводится локально на устройстве пользователя. Соответствует 152-ФЗ «О персональных данных».
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="BarChart3" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Статистика проверок</h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Подтверждено 18+", pct: 87, color: "#00e5ff" },
                        { label: "Отказ (до 18 лет)", pct: 13, color: "#f59e0b" },
                        { label: "Ошибка / повтор", pct: 3, color: "#a855f7" },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-white/60">{s.label}</span>
                            <span style={{ color: s.color }}>{s.pct}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Settings2" size={18} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Порог возраста</h2>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">Минимальный возраст для 18+ контента</span>
                          <span className="text-cyan-400 font-medium">18 лет</span>
                        </div>
                        <Slider defaultValue={[18]} min={14} max={25} step={1} className="[&_[role=slider]]:bg-cyan-400 [&_[role=slider]]:border-cyan-400" />
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-2">
                          <span className="text-white/60">Доверительный интервал ИИ (%)</span>
                          <span className="text-violet-400 font-medium">85%</span>
                        </div>
                        <Slider defaultValue={[85]} min={70} max={99} step={1} className="[&_[role=slider]]:bg-violet-400 [&_[role=slider]]:border-violet-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── COMPLIANCE RF ── */}
          {active === "compliance" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                <StatCard label="Статус соответствия" value="100%" delta="всем нормам РФ" icon="Scale" color="green" />
                <StatCard label="Запросов от РКН" value="0" delta="за последний год" icon="Building2" color="cyan" />
                <StatCard label="Данные хранятся в РФ" value="100%" delta="Moscow DC-1, DC-2" icon="Server" color="violet" />
                <StatCard label="Дней до аудита" value="47" delta="плановый аудит" icon="Calendar" color="orange" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="Scale" size={18} className="text-emerald-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Требования законодательства</h2>
                  </div>
                  <SwitchRow label="Хранение данных на серверах РФ" desc="152-ФЗ «О персональных данных»" checked={complianceSettings.dataRu} onChange={() => toggle(setComplianceSettings, complianceSettings, "dataRu")} color="emerald" />
                  <SwitchRow label="Фильтрация реестра РКН" desc="Автообновление запрещённых ресурсов" checked={complianceSettings.rkn} onChange={() => toggle(setComplianceSettings, complianceSettings, "rkn")} color="emerald" />
                  <SwitchRow label="Только легальный VPN" desc="Только зарубежные игры/сервисы, не нарушающие 149-ФЗ" checked={complianceSettings.legalVpnOnly} onChange={() => toggle(setComplianceSettings, complianceSettings, "legalVpnOnly")} color="emerald" />
                  <SwitchRow label="Фильтрация контента по 436-ФЗ" desc="Возрастная маркировка и ограничения" checked={complianceSettings.contentFilter} onChange={() => toggle(setComplianceSettings, complianceSettings, "contentFilter")} color="emerald" />
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="CheckCircle2" size={18} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Статус соответствия</h2>
                    </div>
                    <div className="space-y-2">
                      {[
                        { law: "149-ФЗ «Об информации»", status: "Соответствует", ok: true },
                        { law: "152-ФЗ «О персональных данных»", status: "Соответствует", ok: true },
                        { law: "436-ФЗ «О защите детей»", status: "Соответствует", ok: true },
                        { law: "Реестр РКН", status: "Синхронизировано", ok: true },
                        { law: "СОРМ-3 (при необходимости)", status: "Не применяется", ok: null },
                      ].map((l) => (
                        <div key={l.law} className="flex items-center gap-3 p-2.5 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                          <Icon
                            name={l.ok === true ? "CheckCircle2" : "MinusCircle"}
                            size={14}
                            className={l.ok === true ? "text-emerald-400" : "text-white/30"}
                          />
                          <span className="text-xs flex-1">{l.law}</span>
                          <span className={`text-[11px] font-medium ${l.ok === true ? "text-emerald-400" : "text-white/40"}`}>{l.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon name="FileText" size={16} className="text-cyan-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Документы</h2>
                    </div>
                    <div className="space-y-2">
                      {["Политика конфиденциальности", "Пользовательское соглашение", "Отчёт об аудите (март 2026)"].map((d) => (
                        <div key={d} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
                          <Icon name="FileText" size={13} className="text-cyan-400" />
                          <span className="text-xs text-white/70 flex-1">{d}</span>
                          <Icon name="Download" size={12} className="text-white/30 hover:text-cyan-400 transition-colors" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── ALERTS ── */}
          {active === "alerts" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="BellRing" size={18} className="text-yellow-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Правила алертов</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { key: "bruteForce" as const, label: "Брутфорс-атака", desc: "5+ неудачных входов за 1 мин", severity: "critical" },
                      { key: "phishAttempt" as const, label: "Попытка фишинга", desc: "Переход на фишинговый сайт", severity: "critical" },
                      { key: "highTraffic" as const, label: "Высокий трафик", desc: "Превышение 1 ГБ/мин", severity: "warning" },
                      { key: "newLogin" as const, label: "Новые подключения", desc: "Каждый новый пользователь", severity: "info" },
                      { key: "serverDown" as const, label: "Сервер недоступен", desc: "Ping timeout > 5 секунд", severity: "critical" },
                      { key: "expiredCert" as const, label: "Истечение сертификата", desc: "За 30, 14, 7 дней до даты", severity: "warning" },
                    ].map((rule) => (
                      <div key={rule.key} className={`flex items-center gap-4 p-3 rounded-xl bg-white/3 ${rule.severity === "critical" ? "alert-critical" : rule.severity === "warning" ? "alert-warning" : "alert-info"}`}>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium">{rule.label}</span>
                            <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${rule.severity === "critical" ? "border-red-500/40 text-red-400" : rule.severity === "warning" ? "border-yellow-500/40 text-yellow-400" : "border-cyan-500/40 text-cyan-400"}`}>
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
                    {recentAlerts.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${alertDot(a.type)}`} />
                        <div>
                          <p className={`text-xs leading-snug ${alertColor(a.type)}`}>{a.text}</p>
                          <p className="text-[10px] text-white/30 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 w-full py-2 rounded-lg text-xs text-cyan-400 transition-all hover:bg-cyan-500/10" style={{ border: "1px solid rgba(0,229,255,0.2)" }}>
                    Все события →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── NOTIFICATIONS ── */}
          {active === "notifications" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="Send" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Каналы уведомлений</h2>
                  </div>
                  <SwitchRow label="Telegram" desc="@vpnbot_admin" checked={notifications.telegram} onChange={() => toggle(setNotifications, notifications, "telegram")} />
                  <SwitchRow label="Email" desc="admin@example.com" checked={notifications.email} onChange={() => toggle(setNotifications, notifications, "email")} color="violet" />
                  <SwitchRow label="Push в браузере" desc="Chrome, Firefox, Safari" checked={notifications.push} onChange={() => toggle(setNotifications, notifications, "push")} color="emerald" />
                  <SwitchRow label="SMS" desc="+7 (xxx) xxx-xx-xx" checked={notifications.sms} onChange={() => toggle(setNotifications, notifications, "sms")} color="orange" />
                </div>

                <div className="space-y-4">
                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="SlidersHorizontal" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Фильтрация</h2>
                    </div>
                    <SwitchRow label="Только критические" desc="Игнорировать info и warning" checked={notifications.criticalOnly} onChange={() => toggle(setNotifications, notifications, "criticalOnly")} color="violet" />
                    <SwitchRow label="Ежедневный дайджест" desc="Сводка в 09:00 каждый день" checked={notifications.digest} onChange={() => toggle(setNotifications, notifications, "digest")} color="violet" />
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
                          <div className="px-3 py-2 rounded-xl text-sm font-medium text-center"
                            style={{ background: "rgba(99,60,180,0.2)", border: "1px solid rgba(99,60,180,0.3)", color: "#a78bfa" }}>{t.val}</div>
                        </div>
                      ))}
                    </div>
                    <p className="text-[11px] text-white/30 mt-3">Только критические алерты в ночное время</p>
                  </div>

                  <div className="glass rounded-2xl p-4" style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)" }}>
                    <div className="flex items-start gap-2">
                      <span className="text-lg">🔐</span>
                      <div>
                        <div className="text-xs font-semibold text-cyan-400">SafeNet Alert</div>
                        <div className="text-xs text-white/70 mt-0.5">Ребёнок пытался открыть заблокированный ресурс 18+. Автоматически заблокировано.</div>
                        <div className="text-[10px] text-white/30 mt-1">Только что · Профиль: Алиса</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── HELP ── */}
          {active === "help" && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 glass rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-5">
                    <Icon name="BookOpen" size={18} className="text-cyan-400" />
                    <h2 className="font-semibold font-montserrat text-sm">Часто задаваемые вопросы</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { q: "Как добавить профиль ребёнка?", a: "Перейдите в «Родительский контроль» → «Профили детей» и нажмите «+ Добавить профиль»." },
                      { q: "Как работает проверка возраста?", a: "ИИ анализирует изображение с камеры локально на устройстве. Данные не передаются и не хранятся после проверки." },
                      { q: "Соответствует ли сервис законам РФ?", a: "Да, полностью. Данные хранятся на серверах в России, реализованы требования 152-ФЗ и 149-ФЗ." },
                      { q: "Как добавить сайт в белый список?", a: "Раздел «Антифишинг» → «Белый список доменов» → введите домен и нажмите «+ Добавить»." },
                      { q: "Можно ли пользоваться VPN для зарубежных игр?", a: "Да — обход блокировок разрешён для игр и сервисов, не нарушающих законодательство РФ." },
                    ].map((item, i) => (
                      <div key={i} className="rounded-xl p-4 glass-hover" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: "rgba(0,229,255,0.15)", border: "1px solid rgba(0,229,255,0.3)" }}>
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
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Headphones" size={18} className="text-violet-400" />
                      <h2 className="font-semibold font-montserrat text-sm">Поддержка</h2>
                    </div>
                    {[
                      { icon: "MessageSquare", label: "Telegram", val: "@safenet_support", color: "text-cyan-400" },
                      { icon: "Mail", label: "Email", val: "support@safenet.ru", color: "text-violet-400" },
                      { icon: "Globe", label: "Документация", val: "docs.safenet.ru", color: "text-emerald-400" },
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

                  <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon name="Info" size={18} className="text-emerald-400" />
                      <h2 className="font-semibold font-montserrat text-sm">О системе</h2>
                    </div>
                    {[
                      ["Версия панели", "v3.0.0"],
                      ["Версия бота", "3.1.0"],
                      ["Обновлено", "12 апр 2026"],
                      ["Лицензия", "Enterprise"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs py-1.5 border-b border-white/5 last:border-0">
                        <span className="text-white/50">{k}</span>
                        <span className="font-medium text-white/80">{v}</span>
                      </div>
                    ))}
                  </div>

                  <button className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-[1.02]"
                    style={{ background: "linear-gradient(135deg,#00e5ff,#a855f7)", boxShadow: "0 4px 20px rgba(0,229,255,0.25)" }}>
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
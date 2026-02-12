"use client";

import { Navbar } from "@/components/layout/navbar";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Heart,
  ShoppingBag,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Gift,
  Clock,
  BookOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

/* eslint-disable @next/next/no-img-element */

type Tab = "overview" | "giving" | "orders" | "settings";

// ── Fallback data (shown before Convex connection) ──────────────────────────

const fallbackGiving = [
  { _id: "1" as any, _creationTime: Date.now(), userId: "", amount: 5000, type: "tithe" as const, method: "Card •••• 4242", recurring: false },
  { _id: "2" as any, _creationTime: Date.now() - 86400000, userId: "", amount: 10000, type: "building_fund" as const, method: "Card •••• 4242", recurring: false },
  { _id: "3" as any, _creationTime: Date.now() - 172800000, userId: "", amount: 5000, type: "tithe" as const, method: "Card •••• 4242", recurring: true },
  { _id: "4" as any, _creationTime: Date.now() - 604800000, userId: "", amount: 2500, type: "missions" as const, method: "Card •••• 4242", recurring: false },
];

const fallbackOrders = [
  { _id: "1" as any, _creationTime: Date.now() - 1296000000, userId: "", items: [{ productId: "1" as any, productName: "Essential Hoodie", quantity: 1, priceAtPurchase: 5500 }], total: 5500, status: "delivered" as const },
  { _id: "2" as any, _creationTime: Date.now() - 2592000000, userId: "", items: [{ productId: "3" as any, productName: "Core Tee", quantity: 2, priceAtPurchase: 3500 }, { productId: "2" as any, productName: "Sunday Tote", quantity: 1, priceAtPurchase: 2500 }], total: 9500, status: "delivered" as const },
];

const typeLabels: Record<string, string> = {
  tithe: "Tithe",
  offering: "Offering",
  building_fund: "Building Fund",
  missions: "Missions",
  other: "Other",
};

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AccountPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const userId = session?.user?.id ?? "";

  // Convex queries — only run when we have a userId
  const convexGiving = useQuery(api.giving.listByUser, userId ? { userId } : "skip");
  const convexOrders = useQuery(api.orders.listByUser, userId ? { userId } : "skip");

  // Use Convex data if available, otherwise fallback
  const givingHistory = convexGiving ?? fallbackGiving;
  const orderHistory = convexOrders ?? fallbackOrders;

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-white/50" />
      </div>
    );
  }

  if (!session) return null;

  const user = session.user;

  const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { key: "overview", label: "Overview", icon: User },
    { key: "giving", label: "Giving", icon: Heart },
    { key: "orders", label: "Orders", icon: ShoppingBag },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <div className="pt-32 pb-20 container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
                  {user.name || "Member"}
                </h1>
                <p className="font-serif italic text-white/50 mt-1">{user.email}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-6 md:mt-0 flex items-center gap-2 text-xs tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors"
            >
              <LogOut className="w-4 h-4" /> SIGN OUT
            </button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-12 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                activeTab === tab.key
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white/80"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {/* ── OVERVIEW ─────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                {[
                  { title: "Give", desc: "Tithes & Offerings", icon: Heart, href: "#", color: "group-hover:bg-white" },
                  { title: "Donate", desc: "Building Fund", icon: Gift, href: "#", color: "group-hover:bg-white" },
                  { title: "Shop", desc: "Browse Merch", icon: ShoppingBag, href: "/merch", color: "group-hover:bg-white" },
                  { title: "Watch", desc: "Latest Media", icon: BookOpen, href: "/media", color: "group-hover:bg-white" },
                ].map((action) => (
                  <Link
                    key={action.title}
                    href={action.href}
                    className="group border border-white/10 hover:border-white/30 rounded-2xl p-6 flex items-center gap-4 transition-all hover:bg-white/[0.03]"
                  >
                    <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${action.color} group-hover:text-black`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg tracking-tight">{action.title}</h3>
                      <p className="text-xs text-white/40">{action.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                  </Link>
                ))}
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Giving */}
                <div className="border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold">Recent Giving</h3>
                    <button
                      onClick={() => setActiveTab("giving")}
                      className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                    >
                      VIEW ALL
                    </button>
                  </div>
                  <div className="space-y-4">
                    {givingHistory.slice(0, 3).map((item) => (
                      <div key={item._id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-bold text-sm">{typeLabels[item.type] ?? item.type}</p>
                          <p className="text-xs text-white/40">{formatDate(item._creationTime)}</p>
                        </div>
                        <span className="font-bold">{formatPrice(item.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="border border-white/10 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold">Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white transition-colors"
                    >
                      VIEW ALL
                    </button>
                  </div>
                  <div className="space-y-4">
                    {orderHistory.slice(0, 3).map((order) => (
                      <div key={order._id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <div>
                          <p className="font-bold text-sm">FP-{order._id.slice(-4).toUpperCase()}</p>
                          <p className="text-xs text-white/40">{order.items.map((i) => `${i.productName} x${i.quantity}`).join(", ")}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-sm">{formatPrice(order.total)}</span>
                          <p className="text-[10px] text-white/40 tracking-wider capitalize">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── GIVING ───────────────────────────────────────────── */}
          {activeTab === "giving" && (
            <motion.div
              key="giving"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Give Now CTA */}
              <div className="bg-white text-black rounded-2xl p-8 md:p-12 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">
                      Give Generously<span className="text-black/20">.</span>
                    </h2>
                    <p className="font-serif italic text-black/50 max-w-md">
                      &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo; — 2 Corinthians 9:7
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button className="rounded-full bg-black text-white hover:bg-black/80 tracking-widest text-xs px-8 h-12">
                      GIVE NOW
                    </Button>
                    <Button variant="outline" className="rounded-full border-black/20 text-black hover:bg-black/5 tracking-widest text-xs px-8 h-12">
                      SET UP RECURRING
                    </Button>
                  </div>
                </div>

                {/* Giving Amount Selector */}
                <div className="mt-10 pt-8 border-t border-black/10">
                  <p className="text-xs tracking-[0.2em] text-black/40 uppercase mb-4">Choose an amount</p>
                  <div className="flex flex-wrap gap-3">
                    {["$25", "$50", "$100", "$200", "$500", "$1000"].map((amount) => (
                      <button
                        key={amount}
                        className="px-6 py-3 rounded-full border border-black/10 text-sm font-bold hover:bg-black hover:text-white transition-all"
                      >
                        {amount}
                      </button>
                    ))}
                    <button className="px-6 py-3 rounded-full border border-black/10 text-sm text-black/50 hover:border-black/30 transition-all">
                      Other
                    </button>
                  </div>
                </div>
              </div>

              {/* Giving History */}
              <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold mb-6">Giving History</h3>
              <div className="space-y-3">
                {givingHistory.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between p-5 border border-white/5 hover:border-white/15 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-white/40" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">{typeLabels[item.type] ?? item.type}</p>
                        <p className="text-xs text-white/40">{formatDate(item._creationTime)} &middot; {item.method ?? "Card"}</p>
                      </div>
                    </div>
                    <span className="font-bold text-lg">{formatPrice(item.amount)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── ORDERS ───────────────────────────────────────────── */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold">Order History</h3>
                <Link
                  href="/merch"
                  className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white transition-colors flex items-center gap-1"
                >
                  SHOP MORE <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <div
                    key={order._id}
                    className="group border border-white/5 hover:border-white/15 rounded-xl p-6 transition-colors cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-white/40" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <p className="font-bold">FP-{order._id.slice(-4).toUpperCase()}</p>
                            <span className="text-[10px] tracking-[0.15em] bg-white/10 text-white/60 px-2 py-0.5 rounded-full capitalize">
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-white/40">{order.items.map((i) => `${i.productName} x${i.quantity}`).join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-8 text-sm">
                        <div className="flex items-center gap-2 text-white/40">
                          <Clock className="w-3.5 h-3.5" />
                          {formatDate(order._creationTime)}
                        </div>
                        <span className="font-bold text-lg">{formatPrice(order.total)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {orderHistory.length === 0 && (
                <div className="text-center py-20">
                  <ShoppingBag className="w-10 h-10 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 font-serif italic">No orders yet.</p>
                  <Link href="/merch" className="text-xs tracking-[0.2em] text-white/60 hover:text-white mt-4 inline-block">
                    BROWSE THE STORE
                  </Link>
                </div>
              )}
            </motion.div>
          )}

          {/* ── SETTINGS ─────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl"
            >
              <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold mb-8">Profile Settings</h3>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name || ""}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-sm tracking-wider placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      defaultValue={user.email || ""}
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-sm tracking-wider placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="+27 00 000 0000"
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-sm tracking-wider placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] text-white/40 uppercase mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      placeholder="Cape Town, South Africa"
                      className="w-full bg-transparent border border-white/10 rounded-xl px-5 py-4 text-sm tracking-wider placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-colors"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <Button className="rounded-full bg-white text-black hover:bg-white/90 tracking-widest text-xs px-8 h-12">
                    SAVE CHANGES
                  </Button>
                </div>
              </form>

              {/* Payment Methods */}
              <div className="mt-16">
                <h3 className="text-xs tracking-[0.2em] text-white/40 uppercase font-bold mb-6">Payment Methods</h3>
                <div className="border border-white/10 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white/40" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Visa ending in 4242</p>
                        <p className="text-xs text-white/40">Expires 12/27</p>
                      </div>
                    </div>
                    <button className="text-[10px] tracking-[0.2em] text-white/30 hover:text-white transition-colors">
                      REMOVE
                    </button>
                  </div>
                </div>
                <button className="mt-4 w-full border border-dashed border-white/10 hover:border-white/30 rounded-xl p-4 text-xs tracking-[0.2em] text-white/40 hover:text-white/60 transition-all">
                  + ADD PAYMENT METHOD
                </button>
              </div>

              {/* Danger Zone */}
              <div className="mt-16 pt-8 border-t border-red-500/10">
                <h3 className="text-xs tracking-[0.2em] text-red-400/60 uppercase font-bold mb-4">Danger Zone</h3>
                <button
                  onClick={handleSignOut}
                  className="text-xs tracking-[0.2em] text-red-400/60 hover:text-red-400 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> SIGN OUT OF ALL DEVICES
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

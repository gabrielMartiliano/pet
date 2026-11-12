
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  ClipboardList,
  CalendarDays,
  Stethoscope,
  Contact,
} from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
}

const menuItems = [
  { label: "Painel", href: "/", icon: LayoutDashboard },
  { label: "Cadastrar Paciente", href: "/paciente/cadastrar", icon: UserPlus },
  { label: "Fila de Espera", href: "/filaEspera", icon: ClipboardList },
  { label: "Reserva de Sala", href: "/reservas", icon: CalendarDays },
  { label: "Atendimento", href: "/atendimento", icon: Stethoscope },
  { label: "Contato", href: "/contato", icon: Contact },
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="app-sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-logo">
          <Image
            src="/images/logo.png"
            alt="Logo do sistema"
            width={160}
            height={80}
            priority
            className="sidebar-logo"
          />
        </div>

        <div className="sidebar-brand-text">
          <span>Sistema de Gestão</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href ||
                pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`sidebar-link ${active ? "active" : ""}`}
            >
              <Icon size={17} strokeWidth={2.2} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <span>Portal do Colaborador</span>
        <small>Versão 1.0.0</small>
      </div>
    </aside>
  );
}
